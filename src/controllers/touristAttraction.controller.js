const pool = require('../database');
const model = require('../models/touristAttraction.model');
const {responseTouristObject, titleCase, remove_vietnamese_accents} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';
var appRoot = require('app-root-path');
const getAllTouristAttaction = (req, res) =>{
    pool.query(model.readAllTouristAttraction, (error, result)=>{
        if(error) throw error;
        res.send(responseTouristObject(200, noti_success, result.rows));
    })
}
const getTouristAttactionByProvinceId = (req, res) =>{
    var {provinceId} = req.params;
    if(provinceId){
        pool.query(model.readTouristAttractionByProvince, [provinceId], (error, result)=>{
            if(error){
                res.send(responseTouristObject(400, noti_error));
            }
            else 
                res.send(responseTouristObject(200, "Truy vấn thành công", result.rows));
        })
    }else{
        res.send(responseTouristObject(400, noti_error));
    }
}
const getTouristAttactionById = (req, res) =>{
    var {tourId} = req.params;
    pool.query(model.readTouristAttractionById, [tourId], (error, result)=>{
        if(error){
            res.send(responseTouristObject(400, noti_error));
        }
        if(rowCount == 0){
            res.send(responseTouristObject(200, "Địa điểm này không tồn tại trong hệ thống", []));
        }
        else 
            res.send(responseTouristObject(200, "Truy vấn thành công", result.rows[0]));
    })
}
const getTouristAttactionBySearch = (req, res) =>{
    var {valueSearch} = req.query;
    var valueSearch2 = remove_vietnamese_accents(valueSearch);
    console.log(valueSearch2)
    //var searchTouristAttraction = `Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE '%${valueSearch}%'`
    pool.query(model.searchTouristAttraction, [`%${valueSearch}%`,`%${valueSearch2}%`, `%${valueSearch}%`,`%${valueSearch2}%`], (error, result)=>{
        if(error || result.rowCount == 0){
            res.send(responseTouristObject(200, "Không tìm thấy địa điểm này trong hệ thống"));
        }
        else res.send(responseTouristObject(200, noti_success, result.rows));
    })
}
const addTouristAttaction = (req, res)=>{
    var p = req.file.path
    var path = req.file.path;
    console.log(path)
    var {tourId, tourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId} = req.body;
    var convertTourTitle = titleCase(tourTitle.trim());
    pool.query(model.checkNameTourist, [convertTourTitle], (error, result)=>{
        if(error){
            res.send(responseTouristObject(400, noti_error));
        }
        if(result.rowCount > 0){
            res.send(responseTouristObject(400, 'Tỉnh thành này đã tồn tại trong hệ thống'));
        }
        else{
            pool.query(model.addTouristAttraction, [tourId, tourTitle, path, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId], (error, result)=>{
                if(error) res.send(responseTouristObject(400, noti_error));
                res.send(responseTouristObject(200, "Thêm thành công"));
            })
            
        }
    })
}
const updateTouristAttaction = (req, res)=>{
    var tourId = req.params.tourId;
    pool.query(model.checkTouristByID, [tourId], (error, result)=>{
        if(error) res.send(responseTouristObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseTouristObject(400, "Không tìm thấy Tỉnh Thành này"));
        }
        else{ 
            var {tourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId} = req.body;
            console.log(req.body)
            var convertTourTitle = titleCase(tourTitle.trim());
            pool.query(model.updateTouristAtraction, [convertTourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId, tourId],(error, result)=>{
                if(error){
                    res.send(responseTouristObject(400, noti_error));
                }
                res.send(responseTouristObject(200, "Cập nhật thành công"));
            })
        }
    })
}
const updateTouristAttactionHavePicture = (req, res)=>{
    var path = appRoot+ req.file.path;
    console.log(path)
    var tourId = req.params.tourId;
    pool.query(model.checkTouristByID, [tourId], (error, result)=>{
        if(error) res.send(responseTouristObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseTouristObject(400, "Không tìm thấy Tỉnh Thành này"));
        }
        else{
            var {tourId, tourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId} = req.body;
            var convertTourTitle = titleCase(tourTitle.trim());
            pool.query(model.updateTouristAtractionHavePicture, [convertTourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId, path, tourId],(error, result)=>{
                if(error){
                    res.send(responseTouristObject(400, noti_error));
                }
                res.send(responseTouristObject(200, "Cập nhật thành công"));
            })
        }
    })
}
const deleteTouristAttaction = (req, res)=>{
    var tourId = req.params.tourId;
    pool.query(model.checkTouristByID, [tourId], (error, result)=>{
        if(error) res.send(responseTouristObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseTouristObject(400, "Không tìm thấy Tỉnh Thành này"));
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
module.exports = {
    getAllTouristAttaction,
    getTouristAttactionByProvinceId,
    addTouristAttaction,
    updateTouristAttaction,
    updateTouristAttactionHavePicture,
    deleteTouristAttaction,
    getTouristAttactionById,
    getTouristAttactionBySearch
}