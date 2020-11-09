import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
import unimediReducer from './unimediReducer';
import bodevendeReducer from './bodevendeReducer';
import usuarioReducer from './usuarioReducer';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer,
    unimedi: unimediReducer,
    bodevend: bodevendeReducer,
    usuarios: usuarioReducer
})