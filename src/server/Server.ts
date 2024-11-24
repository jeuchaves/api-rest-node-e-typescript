import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';

import { swaggerDocs } from './shared/services/swagger';
import { router } from './routes';

import './shared/services/TranslationsYup';

const server = express();

server.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(express.json());

server.use(router);

export { server };
