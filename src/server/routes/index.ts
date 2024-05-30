import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, DEV!');
});

router.post('/teste', (req, res) => {
    console.log(req.body);
    return res.json(req.body);
});

export { router };
