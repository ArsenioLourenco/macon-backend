import "./database";
import "dotenv/config";
import cors from "cors";
import 'reflect-metadata';
import helmet from "helmet";
import logger from "morgan";
import routes from './routes';
import express from "express";
import dotenv from "dotenv-safe";
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

dotenv.config({
  allowEmptyValues: true
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Path configure
app.use('/functionsPath', express.static('pathConf'));

app.use(routes);

export default app;

 
