
//additems
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },

    itemImage:String,
    description:String,
    price:String,
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName:String,

})

module.exports = mongoose.model('books',bookSchema)