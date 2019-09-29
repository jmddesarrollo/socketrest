import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo está correcto en GET'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // 'in' en el servidor de socket es para enviar mensajes a un 'room'.
    // Todos los usuarios, ya por defecto, están conectados a una 'room' con su propio id,
    // a parte de las 'rooms' en las que puedan estar
    server.io.emit('newMessage', payload);    

    res.json({
        ok: true,
        mensaje: 'Todo está correcto en POST',
        cuerpo,
        de
    })
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    // Recoger parámetros desde url
    const id = req.params.id;

    // Recoger parámetros desde el cuerpo
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // 'in' en el servidor de socket es para enviar mensajes a un 'room'.
    // Todos los usuarios, ya por defecto, están conectados a una 'room' con su propio id,
    // a parte de las 'rooms' en las que puedan estar
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'Todo está correcto en POST',
        cuerpo,
        de,
        id
    })
});

export default router;
