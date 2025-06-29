import './App.css';
import { useAuthContext } from '../src/hooks/use-auth-hook';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'


function App() {
  const { user, loading, authenticated } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
