import axios from 'axios';
//import { Token } from '../helpers/token.helper';

//const token = new Token();
const baseProcesosUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/procesos`;
const baseMantenUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/mantenimiento`;


/**
 * LLamada al api de articulos.
 * 
 * Procesos
 */
/*---------------------------------------------*/

/**
 * Funcion que devuelve los articulos inventarios
 * ----------------------------------------------- 
*/
export function obtenerArticulos() {
    let resultado = axios.get(`${baseProcesosUrl}/obtieneArticulos`);
    
    return resultado;
}

/**
 * Funcion que devuelve las localizaciones de un producto.
 */

export function obtenerArticulosLocalizacion(producto) {
    let resultado = axios.post(`${baseProcesosUrl}/obtieneArtiLocal`,producto);
    return resultado;
}

/**
 * Proceso insercion o actualizacion de articulos
 */
export function pr_insertActArticulos(producto) {
    return axios.post(`${baseProcesosUrl}/pr_insertActualizaArti`,producto);
}

/**
 * Procesimiento de eliminar articulos.
 */
export function pr_inv_del_articulo(producto) {
    return axios.post(`${baseProcesosUrl}/pr_inv_del_articulo`,producto);
}

/**
 * LLamada al api de unidades medida.
 * 
 * Mantenimientos
 */
/*---------------------------------------------*/

/**
 * Agregar nueva unidad medida
 * ----------------------------------------------------
 */
export function agregarNuevaUnidadMedida(unidadmedida) {
    return axios.post(`${baseMantenUrl}/crearUnidadMedi`,unidadmedida);

}

/**
 * Agregar nueva unidad medida
 * ----------------------------------------------------
 */
export function editarUnidadMedida(unidadmedida) {
    return axios.put(`${baseMantenUrl}/actualizarUnidadMedi`,unidadmedida);

}

/**
 * Borrar unidad medida
 * ----------------------------------------------------
 */
export function eliminarUnidadMedida(unidadmedida) {
    return axios.post(`${baseMantenUrl}/eliminarUniMedida`,unidadmedida);

}


/**
 * Obtiene la listado de unidades
 * ----------------------------------------------------
 */
export function obtenerListadoUnidadeMedi() {    
    return axios.get(`${baseMantenUrl}/obtieneUnimedida`);

}

/**
 * Llamada del api de Bodegueros y Vendedores
 * 
 */

 /**
 * Agregar nuevo vendededor o bodeguero
 * ----------------------------------------------------
 */
export function agregarNuevoBodeVende(bodevende) {
    return axios.post(`${baseMantenUrl}/crearbodven`,bodevende);

}

/**
 * Editar bodeguero vendedor
 * ----------------------------------------------------
 */
export function editarBodeVende(bodevende) {
    return axios.put(`${baseMantenUrl}/actualizarbodven`,bodevende);

}

/**
 * Borrar Bodegueros o vendedores
 * ----------------------------------------------------
 */
export function eliminarBodeVende(bodevende) {
    return axios.post(`${baseMantenUrl}/eliminarbodven`,bodevende);

}


/**
 * Obtiene la listado Bodegueros y vendedores
 * ----------------------------------------------------
 */
export function obtenerListadoBodeVede() {
    return axios.get(`${baseMantenUrl}/obtienebodven`);

}

/**
 * Obterner listado de usuarios de vendedores.
 */
export function obtenerUsuarios(){
    return axios.get(`${baseMantenUrl}/obtieneusuarios`);
}

/**
 * Llamada al api de tipos de empaques
 */

 /**
  * Agrega los tipos de empaques
  */

/**
 * Funcion que optiene los tipos de empaques 
 */
export function agregarNuevoTipoEmpaque(tipoempaque) {
    return axios.post(`${baseMantenUrl}/creartipoempaque`,tipoempaque);
}

/**
 * Editar tipo empaque
 * ----------------------------------------------------
 */
export function editarTipoEmpaque(tipoempaque) {
    return axios.put(`${baseMantenUrl}/actualizartipoempaque`,tipoempaque);

}

/**
 * Borrar Tipo de Empaque
 * ----------------------------------------------------
 */
export function eliminarTimpoEmpaque(tipoempaque) {
    return axios.post(`${baseMantenUrl}/eliminartipoempaque`,tipoempaque);

}

/**
 * Obtiene la listado Bodegueros y vendedores
 * ----------------------------------------------------
 */
export function obtenerListadoTipoEmpaque() {
    return axios.get(`${baseMantenUrl}/obtienetipoempaque`);
}

/**
 * Llama al api de localizaciones
 */

 /**
  * Obtiene Listado de localizaciones
  */
 export function obtenerListadoLocalizacion() {
    return axios.get(`${baseMantenUrl}/obtienelocalizacion`);

}

/**
 * Agrega una nueva localizacion
 */
export function agregarNuevaLocalizacion(localizacion) {
    return axios.post(`${baseMantenUrl}/crearlocalizacion`,localizacion);
}

/**
 * Borrar una localizacion
 */
export function eliminarLocalizacion(localizacion) {
    return axios.post(`${baseMantenUrl}/eliminarlocalizacion`,localizacion);

}

/**
 * Editar una localizacion
 */
export function editarLocalizacion(localizacion) {
    console.log(localizacion);
    return axios.put(`${baseMantenUrl}/actualizarlocalizacion`,localizacion);

}


