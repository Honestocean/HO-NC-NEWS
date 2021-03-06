const handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (err, req, res, next) => {
  // console.log(err, "in the PSQL");
  const psqlErrors = {
    "22P02": {
      status: 400,
      msg: "invalid id or body input"
    },
    "23503": {
      status: 404,
      msg: "invalid id when attempting to post"
    },
    "42703": {
      status: 400,
      msg: "non existent id or bad query input when fetching data"
    }
  };

  const thisError = psqlErrors[err.code];
  // console.log(thisError);
  // console.log(thisError.status);
  // console.log(thisError.msg);

  if (thisError) {
    res.status(thisError.status).send(thisError.msg);
  } else {
    console.log(err);
    res.sendStatus(500);
  }
};

const send405Errors = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Found" });
};

module.exports = { handleCustomErrors, handlePSQLErrors, send405Errors };
