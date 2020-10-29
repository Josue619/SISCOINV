import React, { Component } from 'react';
import { profile } from '../../services/main.service';

import SidebarMod from '../layout/SidebarMod';
import { Formulario, Campo } from '../ui/Formulario';


class Profile extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: ''
        }

    }

    
    componentDidMount() {
        profile().then(res => {
            this.setState({
                name: res.data.USU_LOGIN,
                email: res.data.USU_EMAIL
            });
        });
    }
    

    render() {
        return (
            <div className="contenedor-app table-responsive">
            <SidebarMod />
            <Formulario>
                <Campo>
                    <h1>Sistema de Control Inventarios</h1>
                </Campo>
                <Campo>
                    <h2>Información Usuario</h2>
                </Campo>
                <Campo>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Usuario:</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </Campo>
                        
            </Formulario>
            </div>
        )
    }

}

export default Profile;