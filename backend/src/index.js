const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://heron:Part8416@cluster0-60xck.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

app.use(require('./routes'));
app.use(express.json());
app.listen(3333)


