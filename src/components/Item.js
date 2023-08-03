import './Item.css';
import { BiTrash,BiEdit } from "react-icons/bi";

export default function Item(props){
    const {data,delTask,editTask} = props
    return(
        <div className='list-item'>
        <p className='title'>{data.title}</p>
        <div className='btn-container'>
            <BiTrash className='btn' onClick={()=>delTask(data.id)}/>
            <BiEdit className='btn' onClick={()=>editTask(data.id)}/>
            </div>
        </div>
    )
}