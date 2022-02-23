import { Request, Response } from 'express';
import { Op } from "sequelize";
import { Service } from '../services/services';
import { UserModel, ChengePassword } from '../models/user.entity';
import { UserEntity } from '../models/app.entity';

export class UserConroller {

    public static add(req: Request, res: Response) {
        const data = req.body as UserModel;
        UserEntity.findOne({ where: { username: data.username } }).then(result => {
            if (result) {
                res.send(Service.success([], `Username: ${data.username} is already exist!`, 0));
            } else {
                data.isActive = false;
                UserEntity.create(data).then(result => {
                    res.send(Service.success(result));
                }).catch(error => {
                    res.send(Service.error([error]));
                })
            }
        })
    }

    public static active(req: Request, res: Response) {
        const data = req.body as UserModel;
        UserEntity.findByPk(data.id).then(async result => {
            if (result) {
                result.isActive = true;
                await result.save();
                res.send(Service.success(result));
            } else {
                res.send(Service.error([]));
            }
        })
    }

    public static update(req: Request, res: Response) {
        const data = req.body as UserModel;
        UserEntity.findByPk(data.id).then(async result => {
            if (result) {
                UserEntity.findOne({ where: { username: data.username, id: { [Op.not]: data.id } } }).then(async result2 => {
                    if (result2) {
                        res.send(Service.error([], `Username: ${data.username} is already exist!`));
                    } else {
                        Service.copyObject(data, result);
                        await result.save();
                        res.send(Service.success(result));
                    }
                })
            } else {
                res.send(Service.error([]));
            }
        }).catch(error => {
            console.log(error);

        })
    }

    public static changePassword(req: Request, res: Response) {
        const data = req.body as ChengePassword;
        UserEntity.findByPk(data.id).then(async result => {
            if (result) {
                if (result.validPassword(data.oldPassword)) {
                    result.password = data.newPassword;
                    await result.save();
                    res.send(Service.success(result));
                } else {
                    res.send(Service.error([], `Old password: ${data.oldPassword} wrong!`));
                }
            } else {
                res.send(Service.error([]));
            }
        }).catch(error => {
            res.send(Service.error([error]));
        })
    }

    public static delete(req: Request, res: Response) {

        const data = req.body as UserModel;
        UserEntity.findByPk(data.id).then(async result => {
            if (result) {
                await result.destroy();
                res.send(Service.success(result));
            } else {
                res.send(Service.error([]));
            }
        })
    }

    public static listOne(req: Request, res: Response) {
        const data = req.body as UserModel;
        UserEntity.findOne({ where: { id: data.id } }).then(result => {
            res.send(Service.success(result));
        })
    }

    public static listAll(req: Request, res: Response) {
        UserEntity.findAll().then(result => {
            res.send(Service.success(result));
        })
    }

    public static listPage(req: Request, res: Response) {
        const data = req.body as UserModel;
        const offset: number = ((data.page - 1) * data.limit);
        const keyword: string = req.body.keyword ? String(req.body.keyword) : '';

        UserEntity.findAndCountAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${keyword}%` } }
                ]
            }, order: [
                ['id', 'desc']
            ], limit: data.limit, offset: offset
        }).then(result => {
            res.send(Service.success(result));
        })
    }
}
