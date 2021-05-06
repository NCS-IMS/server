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

//그룹 단위
function sendPushMessageGroup(title: string, body: string, topic: string) {
  let bodyData: pushMessageDto = {
    "title":title,
    "body": body,
    "topic": topic
  }

  //topic 없는 경우 
  if(topic == undefined){return 0}

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
  admin.messaging()
  .sendAll(messages)
  .then((response: any) => {
    console.log(response.successCount + ' messages were sent successfully');
    return 1;
  });
}

//개인 단위
async function sendPushMessageIndividual(title: string, body: string, token:object) {
  let bodyData: pushMessageDto = {
    "title": title,
    "body": body,
  }
  //Token 없는 경우 
  if(token == undefined) return 0;
  let fcm_tokens = token

  var notification_body = {
    'notification': bodyData,
    'registration_ids': fcm_tokens
  }

  const fetch = require('node-fetch');
  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      // replace authorization key with your key
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(notification_body)})
  .then(function (response: any) {
    return 1;
  })
  .catch(function (error: any) {
    throw error
  })
}

export {
  sendPushMessageGroup,
  sendPushMessageIndividual
}