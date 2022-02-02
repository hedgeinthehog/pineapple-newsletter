import { useState } from 'react';
import SubscriptionForm from './SubscriptionForm';
import SocialLinksBar from './SocialLinksBar';
import SuccessMessage from './SuccessMessage';

export default function Subscription() {
  const [subscriptionSuccessfull, setSubscriptionSuccessfull] = useState(false);

  return (
    <div
      className={`content__container${
        subscriptionSuccessfull ? ' success' : ''
      }`}
    >
      <div className="content__wrapper">
        {subscriptionSuccessfull ? (
          <SuccessMessage />
        ) : (
          <SubscriptionForm onSubscribe={setSubscriptionSuccessfull} />
        )}
        <SocialLinksBar />
      </div>
    </div>
  );
}
