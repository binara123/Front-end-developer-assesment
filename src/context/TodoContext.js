
import { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title, description) => {
    const newTodo = { id: Date.now(), title, description, completed: false };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  );
};
