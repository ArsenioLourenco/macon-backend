import http from "http";
import app from "./index";

const 
    serverHttp = http.createServer(app),
    PORT = process.env.PORT || 6800,
    HOST = '0.0.0.0';

if(require.main == module){
  serverHttp.listen(6800, HOST, () => {
    console.log(`SERVER ON PORT [--- ${PORT} ---]`);
  });
}