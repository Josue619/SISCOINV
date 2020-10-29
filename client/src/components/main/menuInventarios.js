import React from 'react';
import Sidebar from '../layout/Sidebar';
import { Formulario, Campo } from '../ui/Formulario';

const MenuInventario = () => {
    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            <Formulario>
                <Campo>
                    <h1 className="text-center">Mantenimientos y Procesos de Inventarios</h1>
                </Campo>
            </Formulario>
        </div>
     );
}
 
export default MenuInventario;