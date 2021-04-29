export interface pushMessageOptions{
    // id?:number;
    notification: object;
    android: object;
    apns: object;
    topic?: string;
    token?: string;
}