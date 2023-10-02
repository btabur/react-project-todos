import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading";

import "./App.css";
import ListItem from "./components/ListItem";
import { v4 as generateId } from 'uuid';
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from 'react-icons/bs'

function App() {
  const [todos, setTodos] = useState(null);
  const [page,setPage] =useState(1);
  const [totalPage, setTotalPage] = useState();
  const [totalCount,setTotalCount] =useState();

  const options = {
   params: {
      _limit:5,
      _page:page
    },
    timeout: 5000 // 5sn sonra hala api den veriler gelmediğinde hata fırlatır
  }

  useEffect(() => {
    // fetch get çözümü
    // fetch('http://localhost:3030/todos')
    // .then(res=> res.json())
    // .then(data=> console.log(data))

    // axios
    axios.get("http://localhost:3030/todos",options)
    .then((res) => {
      //apideki toplam eleman sayısına ulaşma
    const itemCount=  Number(res.headers['x-total-count'])
    //toplam sayfa sayısını bulma
    const max = Math.ceil(itemCount/options.params._limit);
      setTotalPage(max)
      setTotalCount(itemCount);

      setTodos(res.data)
    }).catch((err)=>{
      if(err.code === 'ECONNABORTED') {
        alert('Üsgünüz bağlantınız zaman aşımına uğradı tekrar deneyiniz')
      }
    });
  }, [page]); //page değeri her değiştiğinde api ye istek atar
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
    .then(()=> {
      if(todos.length === options.params._limit) {
        //son sayfada yer yoksa bir fazlasına 
        //varsa son sayfaya gönderir
        setPage(
          totalCount % options.params._limit === 0 
          ? totalPage + 1
          : totalPage
        )
      }else {
        setTodos([...todos,newTodo])
      }
 
    
   
  });  // işlem başarılı ise diziye ekleyerek ekranda gösterir

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

      {/* paginaiton */}
      <div className="d-flex justify-content-center align-items-center mt-5 gap-5">
        <button 
        disabled= {page ===1}
        onClick={()=>setPage(page-1)} >
          <BsArrowLeftCircleFill className="fs-3 text-warning"/>
        </button>
        <p className="fs-3 fw-bold rounded border py-1 px-3">{page}</p>
        <button
        disabled = {page === totalPage}
        onClick={()=> setPage(page+1)}>
          <BsArrowRightCircleFill className="fs-3 text-primary"/>
        </button>
      </div>
    </div>
  );
}

export default App;
