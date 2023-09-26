import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";

import "./App.css";
import ListItem from "./components/ListItem";

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

  return (
    <div className="container my-5">
      <h2>Yapılacaklar</h2>

      <form className="d-flex justify-content-center gap-3 my-4">
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
