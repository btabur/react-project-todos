import axios from 'axios'
import React from 'react'

axios.defaults.baseURL = 'http://localhost:3030';

function ListItem({todo,allTodos,setTodos}) {

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


  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
        <div className='d-flex gap-2'>
            <input className='form-check-input' type="checkbox"/>
            <span>
            {todo.isDone ? "Tamamlandı":"Devam ediyor"}
            </span>
        </div>
        <span>{todo.title}</span>
        <div className='btn-group'>
            <button className='btn btn-success'>Düzenle</button>
            <button className='btn btn-danger' onClick={handleDelete}>Sil</button>
        </div>
    </li>
  )
}

export default ListItem
