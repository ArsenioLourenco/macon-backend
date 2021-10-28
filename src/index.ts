import "dotenv/config";
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import express from "express";
import dotenv from "dotenv-safe";
import helmet from "helmet";
import logger from "morgan";
import http from "http"
import cors from "cors";
import swaggerDocs from "./swagger.json";
// Routes
import routes from './routes'
// Database import
import "./database";

// Eviroments variables
dotenv.config({
  allowEmptyValues: true
});

// App
const app = express();
const serverHttp = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// OpenApi||API documentation
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "",
//       description: "",
//       contact: {
//         name: "Interdigitos LDA"
//       },
//       servers: ["http://localhost:6800"]
//     }
//   },
//   apis: ["./routes/users.routes.ts"]
// };
// const swaggerDocs = swaggerJdocs(
//   swaggerOptions
// );
// getting all routes
app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Path configure
app.use('/functionsPath', express.static('pathConf'));

// Routes
app.use(routes);
// Server Configs
const PORT = process.env.PORT || 6800;
const HOST = '0.0.0.0';
//Listen Port
if(require.main == module){
  serverHttp.listen(6800, HOST, () => {
    console.log(`SERVER ON PORT -- ${PORT} --`);
  });
}
export default app;
