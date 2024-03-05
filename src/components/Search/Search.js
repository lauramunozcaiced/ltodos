import React from 'react'
import './Search.css'

function Search({search, setSearch}){

  return(
      <div className="search">
        <input value={search} onChange={(event)=>{
          setSearch(event.target.value)
        }} type="name" placeholder="Search something..."/>
      </div>
      
    )
}
  
export {Search}