const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/blog`)
        console.log(`connected to host: ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = connectDB