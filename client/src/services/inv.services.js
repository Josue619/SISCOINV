import axios from 'axios';
//import { Token } from '../helpers/token.helper';

//const token = new Token();
const baseArtiUrl = `${process.env.REACT_APP_URL_SERCLIENT}/api/proces
os`;


/**
 * LLamada al api de articulos.
 */
/*---------------------------------------------*/

/**
 * Funcion que devuelve los articulos inventarios
 * ----------------------------------------------- 
*/
export function obtenerArticulos() {
    let resultado = axios.get(`${baseArtiUrl}/obtieneArticulos`);
    
    return resultado;
}

/**
 * Proceso insercion o actualizacion de articulos
 */
export function pr_insertActArticulos(producto) {
    return axios.post(`${baseArtiUrl}/pr_insertActualizaArti`,producto);

}

/**
 * Obtiene la listado de unidades
 */
export function obtenerListadoUnidadeMedi() {
    return axios.get(`${baseArtiUrl}/obtieneUnimedida`);

}
