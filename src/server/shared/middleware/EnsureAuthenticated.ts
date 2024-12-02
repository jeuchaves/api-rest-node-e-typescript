import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { axiosApp } from '../services/AxiosConfig';

interface IPublicKey {
    kid: string;
    x5c: string[];
}

type TPublicKeys = Record<string, string>;

let publicKeys: TPublicKeys | null = null;

const fetchPublicKeys = async (): Promise<TPublicKeys> => {
    if (!publicKeys) {
        const { data } = await axiosApp.get<{ keys: IPublicKey[] }>(
            '/protocol/openid-connect/certs'
        );
        publicKeys = data.keys.reduce<TPublicKeys>((acc, key) => {
            acc[key.kid] =
                `-----BEGIN CERTIFICATE-----\n${key.x5c[0]}\n-----END CERTIFICATE-----`;
            return acc;
        }, {});
    }
    return publicKeys;
};

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' },
        });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' },
        });
    }

    try {
        const keys = await fetchPublicKeys();
        const decodedHeader = jwt.decode(token, { complete: true });

        if (
            !decodedHeader ||
            !decodedHeader.header.kid ||
            !keys[decodedHeader.header.kid]
        ) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default:
                        'Chave pública não encontrada para validar o token',
                },
            });
        }

        const publicKey = keys[decodedHeader.header.kid];

        const jwtData = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        }) as JwtPayload;

        if (!jwtData || typeof jwtData.sub !== 'string') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: 'Token inválido' },
            });
        }

        req.headers.idUsuario = jwtData.sub;
        return next();
    } catch (error: unknown) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Token inválido',
                details: (error as Error).message,
            },
        });
    }
};
