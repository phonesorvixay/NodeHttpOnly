import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { initDB } from './models/app.entity';
import { EMsg } from './services/message';
import api from './api/api';

export let app = express();

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

app.use(cors());
app.use(cookieParser());

app.use('/', api)

app.use((req, res) => {
    const error = new Error(EMsg.notFound);
    console.log(error.message)
    res.status(404).json({
        message: error.message,
        status: 0
    });
});


let PORT = parseInt(process.env.HTTP_PORT);
app.listen(PORT, process.env.HTTP_HOST, () => {
    console.log(EMsg.httpRuning + PORT);
    initDB();

});