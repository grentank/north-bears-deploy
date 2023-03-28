import axios from 'axios';
import React, { useState } from 'react';
import PostCard from '../ui/PostCard';
import PostForm from '../ui/PostForm';

export default function PostsPage({ allPosts, user }) {
  const [posts, setPosts] = useState(allPosts);
  const addPostHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/posts', Object.fromEntries(new FormData(e.target)));
      setPosts((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePostHandler = async (postId) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      if (response.status === 200) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updatePostHandler = async (newPost) => {
    const response = await axios.patch(`/api/posts/${newPost.id}`, newPost);
    setPosts((prev) => prev.map((post) => (post.id === newPost.id ? response.data : post)));
  };
  return (
    <>
      <div className="row">
        <div className="col-12">
          <PostForm addPostHandler={addPostHandler} />
        </div>
      </div>
      <div className="row">
        <div className="list-group">
          {posts.map((post) => (
            <PostCard updatePostHandler={updatePostHandler} user={user} deletePostHandler={deletePostHandler} post={post} key={post.id} />
          ))}
        </div>
      </div>
    </>
  );
}
