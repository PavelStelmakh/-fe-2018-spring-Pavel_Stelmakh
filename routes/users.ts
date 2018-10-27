import { Router, Response, Request, NextFunction } from 'express';
const router = Router();
import { IUser } from '../models/IUser';
const loginRoute = require('./login');
const users = require('../models/Users');
import { getUserByToken } from '../shared/getUserByToken';

router.use('/login', loginRoute);

router.use('*', (req: Request, res: Response, next: NextFunction) => {
    const data = getUserByToken(req);

    if (data.user) {
        next();
    } else {
        res.status(401);
        res.end();
    }
});

router.get('/users', (_req: Request, res: Response) => {
    res.status(200).send(users.users());
});

router.get('/users/:id', (req: Request, res: Response) => {
    try {
        const id: number = +req.params['id'];
        const user: IUser | undefined = users.user(id);
        if (user) {
            setTimeout(() => res.status(200).send(user), 3000);
        } else {
            res.status(400);
            res.end();
        }
    }
    catch (Error) {
        res.status(418);
        res.end();
    }
});

router.post('/users/add', (req: Request, res: Response) => {
    try {
        const success: boolean = users.add(req.body);
        if (success) {
            res.status(200);
        } else {
            res.status(418);
        }
    }
    catch (Error) {
        res.status(500);
    }
    res.end();
});

router.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id: number = +req.params['id'];
        const success: boolean = users.update(id, req.body);
        if (success) {
            res.status(200);
        } else {
            res.status(418);
        }
    }
    catch (Error) {
        res.status(500);
    }
    res.end();
});

router.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id: number = +req.params['id'];
        const success: boolean = users.delete(id);
        if (success) {
            res.status(200);
        } else {
            res.status(418);
        }
    }
    catch (Error) {
        res.status(500);
    }
    res.end();
});

module.exports = router;