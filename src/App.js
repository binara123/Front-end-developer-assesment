import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/todos"
          element={
            isAuthenticated ? (
              <TodoProvider>
                <TodoPage />
              </TodoProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
