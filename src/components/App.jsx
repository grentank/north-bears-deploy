import axios from 'axios';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import SignUpPage from './pages/SignUpPage';
import StudentsPage from './pages/StudentsPage';
import NavBar from './ui/NavBar';

export default function App({ allPosts, user, students: backendStudents }) {
  const [students, setStudents] = useState(backendStudents);
  const deleteHandler = async (studentsId) => {
    try {
      const response = await axios.delete(`/api/students/${studentsId}`);
      if (response.status === 200) {
        setStudents((prev) => prev.filter((student) => student.id !== studentsId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PostsPage user={user} allPosts={allPosts} />} />
        <Route
          path="/students"
          element={<StudentsPage user={user} students={students} deleteHandler={deleteHandler} />}
        />
      </Routes>
    </div>
  );
}
