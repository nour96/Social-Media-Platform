import {join} from 'path'
import express from 'express'
import cors from 'cors'
import compresion from 'compression'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router.js'

const app = express();
app.use(cookieParser());

mongoose.connect('mongodb+srv://inourh:12120123@cluster0.xaxokot.mongodb.net/social-network?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'Connection Error!'));
db.once("open", () => {
    console.log('Database Connected!')
})

app.disable('x-powered-by');

app.use(express.json())
app.use(compresion());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);



app.listen(9080, () => {
    console.log('serving on port 9080')
})