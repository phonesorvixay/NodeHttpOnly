import { BuildOptions, DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';
import { BaseModel } from './base.model';

export interface CategoryModel extends BaseModel {
    categoryname: string;
    description: string;
}

export interface CategorySequelizeModel extends Model<CategoryModel>, CategoryModel {
}

export type CategoryStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): CategorySequelizeModel;
}

export const CategoryFactory = (name: string, sequelize: Sequelize): CategoryStatic => {
    const attributes: ModelAttributes<CategorySequelizeModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        categoryname: {
            type: DataTypes.STRING, allowNull: false
        },
        description: {
            type: DataTypes.STRING, allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
        }
    }
    let table = sequelize.define(name, attributes, { tableName: name, freezeTableName: true, timestamps: true }) as CategoryStatic;
    return table;
}