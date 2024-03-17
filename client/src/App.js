
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './components/Home/Home';
import Login from './components/User/Login';

function App() {
  return (
    <Router>
      <Routes> {/* Wrap Routes around Route components */}
        <Route exact path="/" element={<Home />} /> {/* Use 'element' prop instead of 'component' */}
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
