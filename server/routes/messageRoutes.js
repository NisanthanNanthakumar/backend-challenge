const { handleError } = require("../middlewares/handleError");

const mongoose = require("mongoose");
const validateRequest = require("../middlewares/validateRequest");

const Conversation = mongoose.model("conversations");

module.exports = app => {
  //Add message to conversation thread.
  app.post("/api/v1/messages", validateRequest, (req, res) => {
    const { sender, message, conversation_id } = req.body;
    Conversation.findById(conversation_id)
      .then(conversation => {
        let newMessage = { sender, message };
        let { messages } = conversation
        conversation.messages = [...messages, newMessage]
        return conversation.save();
      })
      .then(conversation => {
        res.status(201).send({
          conversation_id,
          message: "Success",
          description: "Message has been added to conversation thread."
        });
      })
      .catch(err => {
        handleError(err, res);
      });
  });
};
