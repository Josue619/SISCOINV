import React from 'react';
import Sidebar from '../layout/Sidebar';
import { Formulario, Campo } from '../ui/Formulario';
import imagen from '../../imagenes/INV.png';

const MenuInventario = () => {
    return ( 
        <div className="contenedor-app">
            <Sidebar/>
            <Formulario>
                <Campo>
                    <h1 className="text-center">Mantenimientos y Procesos de Inventarios</h1>
                </Campo>
                <img src={imagen} alt="Girl in a jacket" width="400" height="400"></img>
            </Formulario>
           
        </div>
     );
}
 
export default MenuInventario;