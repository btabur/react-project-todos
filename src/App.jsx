import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";

import "./App.css";
import ListItem from "./components/ListItem";
import { v4 as generateId } from 'uuid';

function App() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    // fetch get çözümü
    // fetch('http://localhost:3030/todos')
    // .then(res=> res.json())
    // .then(data=> console.log(data))

    // axios
    axios.get("http://localhost:3030/todos")
    .then((res) => setTodos(res.data));
  }, []);
  //! handlesubmit
  const handleSubmit = (e)=> {
    e.preventDefault()
    //console.log(e.target[0].value)

    if(e.target[0].value.trim() === "") {
      alert("Bir görev ekleyin")
      e.target[0].value = ""
      return;
    }

    const newTodo = {
    //  id:new Date().getTime(),
      id:generateId(),
      title:e.target[0].value,
      date:new Date().toLocaleDateString(),
      isDone:false
    }

    //api ye gönderir
    axios.post("/todos",newTodo)
    .then(()=> setTodos([...todos,newTodo]));  // işlem başarılı ise diziye ekleyerek ekranda gösterir

    // input alanını temizler
    e.target[0].value = ""

    //fetch post

    // fetch('http://localhost:3030/todos', {
    //   method:'POST',
    //   body:JSON.stringify(newTodo)
    // });

  }

  return (
    <div className="container my-5">
      <h2>Yapılacaklar</h2>

      <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-3 my-4">
        <input className="form-control shadow" />
        <button className="btn btn-primary shadow"> Ekle</button>
      </form>
      <ul className="list-group">
        {todos === null && <Loading/>}
        {todos && todos.map((todo,index) => (
        <ListItem
        key={index} 
        todo={todo} 
        allTodos={todos} 
        setTodos={setTodos}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
