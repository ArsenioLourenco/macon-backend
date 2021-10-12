import "reflect-metadata";
import express from "express";

import "./database"

const app = express();

app.listen(5800, () => console.log('server running'))