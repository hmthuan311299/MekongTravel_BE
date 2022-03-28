const pool = require('../database');
const model = require('../models/recomendedPlace.model.js');
const {responseRecommendedObject, titleCase, remove_vietnamese_accents} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';

const getAllRecomendedPlace = (req, res) =>{
    pool.query(model.readAllRecommendedPlace, (error, result)=>{
        if(error) throw error;
        res.send(responseRecommendedObject(200, noti_success, result.rows));
    })
}
const getUnapprovedList = (req, res) =>{
    pool.query(model.readUnapprovedList, (error, result)=>{
        if(error) res.send(responseRecommendedObject(400, noti_error));
        else res.send(responseRecommendedObject(200, noti_success, result.rows));
    })
}
const getUnapprovedListByMemberId = (req, res) =>{
    var {memberId} = req.query;
    console.log(memberId)
    if(memberId){
        pool.query(model.readUnapprovedListByMemberId, [memberId], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            else res.send(responseRecommendedObject(200, noti_success, result.rows));
        })
    }
    else{
        res.send(responseRecommendedObject(400, noti_error));
    }
}
const getApprovedListByMemberId = (req, res) =>{
    var {memberId} = req.query;
    if(memberId){
        pool.query(model.readApprovedListByMemberId, [memberId], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            else res.send(responseRecommendedObject(200, noti_success, result.rows));
        })
    }
    else{
        res.send(responseRecommendedObject(400, noti_error));
    }
}
const getRecomendedPlaceById = (req, res) =>{
    var {recommendId} = req.params;
    // console.log(recommendId)
    if(recommendId){
        pool.query(model.readRecommendedPlaceById, [recommendId], (error, result)=>{
            if(error || result.rowCount == 0){
                res.send(responseRecommendedObject(200, "Không tìm thấy địa điểm này trong hệ thống"));
            }
            else res.send(responseRecommendedObject(200, noti_success, result.rows[0]));
        })
    }
    else{
        res.send(responseRecommendedObject(400, noti_error));
    }
}
const addRecommendedPlace = (req, res)=>{
    var path = req.file.path;
    console.log(req.file);
    var {recommendId, recommendTitle, recommendDesc, recommendAddress, recommendLinkMap, recommendLinkVideo, provinceId, memberId} = req.body;
    console.log(recommendId, recommendTitle, recommendDesc, recommendAddress, recommendLinkMap, recommendLinkVideo, provinceId, memberId)
    if(recommendId && path && recommendTitle && recommendDesc && recommendAddress && recommendLinkMap && provinceId && memberId){
        var convertTourTitle = titleCase(recommendTitle.trim());
        pool.query(model.addRecommendedPlace, [recommendId, convertTourTitle, path, recommendDesc, recommendAddress, recommendLinkMap, recommendLinkVideo, provinceId, memberId], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            res.send(responseRecommendedObject(200, "Thêm thành công"));
        })
    }
    else{
        res.send(responseTouristObject(400, noti_error));
    }
}
const deleteRecomendedPlace = (req, res)=>{
    var recommedId = req.params.recommedId;
    if(recommedId){
        pool.query(model.checkRecommendedPlaceByID, [recommedId], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            if(result.rowCount == 0){
                res.send(responseRecommendedObject(400, "Không tìm địa điểm này"));
            }
            else{
                pool.query(model.deleteRecommendedPlace, [recommedId],(error, result)=>{
                    if(error){
                        res.send(responseRecommendedObject(400, noti_error));
                    }
                    res.send(responseRecommendedObject(200, "Xóa thành công"));
                })
            }
        })
    }
    else{
        res.send(responseRecommendedObject(400, "Tham số truyền vào chưa đúng"));
    }
}
const updateStatusRecommended= (req, res)=>{
    var id = req.params.id;
    var {recommendTitle, recommendDesc, recommendAddress, provinceId} = req.body;
    console.log(id, recommendTitle, recommendDesc, recommendAddress, provinceId)
    if(id && recommendTitle && recommendDesc && recommendAddress && provinceId){
        var convertTourTitle = titleCase(recommendTitle.trim());
        pool.query(model.updateStatusRecommended, [convertTourTitle, recommendDesc, recommendAddress, provinceId,'Đã phê duyệt', id], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            else res.send(responseRecommendedObject(200, "Cập nhật thành công"));
        })
    }
    else{
        res.send(responseRecommendedObject(400, noti_error));
    }
}
const updateStatusRecommendedHavePicture= (req, res)=>{
    var path = req.file.path;
    var id = req.params.id;
    var {recommendTitle, recommendDesc, recommendAddress, provinceId} = req.body;
    console.log(id, recommendTitle, recommendDesc, recommendAddress)
    if(id && recommendTitle && recommendDesc && recommendAddress && provinceId){
        var convertTourTitle = titleCase(recommendTitle.trim());
        pool.query(model.updateStatusRecommendedHavePicture, [convertTourTitle, recommendDesc, recommendAddress, provinceId, path,'Đã phê duyệt', id], (error, result)=>{
            if(error) res.send(responseRecommendedObject(400, noti_error));
            else res.send(responseRecommendedObject(200, "Cập nhật thành công"));
        })
    }
    else{
        res.send(responseTouristObject(400, noti_error));
    }
}
module.exports = {
    getAllRecomendedPlace,
    getRecomendedPlaceById,
    addRecommendedPlace,
    deleteRecomendedPlace,
    getUnapprovedList,
    getUnapprovedListByMemberId,
    getApprovedListByMemberId,
    updateStatusRecommended,
    updateStatusRecommendedHavePicture
}