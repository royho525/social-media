const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    //useFindAndModify: false, 
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(console.log("connected to db")).catch((err)=>console.log(err));

app.use("/api/user" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts" , postRoute);
app.listen(8080, () =>{
    console.log("Backend server is running!");
})