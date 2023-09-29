import axios from 'axios'
import React, { useState } from 'react'
import {BsFillCheckCircleFill} from 'react-icons/bs';
import {AiFillCloseCircle} from 'react-icons/ai';
import {BiSolidEdit} from 'react-icons/bi';
import {AiTwotoneDelete} from 'react-icons/ai';

axios.defaults.baseURL = 'http://localhost:3030';

function ListItem({todo,allTodos,setTodos}) {
  const [isEditMode,setIsEditMode] = useState(false)

    const handleDelete =()=> {

        // FETCH 
        // fetch("http://localhost:3030/todos/"+todo.id,{
        // method:'DELETE'
        // });

        //axios

        axios.delete("/todos/"+todo.id)
        .then(()=> {
          const filtered = allTodos.filter(i =>i.id!==todo.id);
          setTodos(filtered)
        })
        .catch(err=> alert('Veri silerken hata oluştu'))
  }
  //! handleChange
    const handleChange =() => {
      const updated = {...todo,isDone:!todo.isDone}

      // apı yi günceller
      axios.put(`/todos/${updated.id}`,updated)
      .then(()=> {      //state i  güncelle
        const uptatedTodos = allTodos.map((item) => item.id===updated.id ? updated : item);
        setTodos(uptatedTodos)
      })

    

    }

  //!handleEdit
    const handleEdit =(event) => {
      event.preventDefault();

    const newTitle=  event.target[0].value;
    const updatedTodo = {...todo,title:newTitle};

    // api yi güncelleme
    axios.put(`/todos/${updatedTodo.id}`,updatedTodo)
    .then (()=> {
     const updatedTodos= allTodos.map(item => item.id !== updatedTodo.id ? item : updatedTodo)

     setTodos(updatedTodos)

     setIsEditMode(false)
    })
   

    }

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
        <div className='d-flex gap-2'>
            <input checked={todo.isDone} onChange={handleChange} className='form-check-input' type="checkbox"/>
            <span>
            {todo.isDone ? "Tamamlandı":"Devam ediyor"}
            </span>
        </div>
         {
          isEditMode ? 
              <form onSubmit={handleEdit} className='d-flex gap-3'>
                <input defaultValue={todo.title} type="text" className='form-control' />
                <button type='submit'><BsFillCheckCircleFill className='fs-3 text-primary'/></button>  
                <button type='button' onClick={()=>setIsEditMode(false)}>  
                  <AiFillCloseCircle className='fs-3 text-danger'/>
                  </button>  
              </form> 
          :
               <span>{todo.title}</span>
         }
      {!isEditMode ? 
        <div className='btn-group'>
            <button className='btn btn-success' onClick={()=> setIsEditMode(true)} disabled={isEditMode} >
              <BiSolidEdit className='fs-4'/>
            </button>
            <button className='btn btn-danger' onClick={handleDelete}>
              <AiTwotoneDelete className='fs-4'/>
            </button>
        </div>
      :
      <span></span>
      }
        
    </li>
  )
}

export default ListItem
