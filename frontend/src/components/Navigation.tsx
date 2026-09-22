import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
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
          <a href="/logout.do" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;