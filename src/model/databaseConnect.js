const mysql = require('mysql');

class DatabaseConnect{
    constructor() {
        this.host = 'localhost';
        this.port = 3306;
        this.user = 'huydo';
        this.password = 'Huydothe1999@'
        this.database = 'Demo'
    }
    connect(){
        return mysql.createConnection({
            host:this.host,
            port:this.port,
            user: this.user,
            password:this.password,
            database:this.database
        })
    }
}

module.exports = DatabaseConnect;