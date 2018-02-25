exports.handleError = (err, res) => {
  res.status(400).send({
    message: "Request failed",
    description: err
  });
};
