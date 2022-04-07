var readAllRecommendedPlace  = "SELECT a.*, b.provinceTitle, c.memberName FROM recommendedPlace a, province b, member c where a.provinceid = b.provinceid and a.memberid = c.memberid and status='Đang xem xét'";
var readRecommendedPlaceById = "SELECT a.*, b.memberName, c.provincetitle FROM recommendedPlace a, member b, province c where a.memberid = b.memberid and a.provinceid = c.provinceid and recommendID = $1";
var addRecommendedPlace      = "INSERT INTO recommendedPlace(recommendID, recommendTitle, recommendPicture, recommendDesc, recommendAddress, recommendMap, recommendLinkVideo, provinceId, memberId) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
var checkRecommendedPlaceByID = "SELECT * FROM recommendedPlace where recommendID = $1"
var deleteRecommendedPlace   = "DELETE FROM recommendedPlace WHERE recommendID = $1";
var readUnapprovedListByMemberId = "SELECT a.*, b.provinceTitle, c.memberName FROM recommendedPlace a, province b, member c where a.provinceid = b.provinceid and a.memberid = c.memberid and status='Đang xem xét' and a.memberid= $1";
var readApprovedListByMemberId = "SELECT a.*, b.provinceTitle, c.memberName FROM recommendedPlace a, province b, member c where a.provinceid = b.provinceid and a.memberid = c.memberid and status='Đã phê duyệt' and a.memberid= $1";
var readUnapprovedList = "SELECT a.*, b.provinceTitle, c.memberName FROM recommendedPlace a, province b, member c where a.provinceid = b.provinceid and a.memberid = c.memberid and status='Đang xem xét'";
var updateStatusRecommended = "update recommendedPlace set recommendtitle = $1, recommenddesc = $2, recommendaddress = $3, provinceid = $4, status= $5 where recommendid = $6"
var updateStatusRecommendedHavePicture = "update recommendedPlace set recommendtitle = $1, recommenddesc = $2, recommendaddress = $3, provinceid = $4, recommendpicture = $5, status= $6 where recommendid = $7"
var deleteRecommendedPlaceByMemberId = "DELETE FROM recommendedPlace WHERE memberId = $1 and status='Đang xem xét'"
module.exports = {
    readAllRecommendedPlace,
    readRecommendedPlaceById,
    addRecommendedPlace,
    checkRecommendedPlaceByID,
    deleteRecommendedPlace,
    readUnapprovedListByMemberId,
    readApprovedListByMemberId,
    readUnapprovedList,
    updateStatusRecommended,
    updateStatusRecommendedHavePicture,
    deleteRecommendedPlaceByMemberId
}