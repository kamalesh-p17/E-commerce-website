import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    data: {
        type:Date,
        default: Date.now,
    },
    availabe: {
        type: Boolean,
        default: true,
    },
})

export const Product = mongoose.model("Product", productSchema);