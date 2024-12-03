import { Router } from 'express';

import { ensureAuthenticated } from '../shared/middleware';
import { PessoasController } from '../controllers';
import { ensureResourceOwner } from '../shared/middleware/EnsureResourceOwner';
import { ETableNames } from '../database/ETableNames';

const pessoasRouter = Router();

pessoasRouter
    .get(
        '/pessoas',
        ensureAuthenticated,
        PessoasController.getAllValidation,
        PessoasController.getAll
    )
    .post(
        '/pessoas',
        ensureAuthenticated,
        PessoasController.createValidation,
        PessoasController.create
    );

pessoasRouter
    .get(
        '/pessoas/:id',
        ensureAuthenticated,
        PessoasController.getByIdValidation,
        PessoasController.getById
    )
    .put(
        '/pessoas/:id',
        ensureAuthenticated,
        ensureResourceOwner(ETableNames.pessoa),
        PessoasController.updateByIdValidation,
        PessoasController.updateById
    )
    .delete(
        '/pessoas/:id',
        ensureAuthenticated,
        ensureResourceOwner(ETableNames.pessoa),
        PessoasController.deleteByIdValidation,
        PessoasController.deleteById
    );

export { pessoasRouter };
