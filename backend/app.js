const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

if (process.env.NODE_ENV == "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
  app.use(express.static("frontend/build"))
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const service = require("./routes/serviceRoute");
const user = require("./routes/userRoute");
const vendor = require("./routes/vendorRoute");



app.use("/api/v1", product);
app.use("/api/v1", service);
app.use("/api/v1", user);
app.use("/api/v1", vendor);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
