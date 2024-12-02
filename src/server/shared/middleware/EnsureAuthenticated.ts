// export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
//     const { authorization } = req.headers;

import { RequestHandler } from 'express';
import { keycloak } from '../services/keycloak';

//     if (!authorization) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             errors: { default: 'Não autenticado' },
//         });
//     }

//     const [type, token] = authorization.split(' ');

//     if (type !== 'Bearer') {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             errors: { default: 'Não autenticado' },
//         });
//     }

//     const jwtData = JWTService.verify(token);

//     if (jwtData === 'INVALID_TOKEN') {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             errors: { default: 'Não autenticado' },
//         });
//     }

//     if (jwtData === 'JWT_SECRET_NOT_FOUND') {
//         return res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR)
//             .json({ errors: { default: 'Erro ao verificar o token' } });
//     }

//     req.headers.idUsuario = jwtData.uid.toString();

//     return next();
// };

export const ensureAuthenticated: RequestHandler = keycloak.protect();
