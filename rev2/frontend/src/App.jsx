import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
 
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      console.log(res.data)
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])
  
  const handelSubmit=(e)=>{
    e.preventDefault()
      // console.log("hello")
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  
  const handleDelted=(noteID)=>{
    console.log(noteID)
    axios.delete("http://localhost:3000/api/notes/"+noteID)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  const handleUpdate=(noteID)=>{
    console.log(noteID)
    const newTitle = prompt("Enter your Title")
    const newDescription = prompt("Enter Your Description")

    axios.patch("http://localhost:3000/api/notes/"+noteID,{
      title:newTitle,
      description:newDescription,
    })
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }
  return (
    <div>
      <div><h1>Notes</h1></div>
      <form onSubmit={handelSubmit} action="">
        <input name="title" type="text"  placeholder='Enter Your name'/>
        <input name='description' type="text"  placeholder='Enter You Des' />
        <button >Create</button>
        
      </form>

      <div>
        {notes.map((ele,idx)=>(
          <div key={idx}>
            <h1>{ele.title}</h1>
            <p>{ele.description}</p>
            <button onClick={()=>{handleDelted(ele._id)}}>Delete</button>
            <button onClick={()=>handleUpdate(ele._id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App