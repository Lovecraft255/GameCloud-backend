const { appError } = require("./appError");

class validationError extends appError{
  constructor(message, details) {
    super(message, 400);
    this.details = details;
  }
}

module.exports = { validationError };
