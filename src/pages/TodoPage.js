import TodoList from '../components/ToDoList';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TodoPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="container-fluid">

      
      <TodoList />
    </div>
  );
};

export default TodoPage;
