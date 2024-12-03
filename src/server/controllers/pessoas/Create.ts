import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';

import { PessoasProvider } from '../../database/providers';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models';

interface IBodyProps extends Omit<IPessoa, 'id' | 'owner_id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        object({
            nomeCompleto: string().required().min(3),
            email: string().required().email(),
            cidadeId: number().integer().required(),
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

    const pessoaData = {
        ...req.body,
        owner_id: userId,
    };

    const result = await PessoasProvider.create(pessoaData);
    if (result instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ errors: { default: result.message } });
    }
    return res.status(StatusCodes.CREATED).json(result);
};
