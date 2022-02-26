const pool = require('../database');
const model = require('../models/member.model');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
const {responseMemberObject} = require('../helpers')
const getMember = (req, res) =>{
    console.log(md5('1234'))
    var currPage = (parseInt(req.query.currPage)*10) || 0;
    pool.query(model.readMember, [currPage], (err, result) => {
        if (err) {
            res.json(responseMemberObject(400,'Truy vấn thất bại'));
        } else {
            res.json(responseMemberObject(200,'Kết nối thành công', result.rows));
        }
      })
}
const getMemberById = (req, res) =>{
    var memberId = req.params.memberId;
    pool.query(model.readMemberById, [memberId], (err, result) => {
        if(err || result.rowCount == 0){
            res.json(responseMemberObject(400,"Không tìm thấy người này trong hệ thống", ""));
        }
        else 
            res.json(responseMemberObject(200,'Kết nối thành công', result.rows[0]));
      })
}
const loginMember = (req, res) =>{
    var {memberEmail, memberPass} = req.body;
    pool.query(model.readLoginMember, [memberEmail, md5(memberPass)], (err, result) => {
        if (err) {
            res.json(responseMemberObject(400,'Truy vấn thất bại'));
        } 
        if(result.rowCount < 0){
            res.json(responseMemberObject(400,'Tài khoản hoặc mật khẩu không chính xác'));
        }
        else{
            var data = result.rows[0];
            var {memberid, membername} = data;
            var dataJWT ={
                memberid,
                membername
            }
            const access_Token = jwt.sign(dataJWT, "DUNG_CHO_AI_BIET_NHA")
            res.json(responseMemberObject(200,'Đăng nhập thành công', result.rows[0], access_Token));
        }
      })
}
const addMember = (req, res, result)=>{
    var {memberEmail, memberPass, memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone} = req.body;
    pool.query(model.checkEmailExist, [memberEmail], (err, result)=>{
        if(result.rowCount > 0)
            res.send(responseMemberObject(400,"Email này đã tồn tại trong hệ thống", ""))
        else{
            pool.query(model.insertMember, [memberEmail, md5(memberPass), memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone], (error, results)=>{
                if(error) throw error;
                res.send(responseMemberObject(200,"Đăng ký tài khoản thành công"))
            })
        }
    })
}
const updateMember = (req, res, result)=>{
    var memberId = req.params.memberId;
    var {memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone} = req.body;
    pool.query(model.readMemberById, [memberId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.updateInforMember, [memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone, memberId], (error, results)=>{
                res.send(responseMemberObject(200,"Cập nhật thông tin thành công"))
            })
        }
        else    
            res.send(responseMemberObject(400,"Không tìm thấy người này trong hệ thống"))
    })
}
const uploadAvatar = (req, res, result)=>{
    var memberId = req.params.memberId;
    console.log(req.file);
    console.log(req.body)
    const {productName} = req.body;
    const {filename, path, size} = req.file
    pool.query(model.uploadAvatarMember, [path, memberId], (err, result)=>{
        if(err){
            res.send(responseMemberObject(400,"Đổi ảnh đại diện thất bại"))
        }
        else
            res.send(responseMemberObject(200,"Đổi ảnh đại diện thành công"))
    })
}
const changePassMember = (req, res, result)=>{
    var memberId = req.params.memberId;
    var {memberPass} = req.body;
    pool.query(model.readMemberById, [memberId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.changePassMember, [md5(memberPass), memberId], (error, results)=>{
                res.send(responseMemberObject(200,"Cập nhật mật khẩu thành công"))
            })
        }
        else    
            res.send(responseMemberObject(400,"Không tìm thấy người này trong hệ thống"))
    })
}
const deleteMember = (req, res, result)=>{
    var memberId = req.params.memberId;
    pool.query(model.readMemberById, [memberId], (err, result)=>{
        if(result.rowCount > 0){
            pool.query(model.deleteMember, [memberId], (error, results)=>{
                res.send(responseMemberObject(200, "Xóa thành công"));
            })
        }
        else    
            res.send(responseMemberObject(400,"Không tìm thấy người này trong hệ thống"));
    })
}

module.exports = {getMember, loginMember, getMemberById, addMember, updateMember, changePassMember, deleteMember, uploadAvatar};
