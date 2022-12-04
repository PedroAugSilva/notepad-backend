const mongoose = require("mongoose");
const autoIncrement =  require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection)


const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})


userSchema.plugin(autoIncrement.plugin, {
    model: 'User', field: '_id',
    startAt: 0,
    incrementBy: 1
})

module.exports = mongoose.model('User', userSchema);

