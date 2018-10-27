import { Router, Response, Request } from 'express';
const router = Router();
import { getUserByToken } from '../shared/getUserByToken';
import { getToken } from '../shared/getToken';
import { IUserAuth } from '../models/IUserAuth';
import { IUser } from '../models/IUser';
const users = require('../models/Users');

router.get('', function (req: Request, res: Response) {
    const data = getUserByToken(req);
    
    if (data.user) {
        const id: {id: number} = {id: (data.user as IUser)['id']};
        res.status(200).send(id);
    } else {
        res.status(401);
    }
    res.end();
});

router.get('/find/:name', function (req: Request, res: Response) {
    const name = req.params['name'];
    const data = getUserByToken(req);

    setTimeout(() => {
        if (data.user && (data.user as IUser)['name'] === name) {
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
            const user: IUserAuth = users.checkLogin({login, password});
            if (user.isAuthenticated === true) {
                const secret = req.app.get('secret');
                const token = getToken(user.user, secret);

                res.cookie('auth_token', token);                
                res.status(200);
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