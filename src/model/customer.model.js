const DatabaseConnect = require('./databaseConnect');

class CustomerModel {
    constructor() {
        let database = new DatabaseConnect();
        this.conn = database.connect();
    }

    querySQL(sql){
        return new Promise((resolve, reject)=>{
            this.conn.query(sql,(err,results)=>{
                if(err){
                    reject(err);
                }
                resolve(results);
            })
        })
    }
    async getCustomer(){
        const sql = `select customerName, phone from customers`;
        return await this.querySQL(sql);
    }
}

module.exports = CustomerModel;