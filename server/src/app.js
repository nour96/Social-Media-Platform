const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user')

mongoose.connect('mongodb+srv://inourh:12120123@cluster0.xaxokot.mongodb.net/social-network?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => {
    console.log("Database Connected!")
})

app.get('/', (req, res) => {
    res.send('Hello !')
})

app.get('/newuser', async (req, res) => {
    const user1 = new User({
        user_name: 'i_shinx',
        age: 18,
        gender: 'male'
    })
    await user1.save();
    res.send(user1)
})
app.listen(3000, () => {
    console.log('serving on port 3000')
})