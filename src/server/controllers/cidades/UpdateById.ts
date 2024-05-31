import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';

import { validation } from '../../shared/middleware';
import { ICidade } from '../../database/models';

interface IParamProps {
    id?: number;
}
interface IBodyProps extends Omit<ICidade, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(
        object({
            id: number().moreThan(0).required().integer(),
        })
    ),
    body: getSchema<IBodyProps>(
        object({
            nome: string().required().min(3),
        })
    ),
}));

export const updateById = async (
    req: Request<IParamProps, {}, IBodyProps>,
    res: Response
) => {
    console.log(req.params);
    console.log(req.body);
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Não implementado');
};
