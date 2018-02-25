const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/Conversation");
require("./models/Message");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require("./routes/conversationRoutes")(app);
require("./routes/messageRoutes")(app);

app.all("*", (req, res) => {
  res
    .status(404)
    .send({
      message: "Not Found",
      description: "The requested resource doesn't exist."
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
