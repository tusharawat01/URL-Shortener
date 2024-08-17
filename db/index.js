const mongoose = require("mongoose");
const mongodbUri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(mongodbUri)
        console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB Connection Error : ", error);
        process.exit(1);
    }
}

module.exports = connectDB;