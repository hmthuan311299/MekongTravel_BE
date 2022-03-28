const pool = require('../database');
const model = require('../models/view.model');
const {responseTouristObject} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';
const countView = (req, res)=>{
    var {tourId, createAt} = req.body
    console.log(tourId, createAt)
    if(tourId && createAt){
        pool.query(model.checkTouristByID, [tourId], (error, result)=>{
            if(result.rowCount == 0){
                res.send(responseTouristObject(400, 'Địa điểm này không tồn tại trong hệ thống'));
            }
            else{
                console.log('aa')
                pool.query(model.countview, [createAt, tourId], (error, result)=>{
                    if(error) res.send(responseTouristObject(400, noti_error));
                    else res.send(responseTouristObject(200, "Thêm thành công"));
                })
            }
        })
    }else{
        res.send(responseSupporterObject(400,"Tham số truyền vào chưa hợp lệ"))
    }
}
module.exports = {
    countView
}