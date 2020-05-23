const express = require("express");
const mongoose = require("mongoose");
const employment = require("./routes/employment");
const connect = require("./routes/connect-us");
const register = require("./routes/register-data");
const cors = require("cors");
const path = require("path");
const user = require("./routes/user");
const auth = require("./routes/auth");

mongoose
  .connect(
    "mongodb+srv://corefix:corefix@cluster0-b0kvb.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connect with mongoDB with successfully"))
  .catch((err) => console.log(err));
const app = express();

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads", express.static(__dirname + "/uploads"));



app.use("/employment", employment);
app.use("/connect", connect);
app.use("/register", register);
app.use("/user", user);
app.use("/auth", auth);

const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
