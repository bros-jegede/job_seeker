import React from 'react'

 interface statCardProps{
    number:number;
    title:string;
  }
 
const StatCard = ({number,title}:statCardProps) => {

  return (
    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h2 className='text-3xl font-bold'>{number}</h2>
        <p className='text-gray-500 mt-2'>{title}</p>
        
        </div>
  )
}

export default StatCard