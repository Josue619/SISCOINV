import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import productolocalReducer from './productolocalReducer';
import alertaReducer from './alertaReducer';
import unimediReducer from './unimediReducer';
import bodevendeReducer from './bodevendeReducer';
import usuarioReducer from './usuarioReducer';
import tipoempaque from './tipoempaqueReduce';
import localizaciones from './localizacionReducer';
export default combineReducers({
    productos: productosReducer,
    productoslocal: productolocalReducer,
    alerta: alertaReducer,
    unimedi: unimediReducer,
    bodevend: bodevendeReducer,
    usuarios: usuarioReducer,
    tipoempa: tipoempaque,
    localiza: localizaciones
})