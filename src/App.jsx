import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MenuIBGE } from './components/Menu';
import { ApiReceiver } from './components/IBGEAPI';
import { Home } from './components/Home'; 

export default function App() {
  return (
    <Router>
      <MenuIBGE />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/consulta/*" element={<ApiReceiver />} />
        
      </Routes>
    </Router>
  );
}