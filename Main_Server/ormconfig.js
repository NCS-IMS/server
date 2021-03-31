require('dotenv').config({ path : ".env" });

var ORMCONFIG ={
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER_NAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.MAIN_DB_NAME,
   "synchronize": true,
   "logging": false,
   
   "migrations": [
      "Main_Server/src/migration/**/*.ts"
   ],
   "subscribers": [
      "Main_Server/src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "Main_Server/src/entity",
      "migrationsDir": "Main_Server/src/migration",
      "subscribersDir": "Main_Server/src/subscriber"
   }
}
if(process.env.SERVICE_TYPE == 'DEVELOP'){
   console.log("Test Server Start")
   ORMCONFIG.entities = [
      "Main_Server/src/model/entity/**/*.ts",
   ]
}else if(process.env.SERVICE_TYPE == 'MASTER'){
   console.log("Real Server Start")
   ORMCONFIG.entities = [
      "Main_Server/dist/model/entity/**/*.js"
   ]
}

module.exports = ORMCONFIG