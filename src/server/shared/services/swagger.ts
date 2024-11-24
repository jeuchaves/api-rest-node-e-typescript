import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    openapi: '3.0.0',
    definition: {
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Rest Node e Typescript',
        },
        servers: [
            {
                url: 'http://localhost:3333',
                description: 'Servidor local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    apis: ['src/server/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs };
