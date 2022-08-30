const BaseModel = require('./base.model');

class UserModel extends BaseModel{
    async findUserLogin(data){
        const sql = `select * from users where username = "${data.username}" and passwords = "${data.password}"`;
        return await this.querySQL(sql);
    }
    async addUser(data){
        const sql = `insert into users(username,passwords) value("${data.username}","${data.password}")`;
        return await this.querySQL(sql);
    }
    async showUser(){
        const sql = `select * from users`;
        return await this.querySQL(sql);
    }
}

module.exports = UserModel