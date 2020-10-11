import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
//import logo from '../../imagenes/people.svg'; 

//Styled components
import styled from '@emotion/styled';

//Estilos personalizados
const Nav = styled.nav`
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
     font-size: 1.6rem;
    font-weight: 700;
    line-height: 1rem;
    @media (min-width: 768px) {
        padding-bottom: 0;
    }
`;


const NavLink = styled(Link)`
    color: #FFFFFF;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1rem;
    font-family: 'PT Sans', sans-serif;
    text-decoration: none;
    padding: .1rem;
    margin-right: 1rem;
    &:last-of-type {
        margin-right: 0;
    }
    &.pagina-actual {
        border-bottom: 2px solid #FFF;
    }
`;

const Logo = styled.p`
    /*color: white;*/
    font-size: 3rem;
    line-height: 1;
    font-weight: 700;
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
                    <Nav>
                        <NavLink to="/login">
                            Iniciar Sesión
                        </NavLink>
                    
                        <NavLink to="/signup">
                            Registrar Usuario
                        </NavLink>
                    </Nav>
                </ul>
           
        
        );

        const userLink = (
                <Nav >
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                    
                    <NavLink to="/" onClick={this.logOut.bind(this)}>
                        Cerrar sesión
                    </NavLink>
                    
                </Nav>
           
        );

        return (
            <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink to="/">
                    <Logo>
                        SisInv
                    </Logo>
                </NavLink>
                
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

                <NavLink to="/">
                    Inicio
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    {localStorage.token ? userLink : loginRegLink }
                </div>
            </Nav >
        )

    }
}

export default withRouter(Navbar);