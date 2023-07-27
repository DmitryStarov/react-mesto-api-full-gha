const { NOT_FOUND_STATUS } = require('../utils/constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

module.exports = NotFound;
