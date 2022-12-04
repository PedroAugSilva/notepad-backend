const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors =  require('cors');
const routesUser = require('./routes/user');
const routesNote = require('./routes/note')

app.use(cors());
app.use(express.json());

app.use(routesNote);
app.use(routesUser)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(() => {
    console.log('banco conectado com sucesso');
})
.catch((err) => {
    console.log(err)
})

app.listen(process.env.PORT || 8000)