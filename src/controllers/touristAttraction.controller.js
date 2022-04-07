const pool = require('../database');
const model = require('../models/touristAttraction.model');
const {responseTouristObject, titleCase, remove_vietnamese_accents} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';
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
    if(tourId){
        pool.query(model.readTouristAttractionById, [tourId], (error, result)=>{
            if(error){
                res.send(responseTouristObject(400, noti_error));
            }
            if(res.rowCount == 0){
                res.send(responseTouristObject(200, "Địa điểm này không tồn tại trong hệ thống", []));
            }
            else 
                res.send(responseTouristObject(200, "Truy vấn thành công", result.rows[0]));
        })
    }else{
        res.send(responseTouristObject(400, noti_error));
    }
}
const getTouristAttactionBySearch = (req, res) =>{
    var {valueSearch} = req.query;
    var valueSearch2 = remove_vietnamese_accents(valueSearch);
    //var searchTouristAttraction = `Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE '%${valueSearch}%'`
    pool.query(model.searchTouristAttraction, [`%${valueSearch}%`,`%${valueSearch}%`], (error, result)=>{
        if(error || result.rowCount == 0){
            res.send(responseTouristObject(200, "Không tìm thấy địa điểm này trong hệ thống"));
        }
        else res.send(responseTouristObject(200, noti_success, result.rows));
    })
}
const addTouristAttaction = (req, res)=>{
    var path = req.file.path;
    var {tourId, tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId} = req.body;
    if(tourId && tourTitle && tourDesc && tourAddress && tourLinkMap && provinceId){
        var convertTourTitle = titleCase(tourTitle.trim());
        pool.query(model.checkNameTourist, [convertTourTitle], (error, result)=>{
            if(error){
                res.send(responseTouristObject(400, noti_error));
            }
            if(result.rowCount > 0){
                res.send(responseTouristObject(400, 'Tỉnh thành này đã tồn tại trong hệ thống'));
            }
            else{
                pool.query(model.addTouristAttraction, [tourId, tourTitle, path, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId], (error, result)=>{
                    if(error) res.send(responseTouristObject(400, noti_error));
                    else res.send(responseTouristObject(200, "Thêm thành công"));
                })
                
            }
        })
    }else{
        res.send(responseTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
}
const approvalTA = (req, res)=>{
    var {tourId, path, tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId} = req.body;
    console.log({tourId, path, tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId})
    var convertTourTitle = titleCase(tourTitle.trim());
    pool.query(model.checkNameTourist, [convertTourTitle], (error, result)=>{
        if(error){
            res.send(responseTouristObject(400, noti_error));
        }
        if(result.rowCount > 0){
            res.send(responseTouristObject(400, 'Tỉnh thành này đã tồn tại trong hệ thống'));
        }
        else{
            pool.query(model.addTouristAttraction, [tourId, tourTitle, path, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId], (error, result)=>{
                if(error) res.send(responseTouristObject(400, noti_error));
                res.send(responseTouristObject(200, "Thêm thành công"));
            })
            
        }
    })
}
const updateTouristAttaction = (req, res)=>{
    var tourId = req.params.tourId;
    var {tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId} = req.body;
    if(tourId && tourTitle && tourDesc && tourAddress && tourLinkMap && provinceId){
        pool.query(model.checkTouristByID, [tourId], (error, result)=>{
            if(error) res.send(responseTouristObject(400, noti_error));
            if(result.rowCount == 0){
                res.send(responseTouristObject(400, "Không tìm thấy địa điểm này"));
            }
            else{ 
                //var {tourTitle, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId} = req.body;
                console.log(req.body)
                var convertTourTitle = titleCase(tourTitle.trim());
                pool.query(model.updateTouristAtraction, [convertTourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId, tourId],(error, result)=>{
                    if(error){
                        res.send(responseTouristObject(400, noti_error));
                    }
                    res.send(responseTouristObject(200, "Cập nhật thành công"));
                })
            }
        })
    }else{
        res.send(responseTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
}
const updateTouristAttactionHavePicture = (req, res)=>{
    var path = req.file.path;
    console.log(path)
    var tourId = req.params.tourId;
    var {tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId} = req.body;
    console.log(tourId, tourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId)
    if(tourId && tourTitle && tourDesc && tourAddress && tourLinkMap && provinceId){
        pool.query(model.checkTouristByID, [tourId], (error, result)=>{
            if(error) res.send(responseTouristObject(400, noti_error));
            if(result.rowCount == 0){
                res.send(responseTouristObject(400, "Không tìm thấy Tỉnh Thành này"));
            }
            else{
                var convertTourTitle = titleCase(tourTitle.trim());
                pool.query(model.updateTouristAtractionHavePicture, [convertTourTitle, tourDesc, tourAddress, tourLinkMap, tourLinkVideo, provinceId, path, tourId],(error, result)=>{
                    if(error){
                        res.send(responseTouristObject(400, noti_error));
                    }
                    else res.send(responseTouristObject(200, "Cập nhật thành công"));
                })
            }
        })
    }else{
        res.send(responseTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
    
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
const rankTAByProvince = (req, res) =>{
    var {provinceId} = req.params;
    console.log(provinceId)
    if(provinceId){
        pool.query(model.rankTAByProvince, [provinceId], (error, result)=>{
            res.send(responseTouristObject(200, noti_success, result.rows));
        })
    }else{
        res.send(responseTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
}
const suggestionTAByProvince = (req, res) =>{
    var {provinceId} = req.params;
    if(provinceId){
        pool.query(model.suggestionTAByProvince, [provinceId], (error, result)=>{
            res.send(responseTouristObject(200, noti_success, result.rows));
        })
    }else{
        res.send(responseTouristObject(400, "Tham số truyền vào chưa đúng"));
    }
}
module.exports = {
    getAllTouristAttaction,
    getTouristAttactionByProvinceId,
    addTouristAttaction,
    updateTouristAttaction,
    updateTouristAttactionHavePicture,
    deleteTouristAttaction,
    getTouristAttactionById,
    getTouristAttactionBySearch,
    approvalTA,
    rankTAByProvince,
    suggestionTAByProvince
}