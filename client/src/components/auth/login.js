import React, { Component } from 'react';
import { login } from '../../services/main.service';
import { Token } from '../../helpers/token.helper';

//styled components
import { css } from '@emotion/core';

//Estilos personalizados
import { Formulario, Campo } from '../ui/Formulario';
import { Boton } from '../ui/Boton';
import {FormUsuario} from '../ui/FormUsuario';


import Swal from 'sweetalert2'; 

class Login extends Component {

    URL_CLIENT = process.env.REACT_APP_URL_CLIENT;

    constructor(props) {
        super(props);
        this.token = new Token();
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit() {
        if(this.state.email === '' || this.password === ''){
             //Alerta de error.
             Swal.fire({
                icon: 'error',
                title: 'Error inicio Sesión',
                text: 'Todos los campos son Obligatorios'
            });

        }else{
            const user = {
                email: this.state.email,
                password: this.state.password
    
            };
    
            login(user).then(res => {
                if (res.data.success) {
                    const token = res.data.auth_token;
                    this.handleResponse(token);
    
                } else {
                    const error = res.data.error.msg;
                    this.handleError(error);
                    //Alerta de error.
                    Swal.fire({
                        icon: 'error',
                        title: 'Error inicio Sesión',
                        text: error +'. Intenta de nuevo'
                    });
                }
            });
        }
        
    }

    handleResponse(token) {
        this.token.handle(token);
        window.location.replace(`${this.URL_CLIENT}/profile`);
    }

    handleError(error) {
        console.log(error);
    }

    render() {
        return (
            <FormUsuario>
                <div className="contenedor-form sombra-dark">
                    
                        <h1
                          css={css`
                          text-align: center;
                          margin-top: 5rem;
                        `}
                        >Inicio Sesión</h1>
                        <Formulario>
                            <Campo>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="Correo Electrónico"
                                value={this.state.email} onChange={(value) => this.setState({ email: value.target.value })} />
                            </Campo>

                            <Campo>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="Contraceña"
                                value={this.state.password} onChange={(value) => this.setState({ password: value.target.value })} />
                            </Campo>

                            <div>
                                <Boton
                                    type="sumit"
                                    onClick={() => this.onSubmit()}
                                >
                                    Iniciar Sesión
                                </Boton>
                            </div>
                        </Formulario>
                    </div>
               
            </FormUsuario>
        );
    }

}

export default Login;