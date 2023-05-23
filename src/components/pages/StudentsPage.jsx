import React from 'react';
import StudentCard from '../ui/StudentCard';

export default function StudentsPage({ students, deleteHandler, user }) {
  return (
    <div className="row">
      {students.map((student) => (
        <div className="col-4" key={student.id}>
          <StudentCard user={user} student={student} deleteHandler={deleteHandler} />
        </div>
      ))}
    </div>
  );
}
