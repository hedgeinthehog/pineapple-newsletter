import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubscriptionPageView from './views/SubscriptionPageView';
import SubscribersDataView from './views/SubscribersDataView';
import './scss/main.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SubscriptionPageView />} />
          <Route path="admin" element={<SubscribersDataView />} />
          <Route path="*" element={<h1>Opps, page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
