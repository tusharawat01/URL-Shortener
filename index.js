const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const path = require ("path"); 
const cookieParser = require("cookie-parser");
const connectDB  = require("./db");

const { checkAuth } = require("./middlewares/auth.middleware");

const urlRoute = require("./routes/url.route")
const staticRouter = require("./routes/staticRouter.route")
const userRoute = require("./routes/user.route")


const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.error("Express side error : ", error);
            throw error;
        })
        app.listen(PORT || 8000, () => {
            console.log(`Server is running on PORT : http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection Failed : ", error)
    });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",checkAuth, staticRouter);
app.use("/url", urlRoute);
app.use("/user", userRoute);

