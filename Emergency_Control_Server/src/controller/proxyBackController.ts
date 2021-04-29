import { Request, Response, NextFunction } from 'express'
import { pushMessageDto } from "../interface/pushMessageDto";
import { pushMessageOptions } from "../interface/pushMessageOptions";

//초기 설정(INIT)
var admin = require("firebase-admin");
var serviceAccount = require("../../../ncs-ims-firebase-adminsdk-f2ws7-080cafd303.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "gs://ncs-ims.appspot.com/"
});

//Send PushMessage
function sendPushMessageGroup(req: Request, res: Response) {
  let bodyData: pushMessageDto = {
    "title": req.body.title,
    "body": req.body.body,
    "topic": req.body.topic
  }
  //topic 없을때 에러처리 해야함
  const messages = [];
  let options: pushMessageOptions = {
    notification: { title: bodyData.title, body: bodyData.body },
    android: {
      notification: {
        sound: 'default'
      },
    },
    topic: bodyData.topic,
    apns: {
      payload: {
        aps: {
          badge: 1,
          sound: 'default',
          content_available: true,
        },
      },
    },
  }
  messages.push(options);
  admin.messaging().sendAll(messages)
    .then((response: any) => {
      console.log(response.successCount + ' messages were sent successfully');
      res.send("oo")
    });
}

function sendPushMessageIndividual(req: Request, res: Response) {
  let bodyData: pushMessageDto = {
    "title": req.body.title,
    "body": req.body.body,
  }
  let fcm_tokens = req.body.token
  if(fcm_tokens == undefined){res.json({"message" : "Token이 존재하지 않습니다."});}
  var notification_body = {
    'notification': bodyData,
    'registration_ids': fcm_tokens
  }
  const fetch = require('node-fetch');
  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      // replace authorization key with your key
      'Authorization': 'key=' + process.env.FIREBASE_SERVER_KEY,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(notification_body)
  }).then(function (response: any) {
    res.json(response);
  }).catch(function (error: any) {
    console.error(error);
  })
}

export {
  sendPushMessageGroup,
  sendPushMessageIndividual
}