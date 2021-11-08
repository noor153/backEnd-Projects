const mongoose = require("mongoose");
const connectdb = (url)=>{new mongoose.connect(url)
  .then(() => console.log("db connected"))
  .catch(() => console.log("db connection Failed"));
}

module.exports = connectdb;
