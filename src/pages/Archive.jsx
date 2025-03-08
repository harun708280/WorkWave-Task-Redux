import React from 'react';
import { useSelector } from 'react-redux';
import TaskCard from '../components/tasks/TaskCard';
import { useGetAllTaskQuery } from '../redux/Api/taskApi';
import { is } from './../../node_modules/date-fns/locale/is';
import Loading from '../components/layouts/Loading';

const Archive = () => {
    const {task}=useSelector((state)=>state.allTasks)
    const {data:tasks,isFetching,isLoading}=useGetAllTaskQuery()
    
    const archive=tasks.filter((item)=>item.status==='archived')

    if (isFetching || isLoading) {
        return <Loading></Loading>
    }
    
    
    return (
        <div className='py-7'>
         <h2 className="text-3xl font-semibold text-gray-800  mb-5">📂 Archived Tasks</h2>

         <div className="grid grid-cols-4 gap-8">
         {
            archive.map((item)=><TaskCard key={item.id} task={{
                _id: item._id,
                title: item.title,
                description: item.description,
                deadline: item.deadline,
                priority: item.priority,
                assignTo: item.assignTo ? item.assignTo.name : "Unassigned",
                assignToEmail: item.assignTo
                  ? item.assignTo.email
                  : "Unassigned",
                assignToPhoto: item.assignTo
                  ? item.assignTo.photo
                  : "Unassigned",

                status: item.status,
              }} ></TaskCard>)
         }
         </div>

         {archive.length===0 && <p className="text-gray-500 flex text-xl justify-center items-center min-h-screen text-center">No archived tasks available.</p>}

        </div>
    );
};

export default Archive;