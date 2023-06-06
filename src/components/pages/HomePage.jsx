import React from 'react';

export default function HomePage() {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-8 align-self-center text-center">
          <h1 className="display-3">Login or create a new account</h1>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-4 align-self-center">
          <h3>Засиженные пользователи имеют email вида 1@1, 2@2, ..., 15@15 и пароль 123.</h3>
        </div>
      </div>
    </>
  );
}
