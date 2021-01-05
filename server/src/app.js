const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

class Server {

    constructor () {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes() {
        /*-----------------Api usuarios-----------------*/
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/user', userRoutes);
        /**-------------------------------------------- */

        /**----------------Api de inventarios-----------*/
        this.app.use('/api/procesos', require('./routes/spArticulosRoutes'));
        this.app.use('/api/mantenimiento', require('./routes/invUniMediRoutes'));
        this.app.use('/api/mantenimiento', require('./routes/invbodvenRoutes'));
        this.app.use('/api/mantenimiento', require('./routes/invtipoempRoutes'));
        this.app.use('/api/mantenimiento', require('./routes/invlocalizacionRoutes'));
        /**--------------------------------------------- */

        /*---------------Api permisos -------------------*/
        this.app.use('/api/utilitarios', require('./routes/utilitariosRoutes'));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
module.exports = server;