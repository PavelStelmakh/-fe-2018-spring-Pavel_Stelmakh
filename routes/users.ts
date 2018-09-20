import * as express from 'express';
const router = express.Router();
import { User } from '../models/User';
const Users = require('../models/Users');
const users = new Users;

router.get('/users', (req: express.Request, res: express.Response) => {
    res.status(200).send(users.users());
});

router.get('/users/:id', (req: express.Request, res: express.Response) => {
    try {
        const id: number = +req.params['id'];
        const user: User | undefined = users.user(id);
        if (user) {
            res.status(200).send(user);
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

router.post('/users/add', (req: express.Request, res: express.Response) => {
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

router.put('/users/:id', (req: express.Request, res: express.Response) => {
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

router.delete('/users/:id', (req: express.Request, res: express.Response) => {
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