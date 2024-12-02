import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Knex } from '../../database/knex';

export const ensureResourceOwner = (
    tableName: string,
    ownerField: string,
    resourceField = 'id'
): RequestHandler => {
    return async (req, res, next) => {
        const userId = req.headers.idUsuario;

        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: 'Não autenticado' },
            });
        }

        const resourceId = req.params.resourceId;

        try {
            const resource = await Knex(tableName)
                .where(resourceField, resourceId)
                .first();

            if (!resource) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    errors: { default: 'Recurso não encontrado' },
                });
            }

            if (resource[ownerField] !== userId) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    errors: { default: 'Operação não permitida' },
                });
            }

            return next();
        } catch (error: unknown) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao verificar o recurso',
                    details: (error as Error).message,
                },
            });
        }
    };
};
