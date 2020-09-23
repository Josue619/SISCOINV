import React, { Component } from 'react';
import { login } from '../../services/main.service';
import { Token } from '../../helpers/token.helper';

class Login extends Component {

    constructor(props) {
        super(props);
        this.token = new Token();
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit() {

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
                alert("Error web service: " + error);
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
                            Please sign in
                        </h1>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control" name="email" placeholder="Enter email"
                                value={this.state.email} onChange={(value) => this.setState({ email: value.target.value })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Email Address</label>
                            <input type="password" className="form-control" name="password" placeholder="Enter password"
                                value={this.state.password} onChange={(value) => this.setState({ password: value.target.value })} />

                        </div>



                        <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={() => this.onSubmit()}>Sign In</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;