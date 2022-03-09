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
const addEvaluate = (req, res, result)=>{
    var {evaluateStar, evaluateContent, createAt, memberId, tourId} = req.body;
    pool.query(model.insertEvaluate,[evaluateStar, evaluateContent, createAt, memberId, tourId], (error, results)=>{
        if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
        else res.send(responseEvaluateObject(200,"Đánh giá thành công"))
    })
}
const updateEvaluate = (req, res, result)=>{
    var {memberid, tourid, evaluteStar, evaluteContent, createAt} = req.body;
    pool.query(model.updateEvaluate, [evaluteStar, evaluteContent, memberid, tourid], (error, result)=>{
        if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
        res.send(responseEvaluateObject(200,"Cập nhật thành công"))
    })
}
const deleteEvaluate = (req, res, result)=>{
    var {memberId, tourId} = req.body;
    pool.query(model.deleteEvaluate, [memberId, tourId], (error, results)=>{
        if(error) res.send(responseEvaluateObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
        res.send(responseEvaluateObject(200,"Xóa thành công"))
    })
}
module.exports = 
{
    getEvaluate,
    addEvaluate,
    updateEvaluate,
    deleteEvaluate
};
