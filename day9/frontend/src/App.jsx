import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  };

  const handelDelete = (noteId) => {
    console.log(noteId);
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  };

  const handelUpdate = (noteId) => {
    const newTitle = prompt("Enter new title");

    const newDescription = prompt("Enter new description");

    if (!newTitle || !newDescription) {
      return;
    }

    axios
      .patch("http://localhost:3000/api/notes/" + noteId, {
        title: newTitle,
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  };

  return (
    <div>
      <form onSubmit={handelSubmit} action="" className="note-create-form">
        <input name="title" type="text" placeholder="Enter The Title" />
        <input
          name="description"
          type="text"
          placeholder="Enter The Description"
        />
        <button>Create Notes</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div className="note" key={idx}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handelDelete(note._id);
                }}
              >
                Delete
              </button>

              <button onClick={() => handelUpdate(note._id)}>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
     
