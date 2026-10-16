import React, { useState, useEffect } from 'react'
import StatCard from '../Components/StatCard'
import ApplicationCard from '../Components/ApplicationCard'



type status='Applied'|'Interview'|'Rejected'|'Accepted';
export type Application = {
  id:string;
  company: string;
  position: string;
  status: status; 
  dateApplied:string;
}


const Dashboard = () => {
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState<status>('Applied');
const [editingId, setEditingId]=useState<string | null>(null);

const[applications,setApplications]=useState<Application[]>(()=>{
  
  const savedApplications=localStorage.getItem('application');

  if (savedApplications){
    return JSON.parse(savedApplications)
  }
  
  return[];

}); 


useEffect(()=>{

localStorage.setItem('applications',JSON.stringify(applications)
);
},[applications]);

const [search,setSearch]=useState('');
const [statusFilter, setStatusFilter] = useState<
  status | 'All'
>('All');


const [dateApplied, setDateApplied] = useState(() => {
  const today = new Date();

  return `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`;
});



const stats = [
  { number: applications.length, title: 'Application' },
  { number:applications.filter(application => application.status === 'Interview').length, title: 'Interview' },
  { number: applications.filter(application => application.status === 'Accepted').length,title: 'Accepted' },
  { number: applications.filter(application => application.status === 'Rejected').length,title: 'Rejected' },
]

//delete application
const deleteApplication=(id:string)=>{
const confirmed=window.confirm('Are you sure you want to delete this application?');
if(!confirmed) return;
    setApplications(
        applications.filter((application)=>application.id!==id)
    );

};
//edit application
const editApplication=(id:string)=>{
    const applicationToEdit=applications.find((application)=>application.id===id);
if(!applicationToEdit) return;
setCompany(applicationToEdit.company);
setPosition(applicationToEdit.position);
setEditingId(applicationToEdit.id);
setStatus(applicationToEdit.status);

setDateApplied(applicationToEdit.dateApplied);

};

//update application

const updateApplication =(e: React.FormEvent)=>{
  e.preventDefault();
  setApplications(
    applications.map((application)=>
      application.id === editingId
  
    ?{
      ...application,
      company:company,
      position:position,
      status:status,
      dateApplied:dateApplied
    }
:application
  )
);
setEditingId(null);
setCompany('');
setPosition('');
setStatus('Applied');

const today= new Date();
    setDateApplied(
      `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${
        String(today.getDate()).padStart(2,'0')
      }`
    );
};



//add application
const addApplication=(e:React.FormEvent)=>{
e.preventDefault();
    if(!company || !position) {
        alert('Please fill in all fields');
        return;
    }

    
    const newApplication:Application={
      id:crypto.randomUUID(),
        company,
        position,
        status,
        dateApplied,
    };
    setApplications([...applications,newApplication]);

     setCompany('');
    setPosition('');
    setStatus('Applied')

    const today= new Date();
    setDateApplied(
      `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${
        String(today.getDate()).padStart(2,'0')
      }`
    );
    
};



const filteredApplication= applications.filter((application)=>
    application.company.toLowerCase().includes(search.toLowerCase())&&
(statusFilter==='All'|| application.status === statusFilter)

);




  
  return (  

    
    <main className="min-h-screen bg-gray-100 p-6">
     
      <section className="mb-10">
        <h1>Welcome back!</h1>

        <p className="mb-6 text-3xl font-bold">
          Track your job applications in one place.
        </p>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2  lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              number={stat.number}
              title={stat.title}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2>Recent Application</h2>
    

    {filteredApplication.length ===0?(
      <p className='py-8 text-center text-gray-500'>
       No application found.Try another search or status.
      </p>
    ):(
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredApplication.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDelete={() => deleteApplication(application.id)}
              onEdit={() => {editApplication(application.id)}}
            />
          ))}
        </div>
        )}
      </section>

      

 <form onSubmit={editingId ? updateApplication : addApplication}
 className='mb-8 rounded-lg bg-white p-6 shadow'>
<input
  type="text"
  placeholder="Company"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
  className='w-full rounded border p-3'
/>
<input
  type="text"
  placeholder="Position"
  value={position}
  onChange={(e) => setPosition(e.target.value)}
  className='w-full rounded border p-3'
/>
<select
  value={status}
  onChange={(e) => setStatus(e.target.value as status)}
  className='w-full rounded border p-3'
>
 
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value ="Rejected">Rejected</option>
  <option value='Accepted'>Accepted</option>
</select>

 <input
  type="text"
  placeholder="Search by Company"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className='w-full rounded border p-3'
/>

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value as status|'All')}
  className='w-full rounded border p-3'
>
 <option value="All">All statuses</option>
  <option value="Applied">Applied</option>
  <option value="Interview">Interview</option>
  <option value ="Rejected">Rejected</option>
  <option value='Accepted'>Accepted</option>
</select>

<div className='mb-4'>
<label 
htmlFor='dateApplied'   className='mb-1 block text-sm font-medium tetx-gray-700'>
  Date Applied
</label>

<input
id='dateApplied'
  type="date"
  required
  value={dateApplied}
  onChange={(e) => setDateApplied(e.target.value)}
  className='w-full rounded-lg border border-gray-300 p-3'
/>


</div>

 <button type={'submit'} className='mt-4 rounded bg-red-500 px-4 py-2 text-white'>
    {editingId? 'update Application': 'Add Application'}
    </button>
    
</form>
    </main>
  )
}


export default Dashboard