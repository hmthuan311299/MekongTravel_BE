const pool = require('../database');
const model = require('../models/evaluate.model');
const {responseEvaluateObject} = require('../helpers')

const getEvaluate = (req, res) =>{
    var {tourId} = req.query;
    pool.query(model.readEvaluate, [tourId], (err, result) => {
        if (err) {
            res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
        } else {
            res.json(responseEvaluateObject(200,'Kết nối thành công', result.rows));
        }
    })
}
const getCurrentEvaluate = (req, res) =>{
    var {tourId, memberId} = req.query;
    pool.query(model.readCurrentEvaluate, [tourId, memberId], (err, result) => {
        if (err) {
            res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
        }
        else if (result.rowCount == 0) {
            res.json(responseEvaluateObject(400,'Người dùng chưa đánh giá địa điểm này', []));
        }
         else {
            res.json(responseEvaluateObject(200,'Kết nối thành công', result.rows[0]));
        }
    })
}
const addEvaluate = (req, res, result)=>{
    var {evaluateStar, evaluateContent, createAt, memberId, tourId} = req.body;
    if(memberId && tourId && evaluateStar && evaluateContent){
        pool.query(model.insertEvaluate,[evaluateStar, evaluateContent, createAt, memberId, tourId], (error, results)=>{
            if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
            else res.send(responseEvaluateObject(200,"Đánh giá thành công"))
        })
    }else{
        res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
    }
    
}
const updateEvaluate = (req, res, result)=>{
    var {memberId, tourId, evaluateStar, evaluateContent} = req.body;
    if(memberId && tourId && evaluateStar && evaluateContent){
        pool.query(model.updateEvaluate, [evaluateStar, evaluateContent, memberId, tourId], (error, result)=>{
            if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            res.send(responseEvaluateObject(200,"Cập nhật thành công"))
        })
    }else{
        res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
    }
}
const checkEvaluate = (req, res)=>{
    var {memberId, tourId} = req.query;
    if(memberId){
        pool.query(model.checkEvaluate, [memberId, tourId], (error, result)=>{
            if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            if(result.rowCount){
                res.send(responseEvaluateObject(200,"Bạn đã đánh giá địa điểm này", "true"))
            }
            else{
                res.send(responseEvaluateObject(200,"Đánh giá địa điểm này", "false"))
            }   
        })
    }
    else{
        res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
    }
}
const deleteEvaluate = (req, res, result)=>{
    var {memberId, tourId} = req.body;
    if(memberId && tourId){
        pool.query(model.deleteEvaluate, [memberId, tourId], (error, results)=>{
            if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
            else res.send(responseEvaluateObject(200,"Xóa thành công"))
        })
    }else{
        res.json(responseEvaluateObject(400,'Truy vấn thất bại'));
    }
    
}
module.exports = 
{
    getEvaluate,
    addEvaluate,
    updateEvaluate,
    deleteEvaluate,
    checkEvaluate,
    getCurrentEvaluate
};
