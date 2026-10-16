
import React from 'react'
import type { Application } from '../Pages/Dashboard'


type ApplicationCardProps = {
  application: Application;
  onDelete:(id:string)=>void;
  onEdit:(id:string)=>void;
};

const ApplicationCard = ({
  application,
  onDelete,
  onEdit,
}: ApplicationCardProps) => {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-5 shadow-sm transition-shadows hover:shadow-md">
      <h3 className="text-lg font-bold">{application.company}</h3>

      <p className="mt-2 text-gray-600">{application.position}</p>

      <p className="mt-2 text-gray-600">Date applied:{new Date (application.dateApplied).toLocaleDateString('en-GB',{
day:'2-digit',
month:'short',
year:'numeric',

      })}</p>
<div className='mt-3'>
     <span className= {`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
      application.status === 'Accepted'
      ?'bg-green-100 text-green-700'
      :application.status==='Rejected'
      ?'bg-red-100 text-red-700'
      : application.status === 'Interview'
      ?'bg-blue-100 text-blue-700'
      :'bg-gray-100 text-gray-700'
    }`}
    >
{application.status}
     </span>
</div>


      <button  className='mt-4 rounded bg-red-500 px-4 py-2 text-white'
      type='button'
       onClick={() => onEdit(application.id)}>
        Edit
      </button>

        <button  className='mt-4 rounded bg-red-500 px-4 py-2 text-white' 
        type='button'
        onClick={()=>onDelete(application.id)}>
        Delete
      </button>
      
    </div>
  )
}

export default ApplicationCard