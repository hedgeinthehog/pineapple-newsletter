import { useState } from 'react';
import { CSVLink } from 'react-csv';
import Pagination from './Pagination';
import useSortableData from '../../../helpers/make-data-sortable';

export default function SortableDataTable({ data, onRemove }) {
  const { items, requestSort } = useSortableData(data, 'date');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = items.slice(firstItemIndex, lastItemIndex);

  // Updates current page number
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // Header for exported CSV table
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Email', key: 'email' },
    { label: 'Registration Date', key: 'date' },
  ];

  // Updates items selected for export
  const handleItemSelect = ({ e, item: selectedItem }) => {
    const { checked } = e.target;
    if (!checked) {
      setSelectedItems(items =>
        items.filter(item => item.id !== selectedItem.id),
      );
      return;
    }
    if (checked) {
      if (selectedItems.find(item => item.id === selectedItem.id)) return;
      setSelectedItems(items => [...items, selectedItem]);
    }
  };

  return (
    <>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>
                <button type="button" onClick={() => requestSort('email')}>
                  Email
                </button>
              </th>
              <th>
                <button type="button" onClick={() => requestSort('date')}>
                  Date
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={e => handleItemSelect({ e, item })}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={() => onRemove(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
      <CSVLink
        className="export-link"
        data={selectedItems}
        headers={headers}
      >
        Export as CSV
      </CSVLink>
    </>
  );
}
