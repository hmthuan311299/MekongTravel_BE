const pool = require('../database');
const model = require('../models/savetouristAttraction.model');
const {responseSaveTAObject} = require('../helpers')

const getSaveTA = (req, res) =>{
    var {tourId} = req.query;
    pool.query(model.readSaveTouristAttraction, [tourId], (err, result) => {
        if (err){
            res.json(responseSaveTAObject(400,'Truy vấn thất bại'));
        }
        else{
            res.json(responseSaveTAObject(200,'Kết nối thành công', result.rows));
        }
    })
}
const addSaveTA = (req, res, result)=>{
    var {memberId, tourId, createAt} = req.body;
    pool.query(model.insertSaveTouristAttraction, [memberId, tourId, createAt], (error, results)=>{
        if(error) res.send(responseSaveTAObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
        else res.send(responseSaveTAObject(200,"Lưu thành công"))
    })
}
const deleteSaveTA = (req, res, result)=>{
    var {memberId, tourId} = req.body;
    console.log(memberId, tourId)
    pool.query(model.deleteSaveTouristAttraction, [memberId, tourId], (error, results)=>{
        if(error) res.send(responseSaveTAObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
        res.send(responseSaveTAObject(200,"Xóa thành công"))
    })
}
module.exports = 
{
    getSaveTA,
    addSaveTA,
    deleteSaveTA,
};
