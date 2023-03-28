import React from 'react';

export default function PostForm({ addPostHandler }) {
  return (
    <form onSubmit={addPostHandler}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
          <input name="title" type="text" className="form-control" id="exampleInputEmail1" />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Body
          <input name="body" className="form-control" type="text" id="exampleInputPassword1" />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
