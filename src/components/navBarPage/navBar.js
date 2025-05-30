import React from 'react';
import './navBar.css';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export const NavBarPage = () => {
    return (
        <header className="container_menu">
            <Navbar expand="lg" className="navbar">
                <Container className="container_header">
                    <Navbar.Brand href="/" className="logo_senac">
                        <img src="./icons/senac.svg" alt="logo_senac" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNavDropdown" />
                    <Navbar.Collapse id="navbarNavDropdown" className="menu_link">
                        <Nav className="menu_container color_laranja">
                            <Nav.Link href="#/action-1" className="nav-item link_menu color_mostarda">
                                Evento
                            </Nav.Link>
                            <Nav.Link href="#/action-2" className="nav-item link_menu color_mostarda">
                                Setor
                            </Nav.Link>
                            <Nav.Link href="#/action-3" className="nav-item link_menu color_mostarda">
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