import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
import unimediReducer from './unimediReducer';
import bodevendeReducer from './bodevendeReducer';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer,
    unimedi: unimediReducer,
    bodevend: bodevendeReducer
})