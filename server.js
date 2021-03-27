// import required modules
const express=require("express");
const mongoose=require("mongoose");
const logger=require("morgan");

const app=express();
const PORT=process.env.PORT|| 3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require('./app/models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

//Uncomment Line 21 to create demo data
// require('./seeders/seed.js')(db);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});