const pool = require('../database');
const model = require('../models/savetouristAttraction.model');
const {responseSaveTAObject} = require('../helpers')

const getSaveTA = (req, res) =>{
    var {memberId} = req.query;
    if(memberId){
        pool.query(model.readSaveTouristAttraction, [memberId], (err, result) => {
            if (err){
                res.json(responseSaveTAObject(400,'Truy vấn thất bại'));
            }
            else{
                res.json(responseSaveTAObject(200,'Kết nối thành công', result.rows));
            }
        })
    }
    else{
        res.json(responseSaveTAObject(400,'Truy vấn thất bại'));
    }
}
const addSaveTA = (req, res, result)=>{
    var {memberId, tourId, createAt} = req.body;
    if(memberId, tourId){
        pool.query(model.checkSaveTouristAttraction, [memberId, tourId], (error, result)=>{
            if(result.rowCount >0){
                res.send(responseSaveTAObject(400,"Bạn đã lưu địa điểm này"));
            }
            else{
                pool.query(model.insertSaveTouristAttraction, [memberId, tourId, createAt], (error, results)=>{
                    if(error) res.send(responseSaveTAObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
                    else res.send(responseSaveTAObject(200,"Lưu thành công"))
                })
            }
        })
    }
    else{
        res.send(responseSaveTAObject(400,"Giá trị truyền lên chưa đúng"));
    }
}
const checkSaveTA = (req, res, result)=>{
    var {memberId, tourId} = req.body;
    if(memberId, tourId){
        pool.query(model.checkSaveTouristAttraction, [memberId, tourId], (error, results)=>{
            if(error) res.send(responseSaveTAObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            if(result.rowCount>0){
                res.send(responseSaveTAObject(400,"Bạn đã lưu địa điểm này", "false"))
            }
            else{res.send(responseSaveTAObject(200,"Bạn chưa lưu địa điểm này", "true"))}
        })
    }else{
        res.send(responseSaveTAObject(400,"Giá trị truyền lên chưa đúng"));
    }
}
const deleteSaveTA = (req, res, result)=>{
    var {memberId, tourId} = req.body;
    if(memberId, tourId){
        pool.query(model.deleteSaveTouristAttraction, [memberId, tourId], (error, results)=>{
            if(error) res.send(responseSaveTAObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            res.send(responseSaveTAObject(200,"Xóa thành công"))
        })
    }else{
        res.send(responseSaveTAObject(400,"Giá trị truyền lên chưa đúng"));
    }
}
module.exports = 
{
    getSaveTA,
    addSaveTA,
    deleteSaveTA,
    checkSaveTA
};
