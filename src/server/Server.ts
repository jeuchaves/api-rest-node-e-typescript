import { swaggerDocs } from './shared/services/swagger';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

import './shared/services/TranslationsYup';

import { router } from './routes';

const server = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(express.json());

server.use(router);

export { server };
