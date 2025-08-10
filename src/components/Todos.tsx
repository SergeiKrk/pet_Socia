import { useState, useEffect } from "react";
import { fetchTodos } from "../services/api";
import type { Todo } from "../types/types";

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.title} - User #{todo.userId}</h2>
          <p>completed: {(todo.completed == true)? true : false }</p>
        </div>
      ))}
    </div>
  );
};