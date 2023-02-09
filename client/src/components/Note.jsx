import React from "react";
// import { MdDeleteForever } from 'react-icons/md';
import delIcon from '../images/delete.png';

function Note(props) {
  function handleClick(event) {
    props.onDelete(props.id);
    // event.preventDefault()
  }
  return (

    <div className="note" id={props.id}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}><img src={delIcon} /></button>
      {/* <MdDeleteForever onClick={handleClick} className='delete-note' /> */}

    </div>
  );
}

export default Note;
