import { object, string } from 'yup';
import { Request, Response } from 'express';
import { validation } from '../../shared/middleware';

interface ICidade {
    nome: string;
    estado: string;
}

/* interface IFilter {
    filter: string;
} */

export const createValidation = validation({
    body: object({
        nome: string().required().min(3),
        estado: string().required().min(3),
    }),
    query: object({
        filter: string().required().min(3),
    }),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    console.log(req.body);
    return res.send('Create!');
};
