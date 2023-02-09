export const getAllNotes = () => {
  fetch('http://localhost:5009/note', {
    method: 'GET', 
  })
    .then((response) => JSON.stringify(response))
    .catch((err) => console.log(err))
}

// calls getSingleNote controller
export const getNoteById = (noteId) => {
  if (!noteId) return console.log('noteId not supplied');

fetch(`http://localhost:5009/note/${noteId}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'}
})
  .then((response) => JSON.stringify(response))
  .catch((err) => console.log(err)) 
}

// calls 1 of three PUT controllers depending on values supplied
export const updateNoteById = (newTitle, newContent, noteId) => {

    let url; //hold url after supplied params are examined
    let body;
    if(!newTitle && !newContent) return console.log('no title or content supplied');
    if(newTitle && newContent) url = 'http://localhost:5009/note/updatenote/${noteId}', body = {newTitle: newTitle, newContent: newContent}
    if(newTitle && !newContent) url = 'http://localhost:5009/note/updateTitle/${noteId}', body = {newTitle: newTitle}
    if(!newTitle && newContent) url = 'http://localhost:5009/note/updateContent/${noteId}', body = {newContent: newContent}

    fetch(url, {
        method: 'PUT', 
        headers : {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
      .then((response) => JSON.stringify(response))
      .catch((err) => console.log(err)) 
  }

  export const deleteNote = (noteId) => {
    if (!noteId) return console.log('note id required')

    fetch(`http://localhost:5009/note/${noteId}`, {
        method: 'DELETE',
        headers : {
            'Content-type': 'application/json'
        },
    })
      .then((response) => JSON.stringify(response))
      .catch((err) => console.log(err))
  }
