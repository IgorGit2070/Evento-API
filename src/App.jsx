import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import EventosPage from './pages/Eventos/EventosPage';
import ParticipantesPage from './pages/Participantes/ParticipantesPage';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<EventosPage />} />
                <Route path="/eventos" element={<EventosPage />} />
                <Route path="/participantes/:id" element={<ParticipantesPage />} />
            </Routes>
        </Router>
    );
};

export default App;
