import express from 'express'

const app = express()
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
import userRouter from './routes/user.routes.js'

app.use('/api', userRouter)

export {
    app
}