const fs = require('fs');
const qs = require('qs');
const url = require('url');
const CustomerModel = require('../model/customer.model');

class CustomerController{

    constructor() {
        this.customerModel = new CustomerModel();
    }

    async showList(req,res){
        let customers = await this.customerModel.getCustomer();
        fs.readFile('./templates/homePage.html','utf8',(err,data)=>{
            if(err){
                throw new Error(err.message)
            }
            let html='';
            customers.forEach((value,index)=>{
                html+=`<tr>`;
                html+=`<td>${index+1}</td>`;
                html+=`<td>${value.customerName}</td>`;
                html+=`<td>${value.phone}</td>`;
                html+=`</tr>`;
            })
            data=data.replace('{list-customer}',html);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    }
}

module.exports=CustomerController;