const { UNAUTH_STATUS } = require('../utils/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_STATUS;
  }
}

module.exports = AuthError;
