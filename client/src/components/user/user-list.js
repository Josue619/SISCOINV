import React, { Component, Fragment } from 'react';
import { getUsers } from '../../services/main.service';
import UserForm from './user-form2';

import { profile } from '../../services/main.service';
import Service from '../../services/main.service';

//sweetalert2
import Swal from 'sweetalert2';

const INITIAL_STATE = {
    admin: '',
    dataUser: {},
    userList: []
}

class UserList extends Component {

    Service = new Service();

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {

        getUsers().then(res => {
            if (res.data.success) {
                const data = res.data.data;
                this.setState({ userList: data });

            } else {
                const error = res.data.error.msg;
                alert("Error web service: " + error);
            }
        })
    }

    onDelete(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true,
        })

        swalWithBootstrapButtons.fire({
            title: '¿Está seguro que desea eliminar el empleado?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                swalWithBootstrapButtons.fire(
                    'Eliminado',
                    'El empleado ha sido removido del registro.',
                    'success'
                )
                this.sendDelete(id)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha realizado ningún cambio',
                    'error'
                )
            }
        })
    }

    sendDelete(userId) {
        console.log(userId);
    }

    getAdmin() {
        profile().then(res => {
            this.setState({ admin: res.data.USU_LOGIN });
        });
    }

    edit(data) {
        //var element = document.getElementById("test");
        //element.click();
        //console.log(data);
        this.getAdmin();
        this.setState({ dataUser: data });
    }

    test() {
        this.setState({ dataUser: {} });
    }

    loadFillData() {

        return this.state.userList.map((data) => {
            return (
                <Fragment key={data.USU_CODIGO}>
                    <tr>
                        <td>{data.SEG_ROL.ROL_DESCRIPCION}</td>
                        <td>{data.USU_LOGIN}</td>
                        <td>{data.USU_EMAIL}</td>
                        <td>{data.USU_CEDULA}</td>
                        <td>{data.USU_CELULAR}</td>
                        <td>
                            <button
                                className="btn btn-outline-info"
                                onClick={() => this.edit(data)}
                                data-backdrop="false"
                                data-toggle="modal"
                                data-target="#staticBackdrop">
                                Editar
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => this.onDelete(data.USU_CODIGO)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </Fragment>
            );
        });
    }

    handleResponse(token) {

    }

    handleError(error) {

    }


    render() {

        const { dataUser } = this.state;
        const { admin } = this.state;
        return (
            <div className="container">
                <UserForm admin={admin} dataUser={dataUser} t={this.test.bind(this)} />
                <div className="col mt-5 mx-auto">
                    <table className="table table-hover table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Role</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Cedula</th>
                                <th scope="col">#_Celular</th>
                                <th colSpan="2">
                                    Acción
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={() => this.getAdmin()}
                                        data-backdrop="false"
                                        data-toggle="modal"
                                        data-target="#staticBackdrop">
                                        Nuevo
                                    </button>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadFillData()}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

export default UserList;