import mongoose, { connect } from 'mongoose'
import color from 'colors'
const connectDb= async ()=>{
    try {
     const connect= await mongoose.connect(process.env.MONGO_URI)
     console.log(`Connected ${connect.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error ${error}`.bgRed.white)
    }

}

export default connectDb