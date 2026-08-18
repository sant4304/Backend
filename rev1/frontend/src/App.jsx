// import React from "react";
// import { useState } from "react";
// import axios from "axios";

// const App = () => {
//   const [notes, setNotes] = useState([
//     {
//       Title: "Title 1",
//       Descrription: "Description 1",
//     },
//     {
//       Title: "Title 2",
//       Descrription: "Description 2",
//     },
//     {
//       Title: "Title 3",
//       Descrription: "Description 3",
//     },
//     {
//       Title: "Title 4",
//       Descrription: "Description 4",
//     },
//   ]);

    
 

//   const alldata = async()=>{
//     let response =await axios.get("http://localhost:3000/api/notes")
//     console.log(response.data)
//   }

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   const { title, description } = e.target.elements;
//   //   console.log(title.value, description.value);
//   //   console.log("Form submitted");
//   // };
//   return (
//     <div className="">
//       <div className="flex justify-center p-4">
//         {/* <form
//           onSubmit={handleSubmit}
//           className="flex flex-col gap-3 w-fit border border-gray-400 rounded-lg p-6"
//         >
//           <input
//             name="title"
//             className="border rounded px-3 py-4"
//             type="text"
//             placeholder="Enter Your Title"
//           />

//           <input
//             name="description"
//             className="border rounded px-3 py-4"
//             type="text"
//             placeholder="Enter Your Description"
//           />

//           <button className="bg-black text-white rounded px-3 py-3 active:scale-95">
//             Create
//           </button>
//         </form> */}
//       </div>
//       <div className=" flex justify-center gap-4 flex-wrap">
//         {notes.map((note, idx) => {
//           return (
//             <div className="w-fit bg-black text-white rounded p-4 " key={idx}>
//               <h1>{note.Title}</h1>
//               <p className="text-xs">{note.Descrription}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import axios from "axios"

const App = () => {
  const [notes, setNotes] = useState([]);

 const fetchNotes = async() =>{
  // let response = await axios.get("http://localhost:3000/api/notes")
  // console.log(response.data)
   axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.notes)
    console.log(res.data)
  })
 }

 useEffect(()=>{
  fetchNotes()
 },[])
 
function handleSubmit(e){
    e.preventDefault();
    const {title,description} =e.target.elements
    console.log(title.value,description.value)
    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    })
    .then((res)=>{
      console.log(res.data)
       fetchNotes()
    })

  console.log("hello")
}

function handleDelte(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then((res)=>{
    console.log(res.data)
    fetchNotes()
  })
}



  return (
    <div>
      <div>
        <form className="note-create-form" action="" onSubmit={(e)=>{
          handleSubmit(e)
        }}>
          <input name="title" type="text" placeholder="Enter the title" />
          <input name="description" type="text" placeholder="Eneter the description" />
          <button>Create Notes</button>
        </form>
      </div>
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div key={index} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{
                handleDelte(note._id)
              }}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;