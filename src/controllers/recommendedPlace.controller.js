const pool = require('../database');
const model = require('../models/recomendedPlace.model');
const {responseTouristObject, titleCase, remove_vietnamese_accents} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';
const getAllRecomendedPlace = (req, res) =>{
    pool.query(model.readAllRecommendedPlace, (error, result)=>{
        if(error) throw error;
        res.send(responseTouristObject(200, noti_success, result.rows));
    })
}
const getRecomendedPlaceById = (req, res) =>{
    var {recommendId} = req.params;
    // console.log(recommendId)
    if(recommendId){
        pool.query(model.checkRecommendedPlaceByID, [recommendId], (error, result)=>{
            if(error || result.rowCount == 0){
                res.send(responseTouristObject(200, "Không tìm thấy địa điểm này trong hệ thống"));
            }
            else res.send(responseTouristObject(200, noti_success, result.rows[0]));
        })
    }
    else{
        res.send(responseTouristObject(200, noti_error));
    }
}
const addRecomendedPlace = (req, res)=>{
    var path = req.file.path;
    var {recommendID, recommendTitle, recommendDesc, recommendAddress, recommendMap, recommendLinkVideo, provinceId, memberId} = req.body;
    if(recommendID && path && recommendTitle && tourId && recommendDesc && recommendAddress && recommendMap && provinceId && memberId){
        var convertTourTitle = titleCase(recommendTitle.trim());
        pool.query(model.addRecommendedPlace, [recommendID, convertTourTitle, path, recommendDesc, recommendAddress, recommendMap, recommendLinkVideo, provinceId, memberId], (error, result)=>{
            if(error) res.send(responseTouristObject(400, noti_error));
            res.send(responseTouristObject(200, "Thêm thành công"));
        })
    }
    else{
        res.send(responseTouristObject(200, noti_error));
    }
}
const deleteRecomendedPlace = (req, res)=>{
    var recommedId = req.params.recommedId;
    if(recommedId){
        pool.query(model.deleteRecommendedPlace, [recommedId], (error, result)=>{
            if(error) res.send(responseTouristObject(400, noti_error));
            if(result.rowCount == 0){
                res.send(responseTouristObject(400, "Không tìm địa điểm này"));
            }
            else{
                pool.query(model.deleteTouristAtraction, [tourId],(error, result)=>{
                    if(error){
                        res.send(responseTouristObject(400, noti_error));
                    }
                    res.send(responseTouristObject(200, "Xóa thành công"));
                })
            }
        })
    }
    else{
        res.send(responseTouristObject(200, noti_error));
    }
}
module.exports = {
    getAllRecomendedPlace,
    getRecomendedPlaceById,
    addRecomendedPlace,
    deleteRecomendedPlace 
}