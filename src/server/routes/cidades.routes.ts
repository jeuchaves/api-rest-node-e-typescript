import { Router } from 'express';

import { ensureAuthenticated } from '../shared/middleware';
import { CidadesController } from '../controllers';
import { ensureResourceOwner } from '../shared/middleware/EnsureResourceOwner';
import { ETableNames } from '../database/ETableNames';

const cidadesRouter = Router();

cidadesRouter
    .post(
        '/cidades',
        ensureAuthenticated,
        CidadesController.createValidation,
        CidadesController.create
    )
    .get(
        '/cidades',
        ensureAuthenticated,
        CidadesController.getAllValidation,
        CidadesController.getAll
    );

cidadesRouter
    .delete(
        '/cidades/:id',
        ensureAuthenticated,
        ensureResourceOwner(ETableNames.cidade),
        CidadesController.deleteByIdValidation,
        CidadesController.deleteById
    )
    .put(
        '/cidades/:id',
        ensureAuthenticated,
        ensureResourceOwner(ETableNames.cidade),
        CidadesController.updateByIdValidation,
        CidadesController.updateById
    )
    .get(
        '/cidades/:id',
        ensureAuthenticated,
        CidadesController.getByIdValidation,
        CidadesController.getById
    );

export { cidadesRouter };
