import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';

import { validation } from '../../shared/middleware';
import { UsuariosProvider } from '../../database/providers';
import { IUsuario } from '../../database/models';

interface IBodyProps extends Omit<IUsuario, 'id' | 'username'> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        object({
            email: string().required().email().min(5),
            senha: string().required().min(6),
        })
    ),
}));

export const signIn = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const { email, senha } = req.body;

    const result = await UsuariosProvider.getByEmail(email);
    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        });
    }

    if (senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            },
        });
    }

    return res
        .status(StatusCodes.OK)
        .json({ accessToken: 'teste.teste.teste' });
};
