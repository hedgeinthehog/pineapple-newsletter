import { useState } from 'react';
import errorMessages from '../../helpers/email-validation-errors';

export default function SubscriptionForm({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [error, setError] = useState('Email address is required');

  // Page shows error message only after mouseEnter or touchStart event occured on form wrapper
  const handleFormEnter = () => {
    setFormTouched(true);
  };

  // Updates subscriptions' state in Subscription (parent) component
  const handleSubmit = e => {
    e.preventDefault();
    onSubscribe(true);
  };

  // Takes care of email input
  const formHandler = e => {
    const { value } = e.target;
    setEmail(value);
    // Sets error message if no email address has been provided
    if (!value) {
      setError(errorMessages.fieldEmpty);
      return;
    }
    // Sets error message if email address is invalid
    if (!isEmailValid(value)) {
      setError(errorMessages.invalidEmail);
      return;
    }
    // Sets error message if email ends with '.co'
    if (isColumbianEmail(value)) {
      setError(errorMessages.colombian);
      return;
    }

    // Removes any errors if agreement has been accepted,
    // sets a new error if agreement is not accepted
    agreed ? setError('') : setError(errorMessages.agreementNotAccepted);
  };

  // Takes care of agreement checkbox status
  const agreementHandler = e => {
    const { checked } = e.target;
    setAgreed(checked);

    // Removes error if error relates to unaccepted agreement
    if (checked && error === errorMessages.agreementNotAccepted) {
      setError('');
      return;
    }

    // Sets error when agreement checkbox is unchecked, if there is no different error
    if (!checked && !error) {
      setError(errorMessages.agreementNotAccepted);
      return;
    }
  };

  const isEmailValid = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  };

  const isColumbianEmail = email => {
    const domainExtencion = email.split('.').pop();
    return domainExtencion === 'co';
  };

  return (
    <div
      className="subscription__container"
      onMouseEnter={handleFormEnter}
      onTouchStart={handleFormEnter}
    >
      <h2 className="subscription__title">Subscribe to newsletter</h2>
      <p className="subscription__description">
        Subscribe to our newsletter and get 10% discount on pineapple glasses.
      </p>
      <form className="subscription" onSubmit={e => handleSubmit(e)}>
        <div className="input-wrapper">
          <input
            className="input"
            name="email"
            onChange={e => formHandler(e)}
            value={email}
            type="text"
            placeholder="Type your email address here…"
          />
          <button
            className="input__button"
            disabled={error || !agreed || !email}
            type="submit"
          >
            <div className="icon">
              <i className="icofont-long-arrow-right"></i>
            </div>
          </button>
          {formTouched && error && <p className="error-message">{error}</p>}
        </div>
        <div className="agreement-wrapper">
          <label className="agreement__label">
            <input
              className="agreement__checkbox"
              name="agreement"
              onChange={e => agreementHandler(e)}
              checked={agreed}
              type="checkbox"
            />
            I agree to{' '}
            <a className="agreement__link" href="/#">
              terms of service
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}
