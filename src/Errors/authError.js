const { appError } = require("./appError");

class authError extends appError {
  constructor(message = "no autorizado", statusCode = 401) {
    super(message, statusCode);
  }
  static unauthorized(message = "token no válido o expirado") {
    return new authError(message || "no autorizado", 401);
  }
  static forbidden(message = "acceso prohibido") {
    return new authError(message || "acceso prohibido", 403);
  }
}

module.exports = { authError };
