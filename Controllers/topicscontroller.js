const { selectAllTopics } = require("../Models/topicsModel");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then(topics => {
    console.log({ topics });
    res.status(200).send({ topics });
  });
};
