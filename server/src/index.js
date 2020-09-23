const server = require('./app');
const db = require('./config/database');

function main() {
    server.start();
}

main();