import { Router } from 'express';
import { UsuariosController } from '../controllers';

const usuariosRouter = Router();

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
usuariosRouter.post(
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
usuariosRouter.post(
    '/cadastrar',
    UsuariosController.signUpValidation,
    UsuariosController.signUp
);

export { usuariosRouter };
