const pool = require('../database');
const model = require('../models/imgTouristAttraction.model');
const {responseIMGTouristObject} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';

const getImageByTourId = (req, res) =>{
    var {tourId} = req.params;
    if(tourId){
        pool.query(model.readIMGTouristByTourID, [tourId], (error, result)=>{
            if(error) throw error;
            res.send(responseIMGTouristObject(200, noti_success, result.rows));
        })
    }else{
        res.send(responseIMGTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
    
}
const addImageTA = (req, res)=>{
    var {tourId} = req.body;
    console.log(req.files, tourId)
    let rowCount = req.files.length;
    for(let i = 0; i < rowCount; i++){
        var path = req.files[i].path;
        var filename = req.files[i].filename;
        pool.query(model.addIMGTourist, [filename, path, tourId])
    }
    res.send(responseIMGTouristObject(200, noti_success));
}
const deleteImageById = (req, res)=>{
    var {imageId} = req.params;
    console.log(imageId)
    if(imageId){
        pool.query(model.checkIMGTouristByID, [imageId], (error, result)=>{
            console.log(result.rowCount)
            if(result.rowCount<=0) res.send(responseTouristObject(400, "Không tìm thấy địa điểm này"));
            else{
                pool.query(model.deleteImageById, [imageId],()=>{
                    res.send(responseIMGTouristObject(200, "Xóa thành công"));
                })
            }
        })
    }else{
        res.send(responseIMGTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
}
const approval = (req, res)=>{
    var {tourId, tourImages} = req.body;
    console.log(tourImages.length);
    if(tourId && tourImages && tourImages.length){
        let rowCount = tourImages.length;
        for(let i = 0; i < rowCount; i++){
            var path = tourImages[i].reimagepath;
            var filename = tourImages[i].reimagename;
            pool.query(model.addIMGTourist, [filename, path, tourId])
        }
        res.send(responseIMGTouristObject(200, noti_success));
    }else{
        res.send(responseIMGTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
    
}
module.exports = {
    getImageByTourId,
    deleteImageById,
    addImageTA,
    approval
}