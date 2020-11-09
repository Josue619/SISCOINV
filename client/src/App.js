import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//-----------------Seguridad------------------------
import Navbar from './components/navigation/navbar';
import Landing from './components/main/landing';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Profile from './components/profile/profile';
import UserList from './components/user/user-list';
//import UserForm from './components/user/user-form';
import AfterLogin from './services/after-login.service';
import BeforeLogin from './services/before-login.service';
import { Token } from './helpers/token.helper';
//----------------------------------------------------

//---------------Inventario---------------------------
import MenuInventario from './components/main/menuInventarios';
import ListaArticulos from './components/inventarios/invarticulos/listArticulos';
import EditarProducto from './components/inventarios/invarticulos/EditarProducto';
import NuevoProductos from './components/inventarios/invarticulos/NuevoProducto';
import ListaUnidadMedida from './components/inventarios/unidadesmedida/ListUniMedida';
import NuevaUnidadMedi from './components/inventarios/unidadesmedida/NuevaUnidadMedi';
import EditarUnidadMedi from './components/inventarios/unidadesmedida/EditarUniMedi';
import ListBodVen from './components/inventarios/vendeBode/ListBodVen';
import NuevoBodeVende from './components/inventarios/vendeBode/NuevoBodeVende';
import EditarBodeVende from './components/inventarios/vendeBode/EditarBodeVende';


//----------------------------------------------------

//Redux
import  { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    this.token = new Token();
    return (      
      <Router>
        <Provider store={store}>

        
        <div className="form-principal">

          <Navbar />
          <Route exact path="/" component={Landing} />

          <Switch>
            <Route exact path='/inv/minventario' component={MenuInventario}/>
            <Route exact path="/inv/listarticulos" component={ListaArticulos}/>
            <Route exact path="/inv/productos/nuevo" component={NuevoProductos}/>
            <Route exact path="/inv/productos/editar/:id" component={EditarProducto} />

            <Route exact path="/inv/listunidadmedida" component={ListaUnidadMedida} />
            <Route exact path="/inv/munidadmedi/nuevo" component={NuevaUnidadMedi} />
            <Route exact path="/inv/munidadmedi/editar/:id" component={EditarUnidadMedi} />
            
            <Route exact path="/inv/listbodven" component={ListBodVen} />
            <Route exact path="/inv/mbodevende/nuevobodevende" component={NuevoBodeVende} />
            <Route exact path="/inv/mbodevende/editarbodevende/:id" component={EditarBodeVende} />

            
          </Switch>
          
          
          
          

          <div className="form-principal">
            <BeforeLogin path='/login' exact component={Login} auth={!this.token.loggedIn()} />
            <BeforeLogin path='/signup' exact component={Signup} auth={!this.token.loggedIn()} />
            <AfterLogin path='/profile' exact component={Profile} auth={this.token.loggedIn()} />
            <AfterLogin path='/users' exact component={UserList} auth={this.token.loggedIn()} />
            
          </div>

        </div>
        </Provider>
      </Router>
    )
  }
}

export default App;