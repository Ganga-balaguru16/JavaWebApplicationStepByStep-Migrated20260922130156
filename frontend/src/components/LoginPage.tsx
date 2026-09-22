import React, { useState, FormEvent } from 'react';
import { login } from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const result = await login(name, password);
      if (result.success) {
        // On successful login, redirect to home or protected page
        window.location.href = '/';
      } else {
        setErrorMessage(result.errorMessage ?? 'Login failed');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-default">
        <a href="/" className="navbar-brand">
          Brand
        </a>
        <ul className="nav navbar-nav">
          <li className="active">
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/list-todos.do">Todos</a>
          </li>
          <li>
            <a href="http://www.in28minutes.com">In28Minutes</a>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="/login.do">Login</a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p>
              <font color="red">{errorMessage}</font>
            </p>
          )}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>

      <footer className="footer" style={{ position: 'absolute', bottom: 0, width: '100%', height: 60, backgroundColor: '#f5f5f5' }}>
        <div className="container">
          <div>footer content</div>
        </div>
      </footer>
    </>
  );
};

export default LoginPage;