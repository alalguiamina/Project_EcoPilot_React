import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import DataEntryPage from './Components/DataEntryPage/DataEntryPage';
import CarbonFootprintPage from './Components/CarbonFootprintPage/CarbonFootprintPage';
import ESGIndicatorsPage from './Components/ESGIndicatorsPage/ESGIndicatorsPage';


function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Page de Login (page d'accueil) */}
          <Route path="/" element={<Login />} />
          
          {/* Page Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-entry" element={<DataEntryPage />} />
          <Route path="/carbon" element={<CarbonFootprintPage />} />
          <Route path="/esg" element={<ESGIndicatorsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;