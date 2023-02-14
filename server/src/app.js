import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'

const app = express();

mongoose.connect('mongodb+srv://inourh:12120123@cluster0.xaxokot.mongodb.net/social-network?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'Connection Error!'));
db.once("open", () => {
    console.log('Database Connected!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(compresion());
app.use('/api', router);


app.listen(3000, () => {
    console.log('serving on port 3000')
})