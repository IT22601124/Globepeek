// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Favourites from './pages/Favorites';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/country/:code" element={<CountryDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
