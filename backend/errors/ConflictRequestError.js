const { CONFLICT_STATUS } = require('../utils/constants');

class ConflictRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_STATUS;
  }
}

module.exports = ConflictRequestError;
