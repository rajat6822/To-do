const connectDB = require("../SecondAttempt/src/config/db");
const app = require("./config/app");

connectDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})