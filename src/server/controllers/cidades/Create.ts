import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';

import { CidadesProvider } from '../../database/providers';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models';

interface IBodyProps extends Omit<ICidade, 'id' | 'owner_id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        object({
            nome: string().required().min(3).max(150),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const userId = req.headers.idUsuario;

    if (!userId || typeof userId !== 'string') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado' },
        });
    }

    const cidadeData = {
        ...req.body,
        owner_id: userId,
    };

    const result = await CidadesProvider.create(cidadeData);
    if (result instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: result.message } });
    }
    return res.status(StatusCodes.CREATED).json(result);
};
