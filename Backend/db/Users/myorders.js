//myorders

const mongoose = require('mongoose');

const bookschema = new mongoose.Schema({
    flatno:String,
    pincode:String,
    city:String,
    totalamount:String,
    seller:String,
    sellerId:String,
    booktitle:String,
    bookauthor:String,
    bookgenre:String,
    itemImage:String,
    description:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName:String,
    BookingDate: {
        type:String,
        default: ()=> new Date().toLocaleDateString('hi-IN')
    }, 
    Delivery:{
        type:String,
        default: ()=>{
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate()+7);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() +1;
            const year = currentDate.getFullYear();
            const formattedDate = `${month}/${day}/${year}`;
            return formattedDate;
        }
    }
})

module.exports = mongoose.model('myorders',bookschema)
