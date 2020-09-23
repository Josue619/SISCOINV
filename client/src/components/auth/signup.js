import React, { Component } from 'react';
import { signup } from '../../services/main.service';
import { Token } from '../../helpers/token.helper';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.token = new Token();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            id_card: '',
            cellphone: '',
        }
    }

    onSubmit() {
        const newUser = {
            username: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            id_card: this.state.id_card,
            cellphone: this.state.cellphone
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
                    alert("Error web service: " + element.msg);
                }
            }
        });

    }

    handleResponse(token) {
        this.token.handle(token);
        this.props.history.push("/profile");
    }

    handleError(error) {
        console.log(error);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">

                        <h1 className="h3 mb-3 font-weight-normal">
                            Register
                        </h1>

                        <div className="form-group">
                            <label htmlFor="firs_name">First Name</label>
                            <input type="text" className="form-control" name="firs_name" placeholder="Enter First Name"
                                value={this.state.first_name} onChange={(value) => this.setState({ first_name: value.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" placeholder="Enter Last Name"
                                value={this.state.last_name} onChange={(value) => this.setState({ last_name: value.target.value })} />


                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email"
                                value={this.state.email} onChange={(value) => this.setState({ email: value.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter Password"
                                value={this.state.password} onChange={(value) => this.setState({ password: value.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="id_card">ID Card</label>
                            <input type="number" className="form-control" name="id_card" placeholder="Enter ID Card"
                                min="1" pattern="^[0-9]+"
                                value={this.state.id_card} onChange={(value) => this.setState({ id_card: value.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cellphone">Cellphone</label>
                            <input type="number" className="form-control" name="cellphone" placeholder="Enter Cellphone number"
                                min="0" pattern="^[0-9]+"
                                value={this.state.cellphone} onChange={(value) => this.setState({ cellphone: value.target.value })} />
                        </div>

                        <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={() => this.onSubmit()}>Register</button>

                    </div>
                </div>
            </div>
        )
    }

}

export default Signup;