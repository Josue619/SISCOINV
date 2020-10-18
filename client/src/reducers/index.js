import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
import unimediReducer from './unimediReducer';

export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer,
    unimedi: unimediReducer
})