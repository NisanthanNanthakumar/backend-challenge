const mongoose = require("mongoose");
const { handleError } = require("../middlewares/handleError");
const Conversation = mongoose.model("conversations");

module.exports = app => {
  app.get("/api/v1/conversations/:id", (req, res) => {
    Conversation.findById(req.params.id)
      .then(conversation => res.status(200).send(conversation))
      .catch(err => {
        handleError(err, res);
      });
  });

  //Create a new conversation.
  app.post("/api/v1/conversations", async (req, res) => {
    try {
      const conversation = new Conversation();
      const conv = await conversation.save();
      res
        .status(201)
        .send({
          conversation_id: conv.id,
          message: "Success",
          description: "New conversation has been created."
        });
    } catch (err) {
      handleError(err, res);
    }
  });
};
