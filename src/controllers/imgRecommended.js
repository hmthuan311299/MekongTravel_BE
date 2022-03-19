const pool = require('../database');
const model = require('../models/imgRecommended.model.js');
const {responseIMGTouristObject} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';

const getImageByRecommendId = (req, res) =>{
    var {recommendId} = req.params;
    pool.query(model.readRecommendImageByID, [recommendId], (error, result)=>{
        if(error) throw error;
        res.send(responseIMGTouristObject(200, noti_success, result.rows));
    })
}
const addImageRecommended = (req, res)=>{
    var {recommendId} = req.body;
    console.log(recommendId)
    console.log(req.files)
    let rowCount = req.files.length;
    for(let i = 0; i < rowCount; i++){
        var path = req.files[i].path;
        var filename = req.files[i].filename;
        pool.query(model.addRecommendImage, [filename, path, recommendId])
    }
    res.send(responseIMGTouristObject(200, noti_success));

}
const deleteById = (req, res)=>{
    var reImageID  = req.params.reImageID ;
    pool.query(model.checkRecommendImageByID, [reImageID], (error, result)=>{
        if(error || result.rowCount == 0) res.send(responseTouristObject(400, noti_error));
        else{
            pool.query(model.deleteRecommendImageByID, [reImageID],(error, result)=>{
                if(error){
                    res.send(responseIMGTouristObject(400, noti_error));
                }
                res.send(responseIMGTouristObject(200, "Xóa thành công"));
            })
        }
    })
}
module.exports = {
    getImageByRecommendId,
    addImageRecommended,
    deleteById,
}