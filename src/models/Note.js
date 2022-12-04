const mongoose = require("mongoose");
const autoIncrement =  require('mongoose-auto-increment')
autoIncrement.initialize(mongoose.connection);

const noteSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    fk_user_id:{
        type: Number,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});
noteSchema.plugin(autoIncrement.plugin, {
    model: 'Note',
    field: '_id',
    startAt: 0,
    incrementBy: 1,
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;