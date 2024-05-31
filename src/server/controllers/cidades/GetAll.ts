import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { number, object, string } from 'yup';

import { validation } from '../../shared/middleware';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        object({
            page: number().moreThan(0),
            limit: number().moreThan(0),
            filter: string(),
        })
    ),
}));

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {
    console.log(req.query);
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Não implementado');
};
