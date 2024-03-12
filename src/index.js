import connection_DB from './db/index.js'
import { app } from './app.js'
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});


connection_DB()
.then((result)=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("print errrr",err);
})


