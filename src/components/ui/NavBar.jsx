import axios from 'axios';
import React from 'react';

export default function NavBar({ user }) {
  const logoutHandler = async () => {
    const response = await axios.get('/api/auth/logout');
    if (response.status === 200) {
      window.location = '/';
    }
  };
  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {user?.id ? `Hello, ${user.username}` : 'Guest'}
        </a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">
              Home
            </a>
          </li>
          {!user?.id && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/signup">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </>
          )}
          {user?.id && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/students">
                  Students
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/posts">
                  Posts
                </a>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
