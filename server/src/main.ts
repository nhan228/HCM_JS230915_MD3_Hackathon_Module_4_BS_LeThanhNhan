import express from 'express'
const app = express()

import cors from 'cors'
app.use(cors())

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import ApiRoute from './routes'
app.use("/api", ApiRoute)

app.listen(4000, () => {
    console.log(`Server on: http://127.0.0.1:4000`)
})