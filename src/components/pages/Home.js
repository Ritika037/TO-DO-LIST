import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNote] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const result = await axios.get("http://localhost:3003/notes");
    setNote(result.data);
  };

  const deleteNote = async id => {
    await axios.delete(`http://localhost:3003/notes/${id}`);
    loadNotes();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Your Task</h1>
        <table className="table border shadow">
          <thead className="thead-navbar navbar-expand-sm bg-secondary navbar-dark">
            <tr>
              <th scope="col">*</th>
              <th scope="col">Tittle</th>
              
              <th scope="col">Task</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{note.Tittle}</td>
                
                <td>{note.Task}</td>
                <td>
                  <Link className="btn btn-outline-dark mr-2" to={`/notes/${note.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/notes/edit/${note.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-outline-danger"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
