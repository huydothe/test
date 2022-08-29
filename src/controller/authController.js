const fs = require('fs')
const BaseModel = require('../model/base.model');
const qs = require("qs");
const UserModel = require('../model/user.model');
const cookie = require('cookie');
let userModel = new UserModel();

class AuthController extends BaseModel {
    showFormLogin(req, res) {
        let cookieUserLogin = {
            'username': '',
            'password': ''
        }
        if (req.headers.cookie) {
            let cookies = cookie.parse(req.headers.cookie);
            if (cookies && cookies.username) {
                cookieUserLogin = JSON.parse(cookies.username);
                fs.readFile('./login-form-20/index.html', 'utf8', (err, data) => {
                    if (err) {
                        throw new Error(err.message)
                    }
                    data = data.replace('{usernames}', cookieUserLogin.username);
                    data = data.replace('{passwords}', cookieUserLogin.password);
                    res.write(data);
                    res.end();
                })
            }
        } else {
            fs.readFile('./login-form-20/index.html', 'utf8', (err, data) => {
                if (err) {
                    throw new Error(err.message)
                }
                data = data.replace('{usernames}', cookieUserLogin.username);
                data = data.replace('{passwords}', cookieUserLogin.password);
                res.write(data);
                res.end();
            })
        }
    }

    login(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            let dataForm = qs.parse(data);
            let isValidAccount = await userModel.findUserLogin(dataForm);

            const setCookie = cookie.serialize('username', JSON.stringify(dataForm));
            res.setHeader('Set-Cookie', setCookie);


            if (isValidAccount.length > 0) {
                res.writeHead(301, {location: '/'});
                return res.end();
            } else {
                res.writeHead(301, {location: '/login'});
                return res.end();
            }
        })
    }
}

module.exports = AuthController;