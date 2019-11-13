import serverAPI from '../apis/server';
import { useState, useEffect } from 'react';

export default id => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await serverAPI.get(`/todos/${id}`);
        setTodo(response.data);
      } catch (err) {
        setTodo(false);
      }
    };

    fetchTodo();
  }, []);

  return [todo];
};
