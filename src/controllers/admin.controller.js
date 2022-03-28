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
    var {adminEmail, adminName} = req.body;
    if(adminEmail, adminName){
        pool.query(model.updateAdmin, [adminEmail, adminName], ()=>{
            res.send(responseAdminObject(200,"Cập nhật thông tin thành công"))
        })
    }else{
        res.send(responseAdminObject(400,"Tham số truyền vào chưa đúng"))
    }
   
}
const changePassAdmin = (req, res)=>{
    var {oldPass, newPass} = req.body;
    if(oldPass, newPass){
        pool.query(model.checkPassword, [md5(oldPass)], (err, result)=>{
            if(result.rowCount > 0){
                pool.query(model.changePassword, [md5(newPass)], (err, result)=>{
                    if(result.rowCount > 0){
                        res.send(responseAdminObject(200,"Thay đổi mật khẩu thành công"))
                    }
                    else res.send(responseAdminObject(400,"Đã có lỗi xảy ra"))
                })
            }
            else res.send(responseAdminObject(400,"Mật khẩu cũ chưa đúng"))
        })
    }else{
        res.send(responseAdminObject(400,"Tham số truyền vào chưa đúng"))
    }
}

module.exports = {showAdmin, loginAdmin, updateAdmin, changePassAdmin};
