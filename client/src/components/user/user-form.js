import React, { Component } from 'react';


class UserForm extends Component {

    edit = false;

    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            code: 0,
            selectRole: 0,
            stringRole: '',
            username: '',
            email: '',
            password: '',
            id_card: '',
            cellphone: '',
            created_by: '',
            modified_by: ''
        }
    }

    componentDidMount() {
        //const {user} = this.props;
        //this.setState({ dataUser: Object.assign({}, user)})
    }
    
    test() {
        //console.log(this.state.dataUser);
    }

    render() {
        const {dataUser} = this.state;

        //<option value={this.state.dataUser.id}>{this.state.selectRole}</option>
        //<button type="button" id="openM" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
        //    Launch static backdrop modal
        //</button>

        

        
        return (
            <div className="container">
                {console.log(dataUser)}

                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content" role="document">

                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {!this.edit ? 'Agregar Necesidad' : 'Modificar Necesidad'}
                                </h5>
                                <button type="button" id="closeM" className="close btn btn-danger" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group row  mx-auto justify-content-center">

                                    <div className="form-group col-md-6">
                                        <label htmlFor="username">Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre"
                                            value={this.state.username} onChange={(value) => this.setState({ username: value.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Correo</label>
                                        <input type="text" className="form-control" placeholder="Correo"
                                            value={this.state.email} onChange={(value) => this.setState({ email: value.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Contraseña"
                                            value={this.state.password} onChange={(value) => this.setState({ password: value.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="id_card">Identificación</label>
                                        <input type="number" className="form-control" name="id_card" placeholder="# Identificación"
                                            min="0" pattern="^[0-9]+" value={this.state.id_card}
                                            onChange={(value) => this.setState({ id_card: value.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="cellphone">Número Celular</label>
                                        <input type="number" className="form-control" name="cellphone" placeholder="# Celular"
                                            min="0" pattern="^[0-9]+" value={this.state.cellphone}
                                            onChange={(value) => this.setState({ cellphone: value.target.value })} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="role">Role</label>
                                        <select id="role" className="form-control" onChange={(value) => this.setState({ selectRole: value.target.value })}>
                                            <option defaultValue>Selecione...</option>
                                            <option value="2">Bodeguero</option>
                                            <option value="2">Vendedor</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id="test" className="btn btn-primary" onClick={() =>this.test()}>Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

export default UserForm;