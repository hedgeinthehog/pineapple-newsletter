import { useCallback, useEffect, useState } from 'react';
import QueryInput from './QueryInput';
import DataTable from './SortableDataTable';
import DomainList from './DomainList';
import { getAll, remove } from '../../../api-requests/api-requests';

export default function SubscribersData() {
  const [subscribers, setSubscribers] = useState(null);
  const [query, setQuery] = useState('');
  const [domains, setDomains] = useState([]);
  const [domainFilter, setDomainFilter] = useState('');

  // Fetches all subscribers from database, updates state
  const updateSubscribers = useCallback(async () => {
    try {
      const response = await getAll();
      const { subscribers: data } = await response.json();
      setSubscribers(data);
    } catch (error) {
      alert('Unexpected error, please try again');
    }
  }, []);

  // Creates list of all domains
  const getEmailDomains = data => {
    const domains = [];
    data.forEach(({ email }) => {
      const domain = email.split('@').pop().toLowerCase();
      if (!domains.includes(domain)) domains.push(domain);
    });
    setDomains(domains);
  };

  // Fetches all subscribers on first render, then
  // each 1/4 minutes to update the table
  // ( might not be the best way )
  useEffect(() => {
    updateSubscribers();
    const intervalId = setInterval(() => {
      updateSubscribers();
    }, 15000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updateSubscribers]);

  // Updates domains list when subscribers list updates
  useEffect(() => {
    if (subscribers) getEmailDomains(subscribers);
  }, [subscribers]);

  const filteredData = () => {
    // Filters emails by user query
    let data = [...subscribers];
    if (query) {
      data = data.filter(({ email }) =>
        email.toLowerCase().includes(query.toLowerCase()),
      );
    }

    // Filters by domain
    if (domainFilter) {
      data = data.filter(({ email }) => {
        const domain = email.split('@').pop().toLowerCase();
        return domain === domainFilter;
      });
    }
    return data;
  };

  // Removes subscriber. Function is passed down to data table and
  // is being called on button click
  const removeSubscriber = async id => {
    try {
      await remove(id);
      setSubscribers(subscribers => subscribers.filter(sub => sub.id !== id));
    } catch (error) {
      alert("Couldn't remove item");
    }
  };

  return (
    <div>
      <QueryInput onQueryChange={setQuery} value={query} />
      {!subscribers && <p className="loader">loading data...</p>}
      {domains && (
        <DomainList domains={domains} onSetFilter={setDomainFilter} />
      )}
      {subscribers && subscribers.length > 0 && (
        <DataTable data={filteredData()} onRemove={removeSubscriber} />
      )}
    </div>
  );
}
