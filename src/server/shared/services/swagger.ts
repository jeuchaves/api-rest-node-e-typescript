import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '0.1.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Rest Node e Typescript',
        },
        servers: [
            {
                url: 'http://localhost:3333',
            },
        ],
    },
    apis: ['../routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs };
