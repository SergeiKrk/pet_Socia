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
          <h3>{todo.title} - #{todo.userId}</h3>
          <p>{(todo.completed ? '1' : '0')}</p>
        </div>
      ))}
    </div>
  );
};