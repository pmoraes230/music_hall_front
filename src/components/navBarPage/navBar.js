import React, {useState, useEffect} from 'react';
import './navBar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export const NavBarPage = () => {
    const [scrolled, setScroLled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 50) {
                setScroLled(true)
            } else {
                setScroLled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <header className={`container_menu ${scrolled ? 'scrolled' : ''}`}>
            <Navbar expand="lg" className="navbar">
                <Container className="container_header">
                    <Navbar.Brand href="/Home" className="logo_senac">
                        <img src="./icons/senac.svg" alt="logo_senac" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNavDropdown" />
                    <Navbar.Collapse id="navbarNavDropdown" className="menu_link">
                        <Nav className="menu_container color_laranja">
                            <Nav.Link href="/registerEvents" className="nav-item link_menu color_mostarda">
                                Evento
                            </Nav.Link>
                            <Nav.Link href="/registerSetor" className="nav-item link_menu color_mostarda">
                                Setor
                            </Nav.Link>
                            <Nav.Link href="/registerUser" className="nav-item link_menu color_mostarda">
                                Usuário
                            </Nav.Link>
                            <NavDropdown
                                title={
                                    <img
                                        src="./icons/user.svg"
                                        alt="user_icon"
                                        className="icon_user"
                                    />
                                }
                                id="dropdown-basic"
                                className="dropContainer"
                            >
                                <NavDropdown.Item href="#/action" className="color_mostarda bg_black size_16">
                                    Conta
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#/action-2" className="color_mostarda bg_black">
                                    Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};