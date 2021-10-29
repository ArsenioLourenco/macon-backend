import "dotenv/config";
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import swaggerJdocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import dotenv from "dotenv-safe";
import helmet from "helmet";
import logger from "morgan";
import http from "http"
import cors from "cors";
import routes from './routes'
import "./database";

dotenv.config({
  allowEmptyValues: true
});

const app = express();
const serverHttp = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Macon-Api-Documentation",
      description: "This is the endepoint docs from macon-backEnd || api",
      contact: {
        name: "Interdigitos LDA"
      },
      servers: ["http://localhost:6800"]
    }
  },
  apis: ["./routes/users.routes.ts"]
};
const swaggerDocs = swaggerJdocs(
  swaggerOptions
);
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/functionsPath', express.static('pathConf'));

app.use(routes);

const PORT = process.env.PORT || 6800;
const HOST = '0.0.0.0';

if(require.main == module){
  serverHttp.listen(6800, HOST, () => {
    console.log(`SERVER ON PORT -- ${PORT} --`);
  });
}
export default app;

 
