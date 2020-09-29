import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
            <div className="seccion-principal">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <span className="text-primary"> </span>
                        <img src="https://img.icons8.com/color/48/000000/casta-rica-circular.png" alt="" />
                    </a>
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
            </div>
            
        )

    }
}

export default withRouter(Navbar);