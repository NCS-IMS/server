import express from 'express'
import * as bodyParser from 'body-parser';
// import emergencyCallRouter from "./router/emergency";
import userRouter from "./router/user";
import proxyFrontRouter from "./router/proxyFront";
import findDirectionRouter from "./router/findDirection";
import nuguRouter from "./router/nugu";
import breakerRouter from "./router/breaker";

import { createConnection } from 'typeorm';

const app = express()

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

//DB connect
createConnection()
.then(async connection => {
    interface Error {   //err handler 추가해야함..!
      status?: number;
      message?: string;
    }

}).catch(err=>console.log(err))


// app.use("/", indexRouter);

// app.use("/intro", introduceRouter);

// URL : /board/images/sky-690293_1920.jpg
// app.use("/board", boardRouter, express.static('src/public/upload'));

// app.use("/emergency", emergencyCallRouter);
app.use("/user", userRouter);
// app.use("/proxy", proxyFrontRouter);
app.use("/find", findDirectionRouter);
app.use("/nugu", nuguRouter);
app.use("/breaker", breakerRouter);

app.listen(process.env.MAIN_SERVER_PORT, ()=>{
    console.log("Main Server Start:",process.env.MAIN_SERVER_PORT)
})

//test
// export default app;