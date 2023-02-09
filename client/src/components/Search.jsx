import React from 'react'
import { MdSearch } from 'react-icons/md'
const Search = ({ searchNote }) => {
  return (
    <div className='search'>

    {/* input will setState for searchText on 
    app.js parent component */}
      <MdSearch className='search-icons' size='1.7em' /> 
      <input 
    onChange={(e) => searchNote(e.target.value)}
    type='text'
    placeholder='enter notes search...'
      />

    </div>
  )
}

export default Search
