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
 *   - name: Cidades
 *     description: Operações relacionadas a cidades
 *   - name: Pessoas
 *     description: Operações relacionadas a pessoas
 *   - name: Usuários
 *     description: Operações relacionadas a usuários
 */

// Rotas de Cidades

/**
 * @swagger
 * /cidades:
 *   get:
 *     summary: Retorna todas as cidades
 *     tags: [Cidades]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cidades
 *       401:
 *         description: Não autenticado
 */
router.get(
    '/cidades',
    ensureAuthenticated,
    CidadesController.getAllValidation,
    CidadesController.getAll
);

/**
 * @swagger
 * /cidades/{id}:
 *   get:
 *     summary: Retorna uma cidade pelo ID
 *     tags: [Cidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cidade encontrada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Cidade não encontrada
 */
router.get(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.getByIdValidation,
    CidadesController.getById
);

/**
 * @swagger
 * /cidades/{id}:
 *   put:
 *     summary: Atualiza uma cidade pelo ID
 *     tags: [Cidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       204:
 *         description: Cidade atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Cidade não encontrada
 */
router.put(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.updateByIdValidation,
    CidadesController.updateById
);

/**
 * @swagger
 * /cidades/{id}:
 *   delete:
 *     summary: Deleta uma cidade pelo ID
 *     tags: [Cidades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cidade deletada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Cidade não encontrada
 */
router.delete(
    '/cidades/:id',
    ensureAuthenticated,
    CidadesController.deleteByIdValidation,
    CidadesController.deleteById
);

/**
 * @swagger
 * /cidades:
 *   post:
 *     summary: Cria uma nova cidade
 *     tags: [Cidades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cidade criada
 *       401:
 *         description: Não autenticado
 */
router.post(
    '/cidades',
    ensureAuthenticated,
    CidadesController.createValidation,
    CidadesController.create
);

// Rotas de Pessoas

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Retorna todas as pessoas
 *     tags: [Pessoas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *       401:
 *         description: Não autenticado
 */
router.get(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.getAllValidation,
    PessoasController.getAll
);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Retorna uma pessoa pelo ID
 *     tags: [Pessoas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pessoa não encontrada
 */
router.get(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.getByIdValidation,
    PessoasController.getById
);

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa pelo ID
 *     tags: [Pessoas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               email:
 *                 type: string
 *               cidadeId:
 *                 type: integer
 *     responses:
 *       204:
 *         description: Pessoa atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pessoa não encontrada
 */
router.put(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.updateByIdValidation,
    PessoasController.updateById
);

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Deleta uma pessoa pelo ID
 *     tags: [Pessoas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pessoa deletada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pessoa não encontrada
 */
router.delete(
    '/pessoas/:id',
    ensureAuthenticated,
    PessoasController.deleteByIdValidation,
    PessoasController.deleteById
);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     tags: [Pessoas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               email:
 *                 type: string
 *               cidadeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pessoa criada
 *       401:
 *         description: Não autenticado
 */
router.post(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.createValidation,
    PessoasController.create
);

// Rotas de Usuários

/**
 * @swagger
 * /entrar:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       400:
 *         description: Dados inválidos
 */
router.post(
    '/entrar',
    UsuariosController.signInValidation,
    UsuariosController.signIn
);

/**
 * @swagger
 * /cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado
 *       400:
 *         description: Dados inválidos
 */
router.post(
    '/cadastrar',
    UsuariosController.signUpValidation,
    UsuariosController.signUp
);

export { router };
