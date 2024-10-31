// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './Navbar.module.css';

const NavBar = () => {
    return (
        <Navbar className={styles.navbar} bg="primary" data-bs-theme="dark" expand="lg">
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles['navbar-brand']}`} to="/">Gerenciador de Eventos</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={`nav-link ${styles['nav-link']}`} to="/">Lista de Eventos</Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavBar;
