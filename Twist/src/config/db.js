const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/twist')
        console.log('MongoDB connected')
        
    } catch (error) {
        console.log('Error in connecting MongoDB', error)
    }
}

module.exports = connectDB