import Header from '../components/header/Header';
import Subscription from '../components/body/subscription/Subscription';

function SubscriptionPageView() {
  return (
    <>
      <div className="container">
        <Header />
        <Subscription />
      </div>
      <div className="background"></div>
    </>
  );
}

export default SubscriptionPageView;
