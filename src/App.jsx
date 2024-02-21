import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Utilisez `Routes` au lieu de `Switch` si vous êtes sur React Router v6
import CreateEmployee from './components/pages/CreateEmployee';
import CurrentEmployees from './components/pages/CurrentEmployees'; // Assurez-vous d'avoir un composant pour cela
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<CreateEmployee />} />
          <Route path="/current-employees" element={<CurrentEmployees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;