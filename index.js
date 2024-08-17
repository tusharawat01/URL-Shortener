const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const connectDB  = require("./db");
const urlRoute = require("./routes/url.route")

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express side error : ", error);
            throw error;
        })
        app.listen(PORT || 8000, () => {
            console.log(`Server is running on PORT : ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection Failed : ", error)
    });

app.use("/api", urlRoute);

