import { ObjectSchema, ValidationError, object, string } from 'yup';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

interface ICidade {
    nome: string;
    estado: string;
}

const bodyValidation: ObjectSchema<ICidade> = object({
    nome: string().required().min(3),
    estado: string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    let validateData: ICidade | undefined = undefined;
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (err) {
        const yupError = err as ValidationError;
        const erros: Record<string, string> = {};

        yupError.inner.forEach((error) => {
            if (!error.path) return;
            erros[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({ errors: erros });
    }
    console.log(req.body.nome);
    return res.send('Create!');
};
