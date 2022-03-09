const pool = require('../database');
const model = require('../models/comment.model');
const {responseCommentObject} = require('../helpers')

const getComment = (req, res) =>{
    var {tourId} = req.query;
    pool.query(model.readComment, [tourId], (err, result) => {
        res.json(responseCommentObject(200,'Kết nối thành công', result.rows));
    })
}
const addComment = (req, res, result)=>{
    var {commentContent, createAt ,memberId, tourId} = req.body;
    console.log(commentContent, createAt ,memberId, tourId)
    pool.query(model.insertComment, [commentContent, createAt ,memberId, tourId], (error, results)=>{
        if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"));
        else res.send(responseCommentObject(200,"Bình luận thành công"))
    })
}
const updateComment = (req, res, result)=>{
    var id = req.params.id;
    var {commentContent} = req.body;
    pool.query(model.updateComment, [commentContent, id], (error, result)=>{
        if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
        res.send(responseCommentObject(200,"Cập nhật thành công"))
    })
}
const deleteComment = (req, res, result)=>{
    var id = req.params.id;
    pool.query(model.deleteComment, [id], (error, results)=>{
        if(error) res.send(responseCommentObject(400,"Đã xảy ra lỗi trong hệ thống, vui lòng thao tác lại sau"))
        res.send(responseCommentObject(200,"Xóa thành công"))
    })
}
module.exports = 
{
    getComment,
    addComment,
    updateComment,
    deleteComment
};
