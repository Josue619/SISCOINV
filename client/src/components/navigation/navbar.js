import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
//import logo from '../../imagenes/logoSis.png';

//Styled components
import styled from '@emotion/styled';



const Logo = styled.a`
    color: var(--blanco);
    font-size: 4rem;
    line-height: 1;
    font-weight: 800;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;


class Navbar extends Component {


    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.replace('/');
    }


    render() {
        const loginRegLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-principal">
                    <Link to="/login" className="btn btn-blank cerrar-sesion">
                        Iniciar Sesión
                    </Link>
                </li>

                <li className="nav-principal">
                    <Link to="/signup" className="btn btn-blank cerrar-sesion">
                        Registrar Usuario
                    </Link>
                </li>

            </ul>
        );

        const userLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-principal">
                    <Link to="/profile" className="btn btn-primario btn-block">
                        Profile
                    </Link>
                </li>

                <li className="nav-principal">
                    <a href="/" onClick={this.logOut.bind(this)} className="btn btn-primario btn-block">
                        Cerrar sesión
                    </a>
                </li>

            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/">
                    <Logo>SisInv</Logo>
                </Link>
                
                
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarColor02"
                        aria-controls="navbarColor02" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                    </button>

                    <ul className="navbar-nav mx-auto">
                        <li className="nav-principal">
                            <Link to="/" className="btn btn-blank cerrar-sesion">
                                Inicio
                            </Link>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        {localStorage.token ? userLink : loginRegLink }
                    </div>
                </nav >
        )

    }
}

export default withRouter(Navbar);