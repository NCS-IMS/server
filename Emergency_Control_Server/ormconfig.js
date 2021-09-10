require('dotenv').config({ path : ".env" });

var ORMCONFIG ={
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER_NAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.EMERGENCY_DB_NAME,
   "synchronize": true,
   "logging": false,
   
   "migrations": [
      "Emergency_Control_Server/src/migration/**/*.ts"
   ],
   "subscribers": [
      "Emergency_Control_Server/src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "Emergency_Control_Server/src/entity",
      "migrationsDir": "Emergency_Control_Server/src/migration",
      "subscribersDir": "Emergency_Control_Server/src/subscriber"
   }
}
if(process.env.SERVICE_TYPE == 'DEVELOP'){
   console.log("Test Server Start <Emergency Server>")
   ORMCONFIG.entities = [
      "Emergency_Control_Server/src/model/entity/**/*.ts",
   ]
}else if(process.env.SERVICE_TYPE == 'MASTER'){
   console.log("Real Server Start <Emergency Server>")
   ORMCONFIG.entities = [
      "Emergency_Control_Server/dist/model/entity/**/*.js"
   ]
}

module.exports = ORMCONFIG