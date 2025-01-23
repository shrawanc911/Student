import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from "./routes/routes.js"


dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_DB_URL)
    .then(()=> console.log("Database Connected Successfully"))
    .catch((err)=>console.log(err))

app.use("/att",routes)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})
