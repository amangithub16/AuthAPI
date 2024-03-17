import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(cors())
app.use(cors({origin: "http://127.0.0.1:5500/frontend/test.html"}))


import userRouter from './routes/user.routes.js'

app.use(cors())
app.use('/', async(req,res)=>{
    res.send("Welcome to the API")
})
app.use('/api', userRouter)


export {
    app
}