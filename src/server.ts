import "reflect-metadata";
import express from "express";
import 'dotenv/config';

const app = express();                                                      //@TYPE/EXPRESS

const port = process.env.SERVER_PORT;                                       //GETTING PORT NUMBER FROM .ENV FILE

app.listen(port || 3000,() => {                                             //HTTP://LOCALHOST:3000
    console.log(`server is running...http://localhost:${port}`);
});