import { Router } from 'express';

import { CidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, DEV!');
});

router.post(
    '/cidades',
    CidadesController.createValidation,
    CidadesController.create
);
router.get(
    '/cidades',
    CidadesController.getAllValidation,
    CidadesController.getAll
);

export { router };
