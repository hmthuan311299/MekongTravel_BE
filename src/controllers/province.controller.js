const pool = require('../database');
const model = require('../models/province.model');
const {responseProvinceObject, titleCase} = require('../helpers');
const noti_success = 'Kết nối thành công';
const noti_error = 'Đã có lỗi xảy ra';
const getProvince = (req, res) =>{
    pool.query(model.readProvince, (error, result)=>{
        if(error) throw error;
        res.send(responseProvinceObject(200, noti_success, result.rows));
    })
}
const getProvinceById = (req, res) =>{
    var {provinceId} = req.params;
    pool.query(model.readProvinceById, [provinceId], (error, result)=>{
        if(error || result.rowCount == 0){
            res.json(responseProvinceObject(400,"Không tìm thấy tỉnh thành này trong hệ thống", ""));
        }
        else res.send(responseProvinceObject(200, noti_success, result.rows[0]));
    })
}
const addProvince = (req, res)=>{
    var path = req.file.path
    var {provinceTitle, provinceDesc} = req.body;
    var convertProvinceTitle = titleCase(provinceTitle.trim());
    pool.query(model.checkNameProvince, [convertProvinceTitle], (error, result)=>{
        if(error){
            res.send(responseProvinceObject(400, noti_error));
        }
        if(result.rowCount > 0){
            res.send(responseProvinceObject(400, 'Tỉnh thành này đã tồn tại trong hệ thống'));
        }
        else{
            pool.query(model.addProvince, [path, convertProvinceTitle, provinceDesc], (error, result)=>{
                if(error) res.send(responseProvinceObject(400, noti_error));
                res.send(responseProvinceObject(200, noti_success));
            })
            
        }
    })
}
const updateProvince = (req, res)=>{
    var provinceId = req.params.provinceId;
    pool.query(model.checkProvinceByID, [provinceId], (error, result)=>{
        if(error) res.send(responseProvinceObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseProvinceObject(400, "Không tìm thấy Tỉnh Thành này"));
        }
        else{
            var {provinceTitle, provinceDesc} = req.body;
            var convertProvinceTitle = titleCase(provinceTitle.trim());
            pool.query(model.updateProvince, [convertProvinceTitle, provinceDesc, provinceId],(error, result)=>{
                if(error){
                    res.send(responseProvinceObject(400, noti_error));
                }
                res.send(responseProvinceObject(200, "Cập nhật thành công"));
            })
        }
    })
}
const updateProvinceHavePicture = (req, res)=>{
    var path = req.file.path;
    var provinceId = req.params.provinceId;
    pool.query(model.checkProvinceByID, [provinceId], (error, result)=>{
        if(error) res.send(responseProvinceObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseProvinceObject(400, "Không tìm thấy Tỉnh Thành này"));
        }
        else{
            var {provinceTitle, provinceDesc} = req.body;
            var convertProvinceTitle = titleCase(provinceTitle.trim());
            pool.query(model.updateProvinceHavePicture, [path, convertProvinceTitle, provinceDesc, provinceId],(error, result)=>{
                if(error){
                    res.send(responseProvinceObject(400, noti_error));
                }
                res.send(responseProvinceObject(200, "Cập nhật thành công"));
            })
        }
    })
}
const deleteProvince = (req, res)=>{
    var provinceId = req.params.provinceId;
    pool.query(model.checkProvinceByID, [provinceId], (error, result)=>{
        if(error) res.send(responseProvinceObject(400, noti_error));
        if(result.rowCount == 0){
            res.send(responseProvinceObject(400, "Không tìm thấy Tỉnh Thành này"));
        }
        else{
            pool.query(model.deleteProvince, [provinceId],(error, result)=>{
                if(error){
                    res.send(responseProvinceObject(400, noti_error));
                }
                res.send(responseProvinceObject(200, "Xóa thành công"));
            })
        }
    })
}
module.exports = {getProvince, addProvince, updateProvince, deleteProvince, getProvinceById, updateProvinceHavePicture}





