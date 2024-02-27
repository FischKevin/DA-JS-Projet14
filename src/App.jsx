import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateEmployee from './components/pages/CreateEmployee';
import CurrentEmployees from './components/pages/CurrentEmployees';
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