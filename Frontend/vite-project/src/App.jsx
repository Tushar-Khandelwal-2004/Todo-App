import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  async function fetchTodos() {
    const response = await axios.get("http://localhost:5000/todo");
    setTodos(response.data.todos);
  }

  async function addTodo() {
    if (!newTodo) return;
    await axios.post("http://localhost:5000/todo/addTodo", {
      title: newTodo
    });
    setNewTodo("");
    fetchTodos();
  }

  async function deleteTodo(id) {
    await axios.delete("http://localhost:5000/todo/deleteTodo", {
      headers: {
        id: id
      }
    })
    fetchTodos();
  }

  useEffect(function () {
    fetchTodos();
  }, []);


  return (
    <div id="main">
      <div id="heading"><h1>Todo List</h1></div>
      <ul>
        {todos.map((todo) => (
          <div className="todo-item">
          <li className="list" key={todo.id}>{todo.title}
            <button className="dltbtn" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
          </div>
        ))}
      </ul>
      <div className="addtodo">
        <input type="text" value={newTodo} placeholder="Type your Todo here!" onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  )
}
export default App;