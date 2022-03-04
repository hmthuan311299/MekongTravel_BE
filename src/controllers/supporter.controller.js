const pool = require('../database');
const model = require('../models/supporter.model');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const {responseSupporterObject} = require('../helpers')
const getSupporter = (req, res) =>{
    pool.query(model.readSupporter, (err, result) => {
        if (err) {
            res.json(responseSupporterObject(400,'Truy vấn thất bại'));
        } else {
            res.json(responseSupporterObject(200,'Kết nối thành công', result.rows));
        }
    })
}
const getSupporterById = (req, res) =>{
    var suppId = req.params.suppId;
    pool.query(model.readSupporterById, [suppId], (err, result) => {
        if(err || result.rowCount == 0){
            res.json(responseSupporterObject(400,"Không tìm thấy người này trong hệ thống", ""));
        }
        else 
            res.json(responseSupporterObject(200,'Kết nối thành công', result.rows[0]));
      })
}
const loginSupporter = (req, res) =>{
    var {suppEmail, suppPass} = req.body;
    pool.query(model.readLoginSupporter, [suppEmail, md5(suppPass)], (err, result) => {
        if (err) {
            res.json(responseSupporterObject(400,'Truy vấn thất bại'));
        } 
        if(result.rowCount == 0){
            res.json(responseSupporterObject(400,'Tài khoản hoặc mật khẩu không chính xác'));
        }
        else{
            var data = result.rows[0];
            var dataJWT ={
                suppId: data.suppid,
                suppName: data.suppname,
                iat: data.suppid
            }
            const access_Token = jwt.sign(dataJWT, "DUNG_CHO_AI_BIET_NHA")
            res.json(responseSupporterObject(200,'Đăng nhập thành công', result.rows[0], access_Token));
        }
      })
}
const addSupporter = (req, res, result)=>{
    var {suppEmail, suppPass, suppName, suppAddress, suppGender, suppYearofBirth, suppPhone} = req.body;
    pool.query(model.checkEmailExist, [suppEmail], (err, result)=>{
        if(result.rowCount > 0)
            res.send(responseSupporterObject(400,"Email này đã tồn tại trong hệ thống", ""))
        else{
            pool.query(model.insertSupporter, [suppEmail, md5(suppPass), suppName, suppAddress, suppGender, suppYearofBirth, suppPhone], (error, results)=>{
                if(error) throw error;
                res.send(responseSupporterObject(200,"Đăng ký tài khoản thành công"))
            })
        }
    })
}
const updateSupporter = (req, res, result)=>{
    var suppId = req.params.suppId;
    var {suppName, suppAddress, suppGender, suppYearofBirth, suppPhone} = req.body;
    pool.query(model.readSupporterById, [suppId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.updateInforSupporter, [suppName, suppAddress, suppGender, suppYearofBirth, suppPhone, suppId], (error, result)=>{
                if(error) res.send(responseSupporterObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
                res.send(responseSupporterObject(200,"Cập nhật thông tin thành công"))
            })
        }
        else    
            res.send(responseSupporterObject(400,"Không tìm thấy người này trong hệ thống"))
    })
}

const changePassSupporter = (req, res, result)=>{
    var suppId = req.params.suppId;
    var {memberPass} = req.body;
    pool.query(model.readSupporterById, [suppId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.changePassSupporter, [md5(suppPass), suppId], (error, results)=>{
                res.send(responseSupporterObject(200,"Cập nhật mật khẩu thành công"))
            })
        }
        else    
            res.send(responseSupporterObject(400,"Không tìm thấy người này trong hệ thống"))
    })
}
const deleteSupporter = (req, res, result)=>{
    var suppId = req.params.suppId;
    pool.query(model.readSupporterById, [suppId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.deleteSupporter, [suppId], (error, results)=>{
                res.send(responseSupporterObject(200, "Xóa thành công"));
            })
        }
        else    
            res.send(responseSupporterObject(400,"Không tìm thấy người này trong hệ thống"));
    })
}

module.exports = {loginSupporter, getSupporter, getSupporterById, getSupporterById, addSupporter, updateSupporter, changePassSupporter, deleteSupporter};
