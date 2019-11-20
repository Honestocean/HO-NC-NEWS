const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "invalid id" });
  } else {
    next(err);
  }
};

module.exports = { handleCustomErrors, handlePSQLErrors };
