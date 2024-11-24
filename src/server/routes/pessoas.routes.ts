import { Router } from 'express';

import { ensureAuthenticated } from '../shared/middleware';
import { PessoasController } from '../controllers';

const pessoasRouter = Router();

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
pessoasRouter.get(
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
pessoasRouter.get(
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
pessoasRouter.put(
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
pessoasRouter.delete(
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
pessoasRouter.post(
    '/pessoas',
    ensureAuthenticated,
    PessoasController.createValidation,
    PessoasController.create
);

export { pessoasRouter };
