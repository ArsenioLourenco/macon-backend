import "./database";
import "dotenv/config";
import cors from "cors";
import "reflect-metadata";
import helmet from "helmet";
import logger from "morgan";
import routes from "./routes";
import express from "express";
// import "express-async-errors";
import dotenv from "dotenv-safe";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import { Response, Request, NextFunction } from "express";

dotenv.config({
  allowEmptyValues: true,
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.40.32:3000", "http://192.168.4.82:3000"],
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Path configure
app.use("/functionsPath", express.static("pathConf"));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
);

export default app;
