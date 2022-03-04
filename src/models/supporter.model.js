var readSupporter          = "SELECT suppId, suppEmail, suppName, suppAddress, suppGender, suppYearofBirth, suppphone FROM  Supporter";
var readSupporterById      = "SELECT suppId, suppEmail, suppName, suppAddress, suppGender, suppYearofBirth, suppphone FROM  Supporter WHERE suppID = $1"
var readLoginSupporter     = "SELECT suppId, suppEmail, suppName, suppAddress, suppGender, suppYearofBirth, suppphone FROM Supporter WHERE suppEmail ILIKE $1 and suppPass = $2"
var findSupporterByName    = "SELECT suppId, suppEmail, suppName, suppAddress, suppGender, suppYearofBirth, suppphone FROM Supporter WHERE suppName iLIKE $1 or first_name iLIKE $2"
var checkEmailExist        = "SELECT * FROM supporter WHERE suppEmail ILIKE $1"
var insertSupporter        = "INSERT INTO supporter(suppEmail, suppPass, suppName, suppAddress, suppGender, suppYearofBirth, suppPhone) values($1, $2, $3, $4, $5, $6, $7)"
var updateInforSupporter   = "UPDATE supporter SET suppname = $1, suppAddress=$2, suppGender=$3, suppYearofBirth=$4, suppphone=$5 WHERE suppID = $6";
var changePassSupporter    = "UPDATE supporter SET suppPass = $1 WHERE suppID = $2";
var deleteSupporter        = "DELETE FROM supporter WHERE suppID = $1";

module.exports = {
    readSupporter,
    readSupporterById,
    readLoginSupporter,
    findSupporterByName,
    checkEmailExist,
    insertSupporter,
    updateInforSupporter,
    changePassSupporter,
    deleteSupporter

}