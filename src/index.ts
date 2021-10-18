import "reflect-metadata";
import express from "express";
import 'dotenv/config';

import routes from './routes'

import "./database"

const app = express();     
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));                                                //@TYPE/EXPRESS

const port = process.env.SERVER_PORT;                                       //GETTING PORT NUMBER FROM .ENV FILE


app.use(routes)

app.listen(port || 6800,() => {                                             //HTTP://LOCALHOST:6800
    console.log(`server is running...http://localhost:${port}`);
});