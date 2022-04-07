var readReplyComment = 
"SELECT distinct a.*, b.memberName, b.memberavatar FROM ReplyComment a, member b, comment c, touristAttraction d where a.commentid = c.commentid and a.memberid = b.memberid and a.tourid = d.tourid and a.tourid= $1 order by repCommentid asc";
var insertReplyComment = "INSERT INTO ReplyComment(repCommentContent, createAt , memberid, commentid, tourid) values($1, $2, $3, $4, $5)"
var updateReplyComment = "UPDATE ReplyComment SET RepCommentContent = $1 WHERE RepCommentID = $2";
var deleteReplyComment = "DELETE FROM ReplyComment WHERE RepCommentID = $1";
//a.*, b.memberName
module.exports = {
    readReplyComment, insertReplyComment, updateReplyComment, deleteReplyComment
}