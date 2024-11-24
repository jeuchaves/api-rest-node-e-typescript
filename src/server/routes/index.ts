import { Router } from 'express';

import {
    CidadesController,
    PessoasController,
    UsuariosController,
} from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, DEV!');
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John Doe' }]);
});

/**
 * @swagger
 * tags:
 *  name: Cidades
 *  description: Endpoints para cidades
 */

/**
 * @swagger
 * /cidades:
 *  get:
 *      summary: Retorna todas as cidades
 *      tags: [Cidades]
 *      responses:
 *          200:
 *              description: Retorna todas as cidades
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Cidade'
 */
router.get(
    '/cidades',
    ensureAuthenticated,
    CidadesController.getAllValidation,
    CidadesController.getAll
);
router.get(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.getByIdValidation,
    CidadesController.getById
);
router.put(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.updateByIdValidation,
    CidadesController.updateById
);
router.delete(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.deleteByIdValidation,
    CidadesController.deleteById
);
router.post(
    '/cidades',
    ensureAuthenticated,
    CidadesController.createValidation,
    CidadesController.create
);

// Pessoas
router.get(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.getAllValidation,
    PessoasController.getAll
);
router.get(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.getByIdValidation,
    PessoasController.getById
);
router.put(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.updateByIdValidation,
    PessoasController.updateById
);
router.delete(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.deleteByIdValidation,
    PessoasController.deleteById
);
router.post(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.createValidation,
    PessoasController.create
);

// Usuários
router.post(
    '/entrar',
    UsuariosController.signInValidation,
    UsuariosController.signIn
);
router.post(
    '/cadastrar',
    UsuariosController.signUpValidation,
    UsuariosController.signUp
);

export { router };
