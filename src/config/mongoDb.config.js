import mongoose from "mongoose";

const dbName = 'ecommerce'
const urldbb = `mongodb+srv://dossu:Dossu_2002@e-commerce.pb4c978.mongodb.net/${dbName}`

export const connectbdd = async () => {
    try {
        //conexion con mongodb
        mongoose.connect(urldbb)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}