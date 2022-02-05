import SuccessIcon from '../../../images/success-icon.svg';

export default function SuccessMessage() {
  return (
    <div className="subscription__container success">
      <img className='subscription__success-icon' src={SuccessIcon} alt="goblet icon"></img>
      <p className="subscription__title">Thanks for subscribing!</p>
      <p className="subscription__description">
        You have successfully subscribed to our email listing. Check your email
        for the discount code.
      </p>
    </div>
  );
}
