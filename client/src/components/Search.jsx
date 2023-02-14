import React from 'react'
import { MdSearch } from 'react-icons/md'

const Search = ({ searchNote }) => {
  return (
    <div className='search'>
      <MdSearch className='search-icons' size='1.7em' /> 
      <input 
        onChange={(e) => searchNote(e.target.value)}
        type='text'
        placeholder='Search for a note...'
      />
    </div>
  )
}

export default Search
