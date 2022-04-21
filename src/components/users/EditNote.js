import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditNote = () => {
  let history = useHistory();
  const { id } = useParams();
  const [note, setNote] = useState({
    Tittle: "",
    
    time: "",  
    
    description: ""
  });

  const { Tittle,  time, description  } = note;
  const onInputChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadNote();
  }, 
  []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/notes/${id}`, note);
    history.push("/");
  };

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:3003/notes/${id}`);
    setNote(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Task</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Subject"
              name="Tittle"
              value={Tittle}
              onChange={e => onInputChange(e)}
            />
          </div>
         
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Time"
              name="time"
              value={time}
              onChange={e => onInputChange(e)}
            />
          </div>
         
          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Description"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
