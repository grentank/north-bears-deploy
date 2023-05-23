import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {
  const [errorState, setErrorState] = useState(null);

  const [inputGroup, setInputGroup] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (event) =>
    setInputGroup((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', inputGroup);
      if (response.status === 200) {
        window.location = '/';
        return;
      }
      // setErrorState(response.data);
    } catch (error) {
      setErrorState(error.response.data);
      console.log(error);
    }
  };

  const [styles, setStyles] = useState('form-control');

  useEffect(() => {
    if (inputGroup.password.length <= 3) setStyles('form-control is-invalid');
    else setStyles('form-control is-valid');
  }, [inputGroup.password]);

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
          <input
            value={inputGroup.email}
            onChange={changeHandler}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </label>

        <div id="emailHelp" className="form-text">
          Email must be of the form *@*
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
          <input
            value={inputGroup.password}
            onChange={changeHandler}
            name="password"
            type="password"
            className={styles}
            id="exampleInputPassword1"
          />
          <div id="validationServer03Feedback" className="invalid-feedback">
            Too short password
          </div>
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {errorState && <div style={{ color: 'red' }}>{errorState.message}</div>}
    </form>
  );
}
