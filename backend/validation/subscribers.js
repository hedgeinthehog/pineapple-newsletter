module.exports.validateCreateSubscriber = (req, _, next) => {
  const { email, agreement } = req.body;

  if (!email) {
    return validate(errorMessages.fieldEmpty, next);
  }
  if (!isEmailValid(email)) {
    return validate(errorMessages.invalidEmail, next);
  }
  if (isColumbianEmail(email)) {
    return validate(errorMessages.colombian, next);
  }
  if (!agreement) {
    return validate(errorMessages.agreementNotAccepted, next);
  }
  return validate(null, next);
};

const errorMessages = {
  fieldEmpty: 'Email address is required',
  invalidEmail: 'Please provide a valid email address',
  colombian: 'We are not accepting subscriptions from Colombia',
  agreementNotAccepted: 'You must accept the terms and conditions',
  unexpectedError: 'Unexpected error occured, please try again',
};

const validate = (errorMessage, next) => {
  if (errorMessage) {
    return next({
      status: 400,
      message: errorMessage,
      data: 'Bad request',
    });
  }
  next();
};

const isEmailValid = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()));
};

const isColumbianEmail = email => {
  const domainExtencion = email.split('.').pop();
  return domainExtencion === 'co';
};
