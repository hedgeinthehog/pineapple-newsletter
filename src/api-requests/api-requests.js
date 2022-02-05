const subscribe = formData => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  return fetch('http://localhost:8080/api/', settings);
};

const getAll = () => {
  return fetch('http://localhost:8080/api/');
}

const remove = (id) => {
  const settings = {
    method: 'DELETE',
  };
  return fetch(`http://localhost:8080/api/${id}`, settings);
}

export { subscribe, getAll, remove };
