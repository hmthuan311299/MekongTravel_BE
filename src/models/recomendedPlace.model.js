var readAllRecommendedPlace  = "SELECT a.*, b.provinceTitle, c.memberName FROM recommendedPlace a, province b, member c where a.provinceid = b.provinceid and a.memberid = c.memberid";
var readRecommendedPlaceById = "SELECT * FROM recommendedPlace where recommendID = $1";
var addRecommendedPlace      = "INSERT INTO recommendedPlace(recommendID, recommendTitle, recommendPicture, recommendDesc, recommendAddress, recommendMap, recommendLinkVideo, provinceId, memberId) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
var checkRecommendedPlaceByID = "SELECT * FROM recommendedPlace where recommendID = $1"
var deleteRecommendedPlace   = "DELETE FROM recommendedPlace WHERE recommendID = $1";
// 
module.exports = {
    readAllRecommendedPlace,
    readRecommendedPlaceById,
    addRecommendedPlace,
    checkRecommendedPlaceByID,
    deleteRecommendedPlace 
}