const BASE_URL = 'http://localhost:8080';

const subscribe = formData => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  return fetch(`${BASE_URL}/api/`, settings);
};

const getAll = () => {
  return fetch(`${BASE_URL}/api/`);
}

const remove = (id) => {
  const settings = {
    method: 'DELETE',
  };
  return fetch(`${BASE_URL}/api/${id}`, settings);
}

export { subscribe, getAll, remove };
