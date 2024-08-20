import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDecksView = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/');
      setData(response.data); // Guarda los datos en el estado
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log({ data });

  return <div>CreateDecksView</div>;
};

export default CreateDecksView;
