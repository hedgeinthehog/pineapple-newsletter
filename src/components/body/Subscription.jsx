import SubscriptionForm from './SubscriptionForm';
import SocialLinksBar from './SocialLinksBar';
// import SuccessMessage from './SuccessMessage';

export default function Subscription() {
  return (
    <div className="content__container">
      <div className="content__wrapper">
        <SubscriptionForm />
        <SocialLinksBar />
      </div>
    </div>
  );
}

// <div className="content__container success">
//   <div className="content__wrapper">
//     <SuccessMessage />
//     <SocialLinksBar />
//   </div>
// </div>
