import { Link } from "react-router-dom";
import React, { Component, Fragment } from 'react';
import { getUsers } from '../../services/main.service';

//sweetalert2
import Swal from 'sweetalert2';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
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
                            <Link className="btn btn-outline-info " to={"/form"} >Edit</Link>
                        </td>
                        <td>
                            <button className="btn btn-outline-danger" onClick={() => this.onDelete(data.USU_CODIGO)}> Delete </button>
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

        return (
            <div className="container">

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
                                    <Link className="btn btn-outline-success " to={"#"} >Edit</Link>
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

export default Signup;