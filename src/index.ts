import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import express from "express";
import dotenv from 'dotenv-safe';
import helmet from "helmet";
import logger from 'morgan';
import cors from "cors";

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

app.use(cors());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Path configure
app.use('/functionsPath', express.static('pathConf'));

// Routes
app.use(routes);

const PORT = process.env.PORT || 6800;
//Listen Port
if (require.main == module) {
  app.listen(6800, 'localhost', () => {
    console.log(`SERVER ON PORT -- ${PORT} --`);
  });
}

export default app;

  // openSSL
// const options = {
//   key: fs.readFileSync("??"),
//   cert: fs.readFileSync("??")
// };

  // HTTPS listen API
  // https
  // .createServer(options, (req: Request, res: Response) => {
  //   res.writeHead(200);
  //   res.end("Running API with HTTPS!")
  // })