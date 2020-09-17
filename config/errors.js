const errorCodes = {
  general: {
    unauthorized: {
      defaultMessage: "Unauthorized",
      id: "UNAUTHORIZED",
    },
    invalidToken: {
      defaultMessage: "Invalid Token",
      id: "INVALID_TOKEN",
    },
    internalServerError: {
      defaultMessage: "There was some server error...(todo)",
      id: "INTERNAL_SERVER_ERROR",
    },
  },
  auth: {
    userNotFound: {
      defaultMessage: "We could not find that user in our system",
      id: "USER_NOT_FOUND"
    },
    passwordsDontMatch: {
      defaultMessage: "Passwords dont match",
      id: "PASSWORDS_DONT_MATCH"
    },
    emailPasswordDoesntMatch: {
      defaultMessage: "Email and Password does not match",
      id: "EMAIL_PASSWORD_INCORRECT"
    }
  }
}

module.exports = errorCodes;
