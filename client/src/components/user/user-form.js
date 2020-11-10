import React, { useEffect, useState } from 'react';
import { createUser, updateUser } from '../../services/main.service';

import Swal from 'sweetalert2';

//Estilos personalizados
import { Formulario, Campo } from '../ui/Formulario';
import { BotonUser, BotonUserCerrar } from '../ui/Boton';
import { FormUser } from '../ui/FormUsuario';


const UserForm2 = ({ admin, dataUser, clearData }) => {

    const [user, setUser] = useState({
        code: 0,
        roleID: 2,
        username: '',
        email: '',
        password: '',
        id_card: '',
        cellphone: '',
        created_by: '',
        modified_by: ''
    })

    const onChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {

        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                clearData();
            }
        };

        window.addEventListener('keydown', handleEsc);


        if (Object.entries(dataUser).length > 0) {
            const role = Object.assign({}, dataUser.SEG_ROL);
            setUser({
                code: dataUser.USU_CODIGO,
                roleID: role.id,
                username: dataUser.USU_LOGIN,
                email: dataUser.USU_EMAIL,
                password: dataUser.USU_PASSWORD,
                id_card: dataUser.USU_CEDULA,
                cellphone: dataUser.USU_CELULAR,
                created_by: dataUser.USU_CREADO_POR,
                modified_by: admin,
            })
        } else {
            setUser({
                code: 0,
                roleID: 2,
                username: '',
                email: '',
                password: '',
                id_card: '',
                cellphone: '',
                created_by: admin,
                modified_by: admin
            })
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };

    }, [admin, dataUser, clearData]);

    const createUserM = () => {
        createUser(user).then(res => {
            if (res.data.success) {
                handleResponse();

            } else {
                const errors = res.data.errors;
                handleError(errors);
            }
        });
    }

    const updateUserM = () => {
        updateUser(user).then(res => {
            if (res.data.success) {
                handleResponse();

            } else {
                const errors = res.data.errors;
                handleError(errors);
            }
        });
    }

    function handleResponse() {
        window.location.reload();
    }

    function handleError(errors) {
        showModalError(errors[0].msg)
    }

    function showModalError(msg) {
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: msg,
            showConfirmButton: false,
            timer: 1800
        })
    }

    const password = (
        <Campo>
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={user.password} onChange={onChange} />
        </Campo>
    );

    return (
        <div className="container">
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" role="document">
                        <div className="modal-header">
                            <h2>Datos Generales Usuario</h2>
                            <button type="button" id="closeM" className="close btn btn-danger"
                                data-dismiss="modal" aria-label="Close" onClick={() => clearData()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <FormUser>
                            <div className="contenedor-form sombra-dark modal-body ">
                                <h3 id="exampleModalLabel">
                                    {user.code === 0 ? 'Registrar usuario' : 'Actualizar usuario'}
                                </h3>
                                <Formulario>
                                    <Campo>
                                        <label htmlFor="username">Nombre</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Nombre"
                                            value={user.username} onChange={onChange} />
                                    </Campo>

                                    <Campo>
                                        <label htmlFor="email">Correo</label>
                                        <input
                                            type="text" name="email"
                                            placeholder="Correo"
                                            value={user.email} onChange={onChange} />
                                    </Campo>

                                    {user.code === 0 ? password : ''}

                                    <Campo>
                                        <label htmlFor="id_card">Identificación</label>
                                        <input
                                            type="number"
                                            name="id_card"
                                            placeholder="# Identificación"
                                            min="0" pattern="^[0-9]+"
                                            value={user.id_card}
                                            onChange={onChange} />
                                    </Campo>

                                    <Campo>
                                        <label htmlFor="cellphone">Número Celular</label>
                                        <input
                                            type="number"
                                            name="cellphone"
                                            placeholder="# Celular"
                                            min="0" pattern="^[0-9]+"
                                            value={user.cellphone}
                                            onChange={onChange} />
                                    </Campo>

                                    <Campo>
                                        <label htmlFor="role">Rol</label>
                                        <select
                                            id="role"
                                            name="roleID"
                                            value={user.roleID}
                                            onChange={onChange}>
                                            {/* <option defaultValue={user.selectRole}>{user.stringRole}</option> */}
                                            <option value="2">Vendedor</option>
                                            <option value="3">Bodeguero</option>
                                        </select>
                                    </Campo>

                                </Formulario>
                                <div className="modal-footer">
                                    <BotonUserCerrar data-dismiss="modal" onClick={() => clearData()}>Cerrar</BotonUserCerrar>
                                    {user.code}
                                    <BotonUser onClick={() => user.code === 0 ? createUserM() : updateUserM()}>Guardar</BotonUser>
                                </div>
                            </div>
                        </FormUser>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserForm2;