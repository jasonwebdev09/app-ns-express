const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        trim: true
    },
    product_name: {
        type: String,
        default: false
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product