import React, { useEffect, useState } from 'react';

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

                        <div className="modal-body">
                            <div className="form-group row  mx-auto justify-content-center">

                                <div className="form-group col-md-6">
                                    <label htmlFor="username">Nombre</label>
                                    <input type="text" name="username" className="form-control" placeholder="Nombre"
                                        value={user.username} onChange={onChange} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="email">Correo</label>
                                    <input type="text" name="email" className="form-control" placeholder="Correo"
                                        value={user.email} onChange={onChange} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="password">Contraseña</label>
                                    <input type="password" name="password" className="form-control" placeholder="Contraseña"
                                        value={user.password} onChange={onChange} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="id_card">Identificación</label>
                                    <input type="number" name="id_card" className="form-control" placeholder="# Identificación"
                                        min="0" pattern="^[0-9]+" value={user.id_card}
                                        onChange={onChange} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="cellphone">Número Celular</label>
                                    <input type="number" name="cellphone" className="form-control" placeholder="# Celular"
                                        min="0" pattern="^[0-9]+" value={user.cellphone}
                                        onChange={onChange} />
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="role">Role</label>
                                    <select id="role" name="selectRole" value={user.selectRole} className="form-control" onChange={onChange}>
                                        {/* <option defaultValue={user.selectRole}>{user.stringRole}</option> */}
                                        <option value="1">Admin</option>
                                        <option value="2">Bodeguero</option>
                                        <option value="3">Vendedor</option>
                                    </select>

                                    <br />
                                    <br />

                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" id="test" className="btn btn-primary" onClick={() => t()}>Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserForm2;