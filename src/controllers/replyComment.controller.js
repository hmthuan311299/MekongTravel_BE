const pool = require('../database');
const model = require('../models/replyComment.model');
const {responseCommentObject} = require('../helpers')
const getReplyComment = (req, res) =>{
    var {tourId} = req.query;
    if(tourId){
        pool.query(model.readReplyComment, [tourId], (err, result) => {
            res.json(responseCommentObject(200,'Kết nối thành công', result.rows));
        })
    }else{
        res.send(responseCommentObject(400,"Tham số truyền vào chưa đúng"))
    }
}
const addReplyComment = (req, res)=>{
    var {repCommentContent, createAt ,memberId, commentId, tourId} = req.body;
    if(repCommentContent && createAt && memberId && tourId){
        pool.query(model.insertReplyComment, [repCommentContent, createAt ,memberId, commentId, tourId], (error, results)=>{
            if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
            else res.send(responseCommentObject(200,"Bình luận thành công"))
        })
    }else{
        res.send(responseCommentObject(400,"Tham số truyền vào chưa đúng"))
    }
}
const updateReplyComment = (req, res, result)=>{
    var id = req.params.id;
    var {repCommentContent} = req.body;
    if(id && repCommentContent){
        pool.query(model.updateReplyComment, [repCommentContent, id], (error, result)=>{
            if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            res.send(responseCommentObject(200,"Cập nhật thành công"))
        })
    }else{
        res.send(responseCommentObject(400,"Tham số truyền vào chưa đúng"))
    }
}
const deleteReplyComment = (req, res, result)=>{
    var id = req.params.id;
    if(id){
        pool.query(model.deleteReplyComment, [id], (error, results)=>{
            if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
            else res.send(responseCommentObject(200,"Xóa thành công"))
        })
    }else{
        res.send(responseCommentObject(400,"Tham số truyền vào chưa đúng"))
    }
}
module.exports = 
{
    getReplyComment,
    addReplyComment,
    updateReplyComment,
    deleteReplyComment
};
