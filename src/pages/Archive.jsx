import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../components/tasks/TaskCard';

const Archive = () => {
    const {task}=useSelector((state)=>state.allTasks)
    
    const archive=task.filter((item)=>item.status==='archive')
    console.log(archive);
    
    
    return (
        <div className='py-7'>
         <h2 className="text-3xl font-semibold text-gray-800  mb-5">📂 Archived Tasks</h2>

         <div className="grid grid-cols-4 gap-8">
         {
            archive.map((item)=><TaskCard key={item.id} task={item} ></TaskCard>)
         }
         </div>

         {archive.length===0 && <p className="text-gray-500 flex text-xl justify-center items-center min-h-screen text-center">No archived tasks available.</p>}

        </div>
    );
};

export default Archive;