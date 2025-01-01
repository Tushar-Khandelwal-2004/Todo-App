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




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css"

// function App() {
//   const [todos, setTodos] = useState([]); // Store todos
//   const [newTodo, setNewTodo] = useState(""); // For adding new todo

//   // Fetch todos from the backend
//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/todo");
//       setTodos(response.data.todos); // Set todos to state
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//     }
//   };

//   // Add a new todo
//   const addTodo = async () => {
//     if (!newTodo) return; // Prevent empty todos
//     try {
//       await axios.post("http://localhost:5000/todo/addTodo", {
//         title: newTodo,
//       });
//       setNewTodo(""); // Reset input
//       fetchTodos(); // Refresh the todo list
//     } catch (error) {
//       console.error("Error adding todo:", error);
//     }
//   };

//   // Delete a todo
//   const deleteTodo = async (id) => {
//     try {
//       await axios.delete("http://localhost:5000/todo/deleteTodo", {
//         headers: {
//           id: id,  // Pass the correct id here
//         },
//       });
//       fetchTodos();  // Refresh the todo list after deletion
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   // Fetch todos when the component is mounted
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Todo List</h1>

//       {/* Display existing todos */}
//       <div>
//         <ul>
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               {todo.title} {/* Display the todo title */}
//               <button onClick={() => deleteTodo(todo.id)}>Delete</button> {/* Pass todo id */}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Add new todo */}
//       <div>
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           placeholder="Enter a new todo"
//         />
//         <button onClick={addTodo}>Add Todo</button>
//       </div>
//     </div>
//   );
// }

// export default App;
