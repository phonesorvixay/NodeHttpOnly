import { Request, Response } from 'express';
import { Op } from "sequelize";
import { Service } from '../services/services';
import { CategoryEntity } from '../models/app.entity';
import { CategoryModel } from '../models/category.entity';
export class CategoryController {

    public static add(req: Request, res: Response) {
        const data = req.body as CategoryModel;
        CategoryEntity.create(data).then(result => {
            res.send(Service.success(result));
        }).catch(error => {
            res.send(Service.error([error]));
        })
    }

    public static active(req: Request, res: Response) {
        const data = req.body as CategoryModel;
        CategoryEntity.findByPk(data.id).then(async result => {
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
        const data = req.body as CategoryModel;
        CategoryEntity.findByPk(data.id).then(async result => {
            if (result) {
                Service.copyObject(data, result);
                await result.save();
                res.send(Service.success(result));
            } else {
                res.send(Service.error([]));
            }
        })
    }

    public static delete(req: Request, res: Response) {
        const data = req.body as CategoryModel;
        CategoryEntity.findByPk(data.id).then(async result => {
            if (result) {
                await result.destroy();
                res.send(Service.success(result));
            } else {
                res.send(Service.error([]));
            }
        })
    }

    public static listOne(req: Request, res: Response) {
        const data = req.body as CategoryModel;
        CategoryEntity.findOne({ where: { id: data.id } }).then(result => {
            res.send(Service.success(result));
        })
    }

    public static listAll(req: Request, res: Response) {
        CategoryEntity.findAll().then(result => {
            res.send(Service.success(result));
        })
    }

    public static listPage(req: Request, res: Response) {
        const data = req.body as CategoryModel;
        const offset: number = ((data.page - 1) * data.limit);
        const keyword: string = req.body.keyword ? String(req.body.keyword) : '';

        CategoryEntity.findAndCountAll({
            where: {
                [Op.or]: [
                    { categoryname: { [Op.like]: `%${keyword}%` } }
                ]
            }, order: [
                ['id', 'desc']
            ], limit: data.limit, offset: offset
        }).then(result => {
            res.send(Service.success(result));
        })
    }
}