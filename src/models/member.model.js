var readMember          = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberdesc, memberYearofBirth, memberphone FROM member limit 10 offset $1";
var readMemberById      = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberdesc, memberYearofBirth, memberphone FROM member WHERE memberID = $1"
var readLoginMember     = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberdesc, memberYearofBirth, memberphone  FROM member WHERE memberEmail = $1 and memberPass = $2"
var findMemberByName    = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberdesc, memberYearofBirth, memberphone  FROM member WHERE memberName iLIKE $1 or memberName iLIKE $2"
var checkEmailExist     = "SELECT * FROM member WHERE memberEmail ILIKE $1"
var insertMember        = "INSERT INTO member(memberEmail, memberPass, memberName, memberAddress, memberGender, memberDesc, memberYearofBirth, memberPhone) values($1, $2, $3, $4, $5, $6, $7, $8)"
var updateInforMember   = "UPDATE member SET membername = $1, memberAddress=$2, memberGender=$3, memberdesc=$4, memberYearofBirth=$5, memberphone=$6 WHERE memberID = $7";
var uploadAvatarMember  = "UPDATE member SET membername = $1, memberAddress=$2, memberGender=$3, memberdesc=$4, memberYearofBirth=$5, memberphone=$6, memberAvatar = $7 WHERE memberID = $8";
var checkUserPassWord   = "Select * from member where memberpass = $1 and memberID = $2";
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
    uploadAvatarMember,
    checkUserPassWord
}