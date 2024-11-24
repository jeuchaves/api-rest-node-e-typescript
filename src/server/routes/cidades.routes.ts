import { Router } from 'express';

import { ensureAuthenticated } from '../shared/middleware';
import { CidadesController } from '../controllers';

const cidadesRouter = Router();

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
cidadesRouter.get(
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
cidadesRouter.get(
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
cidadesRouter.put(
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
cidadesRouter.delete(
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
cidadesRouter.post(
    '/cidades',
    ensureAuthenticated,
    CidadesController.createValidation,
    CidadesController.create
);

export { cidadesRouter };
