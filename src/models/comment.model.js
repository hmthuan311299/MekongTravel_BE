var readComment      = "SELECT distinct a.*, b.memberName FROM comment a, member b, touristAttraction c where a.memberid = b.memberid and a.tourid = c.tourid and a.tourid= $1";
var insertComment    = "INSERT INTO comment(commentContent, createAt ,memberid, tourid) values($1, $2, $3, $4)"
var updateComment    = "UPDATE comment SET commentContent = $1 WHERE commentID = $2";
var deleteComment    = "DELETE FROM comment WHERE commentID = $1";
//a.*, b.memberName
module.exports = {
    readComment, insertComment, updateComment, deleteComment
}