import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, Todo } from '../services/todo.service';
import { useNavigate } from 'react-router-dom';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to load todos');
    }
  };

  useEffect(() => {
    // Assuming the backend provides the logged‑in user name at /session/name
    axios
      .get<{ name: string }>('/session/name')
      .then((res) => setName(res.data.name))
      .catch(() => setName(''));

    fetchTodos();
  }, []);

  const handleDelete = async (todo: Todo) => {
    try {
      await deleteTodo(todo.name, todo.category);
      setTodos((prev) => prev.filter((t) => t !== todo));
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleAdd = () => {
    navigate('/add-todo.do');
  };

  return (
    <div className="container">
      <h1>Welcome {name}</h1>

      <table className="table table-striped">
        <caption>Your Todos are</caption>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={`${todo.name}-${todo.category}`}>
              <td>{todo.name}</td>
              <td>{todo.category}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(todo)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button className="btn btn-success" onClick={handleAdd}>
        Add New Todo
      </button>
    </div>
  );
};

export default TodoList;