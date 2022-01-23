const express = require('express')
const app = express()
const port = 5000

<<<<<<< HEAD
=======
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({exteded: true}));
//application/json
app.use(bodyParser.json());

>>>>>>> 697bb43 (비밀 정보 보호)
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    //useNewUrlParser:true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!!!!'))

app.listen(port, () => console.log(`Example app listening an port ${port}!`))