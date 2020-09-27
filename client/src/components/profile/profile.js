import React, { Component } from 'react';
import { profile } from '../../services/main.service';

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
            <div className="contendor-tareas">
                <div className>
                    <h1>Sistema de Control Inventarios</h1>
                    
                    <table className="table col-md-4 mx-auto">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}

export default Profile;