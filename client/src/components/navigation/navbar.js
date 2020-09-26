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

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                        Register
                    </Link>
                </li>

            </ul>
        );

        const userLink = (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>

                <li className="nav-item">
                    <a href="/" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>

            </ul>
        );

        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <a className="navbar-brand" href="/">  <span className="text-primary"> </span>
                    <img src="https://img.icons8.com/color/48/000000/casta-rica-circular.png" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                    aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <ul className="navbar-nav mx-auto">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            Home
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