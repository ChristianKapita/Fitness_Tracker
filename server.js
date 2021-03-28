// import required modules
const express=require("express");
const mongoose=require("mongoose");
const logger=require("morgan");

const app=express();
const PORT=process.env.PORT|| 8080;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {
useNewUrleParser: true,
usedUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

//Uncomment to seed data to MongoDB
//require('./seeders/seed');



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});