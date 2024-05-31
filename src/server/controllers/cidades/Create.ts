import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string } from 'yup';

import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models';

interface IBodyProps extends Omit<ICidade, 'id'> {
    nome: string;
}
export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        object({
            nome: string().required().min(3),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    console.log(req.body);
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Não implementado');
};
