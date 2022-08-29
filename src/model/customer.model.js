const DatabaseConnect = require('./databaseConnect');
const BaseModel = require("./base.model");

class CustomerModel extends BaseModel {

    async getCustomer(){
        const sql = `select customerName, phone from customers`;
        return await this.querySQL(sql);
    }
}

module.exports = CustomerModel;