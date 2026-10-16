import React from 'react'

function Navbar() {
  return (
    <nav className='flex border-gray-200  text-black p-4  justify-between 
    items-center border-b border-gray-700'>
        <h2 className='text-2xl font-bold'>JobTrack</h2>
<div className='flex gap-6'>
    <a href='#'className='text-gray-700 hover:text-red-500'>Dashboard</a>
        <a href='#'className='text-gray-700 hover:text-red-500'>Applications</a> 
        <a href='#'className='text-gray-700 hover:text-red-500'>Add Application</a>
</div>
        

    </nav>
  )



  
}



export default Navbar