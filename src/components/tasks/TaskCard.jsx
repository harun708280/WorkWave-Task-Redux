import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../redux/features/taskSlice';

const TaskCard = ({task}) => {
  const dispatch=useDispatch()

  let updateStatus

  if (task.status==='pending') {
    updateStatus='running'
  }
  else if(task.status==='running'){
    updateStatus='complete'
  }
  else(updateStatus='archive')


  return (
    <div className="bg-secondary/10 rounded-md p-5">
      <h1
        className={`text-lg font-semibold mb-3  ${
          task?.priority === 'High' ? 'text-red-500' : ''
        } ${task?.priority === 'Medium' ? 'text-yellow-500' : ''} ${
          task?.priority === 'Easy' ? 'text-green-500' : ''
        }`}
      >
        {task?.title}
      </h1>
      <p className="mb-3">{task?.description}</p>
      <p className="text-sm">Assigned to - {task?.assignTo}</p>
      <div className="flex justify-between mt-3">
        <p>{task?.date}</p>
        <div className="flex gap-3">
          <button  title="Delete">
            <TrashIcon onClick={()=>dispatch(removeTask(task.id))} className="h-5 w-5 text-red-500" />
          </button>
          <button
            onClick={()=>dispatch(updateTask({id:task.id,status:updateStatus}))}
            title="In progress"
          >
            <ArrowRightIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
