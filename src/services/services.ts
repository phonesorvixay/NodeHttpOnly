import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import { UserModel } from '../models/user.entity';
export class Service {

    public static success(data: any, message: string = "success", status: number = 1) {
        return { status, message, data };
    }

    public static error(data: any, message: string = "failed!", status: number = 0) {
        return { status, message, data };
    }

    public static jwtEncode(data: UserModel) {
        try {
            return jwt.sign({
                data,
            }, Keys.jwtKey, { expiresIn: '10000000000H' });
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    public static validateJwt(jwtEncode: string): boolean {
        if (!jwtEncode) return false;
        try {
            jwt.verify(jwtEncode, Keys.jwtKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    public static genUUID() {
        // return uuid.v1();
    }

    public static clone(data: any) {
        return JSON.parse(JSON.stringify(data))
    }

    public static copyObject(a: any, b: any) {
        for (const key in a) {
            if (Object.prototype.hasOwnProperty.call(a, key)) {
                b[key] = a[key];
            }
        }
    }
}

export const  enum TableName {
    users = 'users',
    category = 'category'
}

enum Keys {
    jwtKey = 'Dx4YsbptOGuHmL94qdC2YAPqsUFpzJkc'
}