import { useState,useEffect } from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import Header from "./components/Header";
import Item from "./components/Item";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks"))|| []);

  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("light")

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


  function delTask(id) {
    const result = tasks.filter((item) => item.id !== id);
    setTasks(result);
    console.log(id);
  }

  function editTask(id) {
    setEditId(id);
    const editResult = tasks.find((item) => item.id == id)
    setTitle(editResult.title);
  }

  function saveTask(e) {
    e.preventDefault();
    if (!title) {
      alert("กรุณาป้อนข้อมูล");
    } else if(editId){
      const updateTask = tasks.map((item) => {
        if(item.id === editId) {
          return{...item,title:title}
        }
      return item;
    })
    setTasks(updateTask);
    setEditId(null)
    setTitle("");
    }else {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
    }
    console.log("save");
  }

  return (
    <div className={"App "+theme}>
      <Header theme={theme} setTheme={setTheme}/>
      <div className="container">
        <AddForm title={title} setTitle={setTitle} saveTask={saveTask} editId={editId} />
        <section>
          {tasks.map((data) => (
            <Item
              key={data.id}
              data={data}
              delTask={delTask}
              editTask={editTask}         
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
