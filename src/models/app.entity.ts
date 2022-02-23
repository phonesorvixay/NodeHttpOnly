import { Dialect, Sequelize } from "sequelize";
import { TableName } from "../services/services";
import { CategoryFactory } from "./category.entity";
import { UserFactory } from "./user.entity";

export const DBconnection = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASS || "",
    {
        host: process.env.DB_HOST || "",
        dialect: "mysql",
        timezone: process.env.DB_TIMEZONE || "+07:00",
        logging: false
    });

export const UserEntity = UserFactory(TableName.users, DBconnection);
export const CategoryEntity = CategoryFactory(TableName.category, DBconnection);


export async function initDB() {
    try {
        await UserEntity.sync({ alter: true });
        await CategoryEntity.sync({ alter: true });
    } catch (e) {
        console.log(e);
    }
};
