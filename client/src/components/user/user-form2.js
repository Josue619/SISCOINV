import React, { useEffect, useState } from 'react';


//Estilos personalizados
import { Formulario, Campo } from '../ui/Formulario';
import { BotonUser, BotonUserCerrar } from '../ui/Boton';
import { FormUser } from '../ui/FormUsuario';



const UserForm2 = ({ dataUser, t }) => {

    const [user, setUser] = useState({
        code: 0,
        selectRole: 2,
        stringRole: '',
        username: '',
        email: '',
        password: '',
        id_card: '',
        cellphone: '',
    })

    const onChange = event => {
        const { name, value } = event.target;
        
        setUser({ ...user, [name]: value });
        
        console.log(user, event.target);
    }

    useEffect(() => {
        if (Object.entries(dataUser).length > 0) {
            const role = Object.assign({}, dataUser.SEG_ROL);
            setUser({
                code: dataUser.USU_CODIGO,
                selectRole: role.id,
                stringRole: role.ROL_DESCRIPCION,
                username: dataUser.USU_LOGIN,
                email: dataUser.USU_EMAIL,
                password: dataUser.USU_PASSWORD,
                id_card: dataUser.USU_CEDULA,
                cellphone: dataUser.USU_CELULAR,
            })
        }
    }, [dataUser])

    return (
        <div className="container">

            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" role="document">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                            </h5>
                            <button type="button" id="closeM" className="close btn btn-danger" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <FormUser>
                        <div className="contenedor-form sombra-dark modal-body ">
                            {}
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

                                <Campo>
                                    <label htmlFor="password">Contraseña</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Contraseña"
                                        value={user.password} onChange={onChange} />
                                </Campo>

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
                                    <label htmlFor="role">Role</label>
                                    <select 
                                        id="role" 
                                        name="selectRole" 
                                        value={user.selectRole} 
                                        onChange={onChange}>
                                        {/* <option defaultValue={user.selectRole}>{user.stringRole}</option> */}
                                        <option value="1">Admin</option>
                                        <option value="2">Bodeguero</option>
                                        <option value="3">Vendedor</option>
                                    </select>
                                </Campo>

                            </Formulario>
                            <div className="modal-footer">
                                <BotonUserCerrar data-dismiss="modal">Cerrar</BotonUserCerrar>
                                <BotonUser onClick={() => t()}>Guardar</BotonUser>
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