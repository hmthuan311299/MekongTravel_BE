var readMember         = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberYearofBirth, memberphone FROM member where memberstatus = 'true' limit 10 offset $1";
var readBlockedMember  = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberYearofBirth, memberphone FROM member where memberstatus = 'false' limit 10 offset $1";
var readMemberById     = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberYearofBirth, memberphone, memberStatus FROM member WHERE memberID = $1"
var readLoginMember    = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberYearofBirth, memberphone, memberStatus  FROM member WHERE memberEmail = $1 and memberPass = $2"
var findMemberByName   = "SELECT memberid, memberemail, membername, memberAvatar, memberaddress, membergender, memberYearofBirth, memberphone  FROM member WHERE memberName iLIKE $1 or memberName iLIKE $2"
var checkEmailExist    = "SELECT * FROM member WHERE memberEmail ILIKE $1"
var insertMember       = "INSERT INTO member(memberEmail, memberPass, memberName, memberAddress, memberGender, memberYearofBirth, memberPhone) values($1, $2, $3, $4, $5, $6, $7)"
var updateInforMember  = "UPDATE member SET membername = $1, memberAddress=$2, memberGender=$3, memberYearofBirth=$4, memberphone=$5 WHERE memberID = $6";
var uploadAvatarMember = "UPDATE member SET membername = $1, memberAddress=$2, memberGender=$3, memberYearofBirth=$4, memberphone=$5, memberAvatar = $6 WHERE memberID = $7";
var checkPassword   = "Select * from member where memberpass = $1 and memberID = $2";
var changePassMember = "UPDATE member SET memberpass = $1 WHERE memberID = $2";
var deleteMember     = "DELETE FROM member WHERE memberID = $1";
var setBlockedMember = "UPDATE member SET memberstatus = false WHERE memberID = $1";
var setOpenMember = "UPDATE member SET memberstatus = true WHERE memberID = $1";

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
    checkPassword,
    readBlockedMember,
    setBlockedMember,
    setOpenMember
}