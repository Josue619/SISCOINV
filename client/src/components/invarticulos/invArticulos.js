import React, { Component, Fragment } from 'react';
import { obtenerArticulos } from '../../services/main.service';


//Styled components
import styled from '@emotion/styled';

//sweetalert2
import Swal from 'sweetalert2';

//Estilos personalizados---------------
const Formulario = styled.div`
    background-color: var(--gris2);
    height: 100vh;
    min-height: 800px;
    display: flex;
    align-items: baseline;
    justify-content: center;
`;

const Contenedor = styled.div`
    padding: 5rem 3rem;
    max-width: 1200px;
    width: 100%;
    background-color: var(--blanco);
    border-radius: 1rem;
`;


const INITIAL_STATE = {
    admin: '',
    dataUser: {},
    articuloList: []
}

class INVArticulos extends Component {

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

        obtenerArticulos().then(res => {
            try {
                const data = res.data;
                console.log(data);
                if(data.success === false){
                    this.alertaMensajeError(data.error.msg, 'error', 'Error');
                }else{
                    this.setState({ articuloList: data });
                }
            }catch (error) {
                console.log(error);
                this.alertaMensajeError(error, 'error', 'Error');
            }finally{

            }


           
        })
    }

    //Dispara mensaje
    alertaMensajeError(msg, icon, title) {
        Swal.fire({
            icon: icon,
            title: title,
            text: msg
        });

    }
    /*onDelete(user) {
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
    }*/

    loadFillData() {

        return this.state.articuloList.map((data) => {
            return (
                <Fragment key={data.ATO_CODIGO}>
                    <tr>
                        <td>{data.ATO_CODIGO}</td>
                        <td>{data.ATO_DESCRIPCION}</td>
                        <td>{data.ATO_MAR_MARCA}</td>
                        <td>{data.ATO_MOD_MODELO}</td>
                        <td>{data.Unidad_medida}</td>
                        <td>
                            <button
                                className="btn btn-primary mr-2"
                                data-backdrop="false"
                                data-toggle="modal"
                                data-target="#staticBackdrop">
                                Editar
                            </button>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </Fragment>
            );
        });
    }



    render() {

        return (
            <Formulario>
                <Contenedor>
                    <div className="table-responsive">

                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Unidad Medida</th>
                                    <th scope="col">Acciones</th>
                                    <th colSpan="2">
                                        <button
                                            className="btn btn-outline-success font-weight-bold d-block w-100"
                                            onClick={() => this.getAdmin()}
                                            data-backdrop="false"
                                            data-toggle="modal"
                                            data-target="#staticBackdrop">
                                            Agregar Producto
                                    </button>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.loadFillData()}
                            </tbody>
                        </table>

                    </div>
                </Contenedor>
            </Formulario>
        );
    }

}

export default INVArticulos;