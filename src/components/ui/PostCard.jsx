import React, { useEffect, useState } from 'react';

export default function PostCard({
  post: postFromArray,
  deletePostHandler,
  user,
  updatePostHandler,
}) {
  const [editing, setEditing] = useState(null);
  const [post, setPost] = useState(postFromArray);
  const changeHandler = (e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  useEffect(() => {
    if (editing === false) {
      updatePostHandler(post);
    }
  }, [editing]);
  return (
    <div className="list-group-item list-group-item-action" aria-current="true">
      <div className="d-flex w-100 justify-content-between">
        {editing ? (
          <input
            name="title"
            onChange={changeHandler}
            value={post.title}
            className="form-control"
          />
        ) : (
          <h5 className="mb-1">{post.title}</h5>
        )}
        <small>{post.User?.username}</small>
      </div>
      {editing ? (
        <textarea name="body" onChange={changeHandler} value={post.body} className="form-control" />
      ) : (
        <p className="mb-1">{post.body}</p>
      )}
      <small className="btn-group">
        <button
          disabled={post.userId !== user.id}
          className="btn btn-danger"
          onClick={() => deletePostHandler(post.id)}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
          </svg>
        </button>
        <button
          onClick={() => setEditing(!editing)}
          disabled={post.userId !== user.id}
          className="btn btn-info"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
      </small>
    </div>
  );
}
