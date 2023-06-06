import React, { useEffect, useState } from 'react';
import Pencil from './icons/Pencil';
import TrashCan from './icons/TrashCan';
import HeartFilled from './icons/HeartFilled';
import HeartHollow from './icons/HeartHollow';
import SaveIcon from './icons/SaveIcon';

export default function PostCard({
  post,
  deletePostHandler,
  user,
  updatePostHandler,
  likePostHandler,
}) {
  const [editing, setEditing] = useState(null);
  const [postInput, setPostInput] = useState(post);
  const changeHandler = (e) =>
    setPostInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  useEffect(() => {
    if (editing === false) {
      updatePostHandler(postInput);
    }
  }, [editing]);
  return (
    <div className="list-group-item list-group-item-action" aria-current="true">
      <div className="d-flex w-100 justify-content-between">
        {editing ? (
          <input
            name="title"
            onChange={changeHandler}
            value={postInput.title}
            className="form-control"
          />
        ) : (
          <h5 className="mb-1">{post.title}</h5>
        )}
        <small>{post.User?.username}</small>
      </div>
      {editing ? (
        <textarea
          name="body"
          onChange={changeHandler}
          value={postInput.body}
          className="form-control"
        />
      ) : (
        <p className="mb-1">{post.body}</p>
      )}
      <small className="btn-group">
        <button
          disabled={post.authorId !== user.id}
          className="btn btn-danger"
          onClick={() => deletePostHandler(post.id)}
          type="button"
        >
          <TrashCan />
        </button>
        {editing ? (
          <button
            onClick={() => setEditing(!editing)}
            disabled={post.authorId !== user.id}
            className="btn btn-success"
            type="button"
          >
            <SaveIcon />
          </button>
        ) : (
          <button onClick={() => setEditing(!editing)} className="btn btn-info" type="button">
            <Pencil />
          </button>
        )}
        <button
          onClick={() => likePostHandler(post.id)}
          className="btn btn-outline-secondary"
          type="button"
        >
          {post.likedBy.length}{' '}
          {post.likedBy.find((userFromLike) => userFromLike.id === user.id) ? (
            <HeartFilled />
          ) : (
            <HeartHollow />
          )}
        </button>
      </small>
    </div>
  );
}
