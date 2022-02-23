import { NextFunction, Request, Response } from 'express';
import { Service } from '../services/services';
import { UserModel, LogIn } from '../models/user.entity';
import { UserEntity } from '../models/app.entity';
import { EMsg } from '../services/message';
export class AuthorizeController {

    public static logIn(req: Request, res: Response) {
        const user = req.body as LogIn;
        UserEntity.findOne({ where: { username: user.username } }).then(result => {
            if (result) {
                if (result.validPassword(user.password)) {
                    const user = Service.clone(result);
                    delete user.password;
                    const token = Service.jwtEncode(user as UserModel);
                    res.send(Service.success({ user, token }));
                } else {
                    res.send(Service.error([]))
                }
            } else {
                res.send(Service.error([]));
            }
        }).catch(error => {
            res.send(Service.error([error]));
        })
    }

    public static checkAuthorize(req: Request, res: Response, next: NextFunction) {
        const token: string = req.headers['token'] + '';
        Service.validateJwt(token) ? next() : res.status(402).send(Service.success(token, EMsg.haveNoAuthorize, 0));
    }
}
