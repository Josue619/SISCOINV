import React, { Component } from 'react';
import { login } from '../../services/main.service';
import { Token } from '../../helpers/token.helper';

import Swal from 'sweetalert2'; 

class Login extends Component {

    URL_CLIENT = 'http://localhost:3001';

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
            <div className="form-usuario">
                <div className="contenedor-form sombra-dark">
                    <div>
                        <h1>Inicio Sesión</h1>

                        
                            <div className="campo-form">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="Correo Electrónico"
                                    value={this.state.email} onChange={(value) => this.setState({ email: value.target.value })} />
                            </div>

                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="Contraceña"
                                    value={this.state.password} onChange={(value) => this.setState({ password: value.target.value })} />
                            </div>
                            <div className="campo-form">
                                <input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    onClick={() => this.onSubmit()}
                                    value="Iniciar Sesión"
                                />
                                
                                
                                

                            </div>
                        
                        
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;