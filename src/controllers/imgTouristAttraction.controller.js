const pool = require('../database');
const model = require('../models/imgTouristAttraction.model');
const {responseIMGTouristObject} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';

const getImageByTourId = (req, res) =>{
    var {tourId} = req.params;
    pool.query(model.readIMGTouristByTourID, [tourId], (error, result)=>{
        if(error) throw error;
        res.send(responseIMGTouristObject(200, noti_success, result.rows));
    })
}
const addImageTA = (req, res)=>{
    var {tourId} = req.body;
    let rowCount = req.files.length;
    for(let i = 0; i < rowCount; i++){
        var path = req.files[i].path;
        var filename = req.files[i].filename;
        pool.query(model.addIMGTourist, [filename, path, tourId])
    }
    res.send(responseIMGTouristObject(200, noti_success));

}
const deleteImageById = (req, res)=>{
    var imageId = req.params.imageId;
    pool.query(model.checkIMGTouristByID, [imageId], (error, result)=>{
        if(error || result.rowCount == 0) res.send(responseTouristObject(400, noti_error));
        else{
            pool.query(model.deleteTouristAtraction, [imageId],(error, result)=>{
                if(error){
                    res.send(responseIMGTouristObject(400, noti_error));
                }
                res.send(responseIMGTouristObject(200, "Xóa thành công"));
            })
        }
    })
}
module.exports = {
    getImageByTourId,
    deleteImageById,
    addImageTA,
}