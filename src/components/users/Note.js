import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const Note = () => {
  const [note, setNote] = useState({
    Tittle: "",
   
    time: "",  
    
    description: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadNote();
  }, []);
  const loadNote = async () => {
    const res = await axios.get(`http://localhost:3003/notes/${id}`);
    setNote(res.data);
  };
  return (
    <div className="container py-3">
      
      <h1 className="display-4">Task Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Tittle: {note.Tittle}</li>
        
        <li className="list-group-item">date: {note.time}</li>
       
        <li className="list-group-item">Task: {note.Task}</li>
        <Link className="btn btn-primary" to="/">
        Back to List
      </Link>
      </ul>
    </div>
  );
};

export default Note;
