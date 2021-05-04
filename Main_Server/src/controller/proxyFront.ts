import {Request, Response, NextFunction} from 'express'
//TEST
function emergencyManPushMessage (req:Request, res:Response){
    var request = require('request');
    var ff = {
        title:"aa my",
        body:"fdsa",
        token:[
            "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
            "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
          ]
    }
    request.post({
        headers: {'content-type':'application/json'},
        url: 'http://conative.myds.me:43043/proxy/fcm/individual',
        body: ff,
        json:true
        }, function(err : any, response: any, body: any){
            res.json('body');
    })
}
export{
    emergencyManPushMessage
}