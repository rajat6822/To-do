const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try {

        await mongoose.connect('mongodb://0.0.0.0/todo')
        console.log('MongoDB connected')
        
    } catch (error) {
        console.log('Error in connecting DB', error)
    }
}

module.exports = connectDB