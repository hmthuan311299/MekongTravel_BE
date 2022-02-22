var readMember          = "SELECT * FROM member limit 10 offset $1";
var readMemberById      = "SELECT * FROM member WHERE memberID = $1"
var readLoginMember     = "SELECT * FROM member WHERE memberEmail = $1 and memberPass = $2"
var findMemberByName    = "SELECT * FROM member WHERE memberName iLIKE $1 or first_name iLIKE $2"
var checkEmailExist     = "SELECT * FROM member WHERE memberEmail"
var insertMember        = "INSERT INTO member(memberEmail, memberPass, memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone) values($1, $2, $3, $4, $5, $6, $7, $8)"
var UpdateMember        = "UPDATE member SET memberemail = $1, memberpass = $2, membername = $3, memberAddress=$4, memberGender=$5, memberdesc=$6, memberbirthday=$7, memberphone=$8 WHERE memberID = $9";
var deleteMember        = "DELETE FROM member WHERE memberID = $1";

module.exports = {
    readMember,
    readMemberById,
    readLoginMember,
    findMemberByName,
    checkEmailExist,
    insertMember,
    UpdateMember,
    deleteMember
}