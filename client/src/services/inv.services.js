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