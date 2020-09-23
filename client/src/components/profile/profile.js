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
            <div className="container">
                <div className="jumbotrom mt-5">
                    <div className="col-sm-4 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>

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