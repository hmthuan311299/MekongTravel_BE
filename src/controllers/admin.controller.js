const pool = require('../database');
const model = require('../models/admin.model');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const {responseAdminObject} = require('../helpers')

const showAdmin = (req, res) =>{
    pool.query(model.readAdmin, (err, result) => {
        if(err || result.rowCount == 0){
            res.json(responseAdminObject(400,"Không tìm thấy người này trong hệ thống", ""));
        }
        else 
            res.json(responseAdminObject(200,'Kết nối thành công', result.rows[0]));
      })
}
const loginAdmin = (req, res) =>{
    var {adminAccount, adminPass} = req.body;
    pool.query(model.readLoginAdmin, [adminAccount, md5(adminPass)], (err, result) => {
        if (err) {
            res.json(responseAdminObject(400,'Truy vấn thất bại'));
        } 
        if(result.rowCount === 0){
            res.json(responseAdminObject(400,'Tài khoản hoặc mật khẩu không chính xác'));
        }
        else{
            var data = result.rows[0];
            var dataJWT ={
                adminAccount: data.adminaccount,
                adminName: data.adminname,
                iat: 999
            }
            const access_Token = jwt.sign(dataJWT, "DUNG_CHO_AI_BIET_NHA")
            res.json(responseAdminObject(200,'Đăng nhập thành công', result.rows[0], access_Token));
        }
      })
}
const updateAdmin = (req, res)=>{
    var {adminEmail, adminName, adminAddress} = req.body;
    pool.query(model.updateAdmin, [adminEmail, adminName, adminAddress], ()=>{
        res.send(responseAdminObject(200,"Cập nhật thông tin thành công"))
    })
}

const changePassAdmin = (req, res)=>{
    var {adminPass} = req.body;
    pool.query(model.changePassAdmin, [md5(adminPass)], ()=>{
        res.send(responseAdminObject(200,"Cập nhật mật khẩu thành công"))
    })
}

module.exports = {showAdmin, loginAdmin, updateAdmin, changePassAdmin};
