import express from 'express'
import * as bodyParser from 'body-parser';
import emergencyCallRouter from "./router/emergency";
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

app.use("/emergency", emergencyCallRouter);
// app.use("/user", userRouter);

app.listen(process.env.EMERGENCY_SERVER_PORT, ()=>{
  console.log("Emergency Server Start:",process.env.EMERGENCY_SERVER_PORT)
})

//test
// export default app;