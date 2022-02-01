import Header from './components/header/Header';
import Subscription from './components/body/Subscription';
import './scss/main.scss';

function App() {
  return (
    <div className='app'>
      <div className="container">
        <Header />
        <Subscription />
      </div>
      <div className="background"></div>
    </div>
  );
}

export default App;
