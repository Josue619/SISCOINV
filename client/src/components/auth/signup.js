import React, { Component } from 'react';
import { admin_auth, signup } from '../../services/main.service';
import { Token } from '../../helpers/token.helper';

import Swal from 'sweetalert2';


class Signup extends Component {

    validate = null;
    URL_CLIENT = 'http://localhost:3001';

    constructor(props) {
        super(props);
        this.token = new Token();
        this.state = {
            code_auth: '',
            selectRole: 0,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            id_card: '',
            cellphone: '',
            created_by: '',
            modified_by: ''
        }
    }

    admin_auth() {
        const data = {
            code_auth: this.state.code_auth
        };

        admin_auth(data).then(res => {
            if (res.data.success) {
                this.validate = true;
                this.props.history.push('/signup');

            } else {
                const errors = res.data.error;
                this.validate = false;
                this.handleError(errors.msg);
                //alert("Error web service: " + errors.msg);
                //Alerta de error.
                this.alertaMensajeError(errors.msg, 'error', 'Error código autorización');

            }
        });

    }

    onSubmit() {
        const newUser = {
            role: this.state.selectRole,
            username: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            id_card: this.state.id_card,
            cellphone: this.state.cellphone,
            created_by: this.state.first_name + ' ' + this.state.last_name,
            modified_by: this.state.first_name + ' ' + this.state.last_name,
        };

        signup(newUser).then(res => {
            if (res.data.success) {
                const token = res.data.auth_token;
                this.handleResponse(token);

            } else {
                const errors = res.data.errors;
                for (let index = 0; index < errors.length; index++) {
                    const element = errors[index];

                    this.handleError(element.msg);
                }
            }

        });

    }

    handleResponse(token) {
        this.token.handle(token);
        window.location.replace(`${this.URL_CLIENT}/profile`);
    }

    handleError(error) {
        console.log(error);
        this.alertaMensajeError(error, 'error', 'Registro usuario');
    }

    //Dispara mensaje
    alertaMensajeError(msg, icon, title) {
        Swal.fire({
            icon: icon,
            title: title,
            text: msg
        });

    }


    render() {

        const admin_authLink = (
            <div className="col-md-6 mt-5 mx-auto">

                <div className="campo-form">
                    <label htmlFor="code">Código Autorización</label>
                    <input type="password" name="code" placeholder="Digite el codigo"
                        value={this.state.code_auth} onChange={(value) => this.setState({ code_auth: value.target.value })} />
                </div>

                <button type="submit" className="btn btn-primario btn-block" onClick={() => this.admin_auth()}>Verificar</button>

            </div>
        );

        const signupLink = (

            <div>

                <h1>Registar una Cuenta</h1>

                <div className="campo-form">
                    <label htmlFor="firs_name">Nombre</label>
                    <input
                        type="text"
                        name="firs_name" placeholder="Enter First Name"
                        value={this.state.first_name}
                        onChange={(value) => this.setState({ first_name: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="last_name">Apellidos</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Digite los apellidos"
                        value={this.state.last_name} onChange={(value) => this.setState({ last_name: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite el email"
                        value={this.state.email}
                        onChange={(value) => this.setState({ email: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={(value) => this.setState({ password: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="Identificación">Identificación</label>
                    <input
                        type="number"
                        name="id_card"
                        placeholder="Digite su identificación"
                        min="1" pattern="^[0-9]+"
                        value={this.state.id_card}
                        onChange={(value) => this.setState({ id_card: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="cellphone">Número Celular</label>
                    <input
                        type="number"
                        name="cellphone"
                        placeholder="Digite su celular"
                        min="0" pattern="^[0-9]+"
                        value={this.state.cellphone}
                        onChange={(value) => this.setState({ cellphone: value.target.value })} />
                </div>

                <div className="campo-form">
                    <label htmlFor="role">Role</label>
                    <select id="role" className="campo-form" onChange={(value) => this.setState({ selectRole: value.target.value })}>
                        <option defaultValue>Selecione...</option>
                        <option value="1">Admin</option>
                    </select>
                </div>



                <button type="submit" className="btn btn-primario btn-block" onClick={() => this.onSubmit()}>
                    Registrar
                </button>

            </div>
        );

        return (
            <div className="form-usuario">
                <div className="contenedor-form sombra-dark">
                    {this.validate ? signupLink : admin_authLink}
                </div>
            </div>
        )
    }

}

export default Signup;