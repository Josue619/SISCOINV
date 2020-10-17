import React, { Component, Fragment } from 'react';
import { getUsers, profile, deleteUser } from '../../services/main.service';
import UserForm from './user-form';
import { FormUsuario } from '../ui/FormUsuario';

//Pagination
import Pagination from "react-js-pagination";

//Styled components
import styled from '@emotion/styled';

//sweetalert2
import Swal from 'sweetalert2';


const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: 1200px;
    width: 100%;
    background-color: var(--blanco);
    border-radius: 4rem;
`;


const INITIAL_STATE = {
    admin: '',
    dataUser: {},
    userList: [],
    totalPages: 0,
    totalItems: 0,
    currentPage: 0,
    itemsPages: 0,
    search: ''
}

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(pageNumber = 0) {

        const data = {
            page: pageNumber,
            search: this.state.search
        }

        getUsers(data).then(res => {
            if (res.data.success) {
                const data = res.data.data.users;

                this.setState({ totalPages: res.data.data.totalPages });
                this.setState({ totalItems: res.data.data.totalItems });
                this.setState({ currentPage: res.data.data.currentPage });
                this.setState({ itemsPages: res.data.data.itemsPages });

                this.setState({ userList: data });

            } else {
                const error = res.data.error.msg;
                this.handleError(error);
            }
        })
    }

    onDelete(user) {
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
                this.sendDelete(user)
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

    sendDelete(user) {
        deleteUser(user).then(res => {
            if (res.data.success) {
                this.handleResponse();
            }
        });
    }

    getAdmin() {
        profile().then(res => {
            this.setState({ admin: res.data.USU_LOGIN });
        });
    }

    edit(data) {
        this.getAdmin();
        this.setState({ dataUser: data });
    }

    clearData() {
        this.setState({ dataUser: {} });
    }

    handleResponse() {
        window.location.reload();
    }

    handleError(error) {
        if (error === 'Permisos denegados') this.props.history.push('/');
        this.showModalError(error);
    }

    showModalError(msg) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: msg,
            showConfirmButton: false,
            timer: 1800
        })
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
                                onClick={() => this.onDelete(data)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </Fragment>
            );
        });
    }



    render() {

        const { dataUser } = this.state;
        const { admin } = this.state;
        return (
            <FormUsuario>

                <Contenedor>
                    <UserForm admin={admin} dataUser={dataUser} clearData={this.clearData.bind(this)} />

                    <div className="form-group row  mx-auto justify-content-center">
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" name="search" id="search" placeholder="Buscar empleados"
                                aria-label="Search" value={this.state.search} onChange={(value) => this.setState({ search: value.target.value })} />
                            <button type="submit" className="btn btn-outline-success my-2 my-sm-0" onClick={(pageNumber) => this.loadList(0)}>Buscar</button>
                        </div>
                    </div>

                    <div className="table-responsive">

                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Role</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Cedula</th>
                                    <th scope="col">#_Celular</th>
                                    <th colSpan="2">
                                        <button
                                            className="btn btn-outline-success font-weight-bold d-block w-100"
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

                        <div className="form-group row  mx-auto justify-content-center">
                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.state.itemsPages}
                                totalItemsCount={this.state.totalItems}
                                pageRangeDisplayed={this.state.totalPages}
                                onChange={(pageNumber) => this.loadList(pageNumber)}
                                itemClass="page-item"
                                linkClass="page-link"
                                firstPageText="First"
                                lastPageText="Last"
                            />
                        </div>

                    </div>

                </Contenedor>
            </FormUsuario>
        );
    }

}

export default UserList;