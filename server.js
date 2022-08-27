const http = require('http');
const fs = require('fs');
const url = require('url')
const CustomerController = require('./src/controller/customer.controller');
const customerController = new CustomerController();
const port = 8080;

const server = http.createServer((req, res)=>{
    let urlParse = url.parse(req.url);
    let pathUrl = urlParse.pathname
    switch (pathUrl) {
        case '/':
            customerController.showList(req,res).catch(err=>console.log(err.message));
            break;
    }
})

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
