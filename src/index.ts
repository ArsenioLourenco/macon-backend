// import "reflect-metadata";
// import express from "express";
// import 'dotenv/config';
// import routes from './routes'
// import "./database"

// const app = express();     
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: false }));                                                //@TYPE/EXPRESS

// const port = process.env.SERVER_PORT;                                       //GETTING PORT NUMBER FROM .ENV FILE

// app.use(routes)

// app.listen(port || 6800,() => {                                             //HTTP://LOCALHOST:6800
//     console.log(`server is running...http://localhost:${port}`);
// });
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

//options for cors midddleware
const options: cors.CorsOptions = {
  credentials: true,
  origin: 'http://localhost:6800',
};

//use cors middleware
app.use(cors(options));
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

 
