import { createLogger, transports, format} from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

interface TransformableInfo {
    level: string;
    message: string;
    [key: string]: any;
}

const logger = createLogger({
    transports: [
        //Console
        new transports.Console({
            level: 'debug',
            format: format.combine(
                // format.label({ label: '[MyWeb Server]' }),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.colorize(),
                format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`),
            )
        }),
        new winstonDaily({
            filename : 'log/system.log', // log 폴더에 system.log 이름으로 저장
            zippedArchive: false, // 압축여부
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`),
            ) 
        })
    ]
});
export {
    logger
};