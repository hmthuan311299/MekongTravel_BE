var readEvaluate      = "SELECT distinct a.*, b.memberName, b.memberAvatar FROM evaluate a, member b, touristAttraction c where a.memberid = b.memberid and a.tourid = c.tourid and a.tourid= $1";
var insertEvaluate    = "INSERT INTO evaluate(evaluateStar, evaluateContent, createAt, memberid, tourid) values($1, $2, $3, $4, $5)"
var updateEvaluate    = "UPDATE evaluate SET evaluateStar=$1, evaluateContent=$2 WHERE memberid = $3 and tourid=$4";
var deleteEvaluate    = "DELETE FROM evaluate WHERE memberid = $1 and tourid = $2";
var checkEvaluate    = "select * FROM evaluate WHERE memberid = $1 and tourid = $2";
module.exports = {
    readEvaluate, insertEvaluate, updateEvaluate, deleteEvaluate, checkEvaluate
}