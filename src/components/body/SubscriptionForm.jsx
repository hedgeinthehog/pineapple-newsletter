export default function SubscriptionForm() {
  return (
    <div className="subscription__container">
      <h2 className="subscription__title">Subscribe to newsletter</h2>
      <p className="subscription__description">
        Subscribe to our newsletter and get 10% discount on pineapple glasses.
      </p>
      <form className="subscription">
        <div className="input-wrapper">
          <input
            className="input"
            type="text"
            placeholder="Type your email address here…"
          />
          <button className="input__button" type="submit">
            <div className="icon">
              <i className="icofont-long-arrow-right"></i>
            </div>
          </button>
        </div>
        <div className="agreement-wrapper">
          <label className="agreement__label">
            <input className="agreement__checkbox" type="checkbox" />I agree to{' '}
            <a className="agreement__link" href="/#">
              terms of service
            </a>
          </label>
        </div>
      </form>
    </div>
  );
}
