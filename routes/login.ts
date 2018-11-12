import { Router, Response, Request } from 'express';
const router = Router();
import { getUserByToken } from '../shared/getUserByToken';
import { getToken } from '../shared/getToken';
import { UserAuth } from '../models/UserAuth';
import { User } from '../models/User';
const users = require('../models/Users');

router.get('', function (req: Request, res: Response) {
    const {user} = getUserByToken(req);
    
    if (user) {
        const data: {id: number, role: string} = {id: user['id'], role: user['role']};
        res.status(200).send(data);
    } else {
        res.status(401);
    }
    res.end();
    
});

router.get('/find/:name/:id', function (req: Request, res: Response) {
    const name: string = req.params['name'];
    const id: number = +req.params['id'];

    setTimeout(() => {
        if (id !== 0 && users.user(id) && users.user(id).name === name) {
            res.status(200);
        } else if (!users.checkExistName(name)) {
            res.status(200);
        } else {
            res.status(400);
        }
        res.end();
    }, 3000);
});

router.get('/logout', function (req: Request, res: Response) {
    const data = getUserByToken(req);
    
    if (data.user) {
        res.clearCookie('auth_token');
        res.status(200);
    } else {
        res.status(401);
    }
    res.end();
});

router.post('', function (req: Request, res: Response) {
    if (req.body) {
        const login = req.body.login;
        const password = req.body.password;

        if (login && password) {
            const user: UserAuth = users.checkLogin({login, password});
            if (user.isAuthenticated === true) {
                const secret = req.app.get('secret');
                const token = getToken(user.user, secret);
                const role: string = (user.user as User).role;

                res.cookie('auth_token', token);                
                res.status(200).send({role});
            } else {
                res.status(401);
            }
        } else {
            res.status(401);
        }
    } else {
        res.status(400);
    }
    
    res.end();
});

router.post('/recovery', function (req: Request, res: Response) {
    if (req.body) {
        const login = req.body.login;
        const birthday = req.body.birthday;
        const password = req.body.password;

        if (users.recoveryLogin({login, birthday, password})) {
            res.status(200);
        } else {
            res.status(401);
        }
    } else {
        res.status(400);
    }
    
    res.end();
});

module.exports = router;