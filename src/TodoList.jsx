// import { useState } from "react";
// import { v4 as uuidv4} from 'uuid';

// export default function TodoList(){
//     let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4() }]);
//     let [newTodo, setNewTodo] = useState("");

//     let addNewTask = () => {
//         setTodos((prevTodos) => {
//             return [...prevTodos, {task: newTodo, id: uuidv4()}]
//         });
//         setNewTodo("");
//     }
//     let updateTodoValue = (event) => {
//         setNewTodo(event.target.value);
//     }

//     let deleteTodo = (id) => {
//         setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
//     }

//     let upperCaseAll = () => {
//         setTodos((prevTodos) => (
//           prevTodos.map((todo) => {
//             return {
//                 ...todo,
//                 task: todo.task.toUpperCase(),
//             };
//           })
//         ));
//     };

//     let upperCaseOne = (id) => {
//         setTodos((prevTodos) => 
//           prevTodos.map((todo) => {
//             if(todo.id == id){
//                 return {
//                     ...todo,
//                     task: todo.task.toUpperCase(),
//                 };
//             }else {
//                 return todo;
//             }
//           })
//         );
//     };

//     return (
//         <div>
//             <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}></input>
//             <br></br>&nbsp;
//             <button onClick={addNewTask}>Add Task</button>
//             <br></br>
//             <br></br>
//             <br></br>
//             <hr></hr>
//             <h4>Task Todo</h4>
//             <ul>
//                 {
//                     todos.map((todo) => (
//                         <li key={todo.id}>
//                             <span>{todo.task}</span>
//                             &nbsp;&nbsp;
//                             <button onClick={() => deleteTodo(todo.id)}>delete</button>
//                             <button onClick={() => upperCaseOne(todo.id)}>UpperCase</button>
//                         </li>
//                     ))
//                 }
//             </ul>
//             <br></br>
//             <button onClick={upperCaseAll}>UpperCase All</button>
//         </div>
//     );
// }






//       Edited code





// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./TodoList.css";

// export default function TodoList() {
//   const [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), completed: false }]);
//   const [newTodo, setNewTodo] = useState("");

//   const addNewTask = () => {
//     if (newTodo.trim() === "") return;
//     setTodos((prev) => [...prev, { task: newTodo, id: uuidv4(), completed: false }]);
//     setNewTodo("");
//   };

//   const updateTodoValue = (e) => setNewTodo(e.target.value);
//   const deleteTodo = (id) => setTodos((prev) => prev.filter((todo) => todo.id !== id));
//   const upperCaseAll = () => setTodos((prev) => prev.map((todo) => ({ ...todo, task: todo.task.toUpperCase() })));
//   const upperCaseOne = (id) => setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo));

//   const markCompleted = (id) => {
//     setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: true } : todo));
//   };

//   return (
//     <div className="todo-card">
//       <h1>Todo App</h1>

//       <div className="todo-input-container">
//         <input
//           placeholder="Add a task"
//           value={newTodo}
//           onChange={updateTodoValue}
//           onKeyDown={(e) => e.key === "Enter" && addNewTask()}
//         />
//         <button onClick={addNewTask}>Add</button>
//       </div>

//       <div className="todo-list-container">
//         <ul className="todo-list">
//           {todos.map((todo) => (
//             <li key={todo.id}>
//               <span className={todo.completed ? "completed-task" : ""}>{todo.task}</span>
//               <div>
//                 <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
//                 <button className="uppercase-btn" onClick={() => upperCaseOne(todo.id)}>Uppercase</button>
//                 <button className="correct-btn" onClick={() => markCompleted(todo.id)}>Correct</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {todos.length > 0 && (
//         <button className="uppercase-all-btn" onClick={upperCaseAll}>Uppercase All</button>
//       )}
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [{ task: "Sample Task", id: uuidv4(), completed: false }];
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      return [{ task: "Sample Task", id: uuidv4(), completed: false }];
    }
  });

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      console.error("Error writing to localStorage:", err);
    }
  }, [todos]);

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prev) => [...prev, { task: newTodo, id: uuidv4(), completed: false }]);
    setNewTodo("");
  };

  const updateTodoValue = (e) => setNewTodo(e.target.value);
  const deleteTodo = (id) => setTodos((prev) => prev.filter((todo) => todo.id !== id));
  const upperCaseAll = () => setTodos((prev) => prev.map((todo) => ({ ...todo, task: todo.task.toUpperCase() })));
  const upperCaseOne = (id) => setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo));
  const markCompleted = (id) => setTodos((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: true } : todo));

  return (
    <div className="todo-card">
      <h1>Todo App</h1>
      <div className="todo-input-container">
        <input
          placeholder="Add a task"
          value={newTodo}
          onChange={updateTodoValue}
          onKeyDown={(e) => e.key === "Enter" && addNewTask()}
        />
        <button onClick={addNewTask}>Add</button>
      </div>

      <div className="todo-list-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span className={todo.completed ? "completed-task" : ""}>{todo.task}</span>
              <div>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button className="uppercase-btn" onClick={() => upperCaseOne(todo.id)}>Uppercase</button>
                <button className="correct-btn" onClick={() => markCompleted(todo.id)}>Correct</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {todos.length > 0 && (
        <button className="uppercase-all-btn" onClick={upperCaseAll}>Uppercase All</button>
      )}
    </div>
  );
}
