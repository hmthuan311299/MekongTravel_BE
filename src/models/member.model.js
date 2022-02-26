var readMember          = "SELECT * FROM member limit 10 offset $1";
var readMemberById      = "SELECT * FROM member WHERE memberID = $1"
var readLoginMember     = "SELECT * FROM member WHERE memberEmail = $1 and memberPass = $2"
var findMemberByName    = "SELECT * FROM member WHERE memberName iLIKE $1 or first_name iLIKE $2"
var checkEmailExist     = "SELECT * FROM member WHERE memberEmail =$1"
var insertMember        = "INSERT INTO member(memberEmail, memberPass, memberName, memberAddress, memberGender, memberDesc, memberBirthday, memberPhone) values($1, $2, $3, $4, $5, $6, $7, $8)"
var updateInforMember   = "UPDATE member SET membername = $1, memberAddress=$2, memberGender=$3, memberdesc=$4, memberbirthday=$5, memberphone=$6 WHERE memberID = $7";
var uploadAvatarMember  = "UPDATE member SET memberAvatar = $1 WHERE memberID = $2";
var changePassMember    = "UPDATE member SET memberpass = $1 WHERE memberID = $2";
var deleteMember        = "DELETE FROM member WHERE memberID = $1";

module.exports = {
    readMember,
    readMemberById,
    readLoginMember,
    findMemberByName,
    checkEmailExist,
    insertMember,
    deleteMember,
    updateInforMember,
    changePassMember,
    uploadAvatarMember
}