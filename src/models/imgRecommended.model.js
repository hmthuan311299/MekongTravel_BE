var readRecommendImageByID   = "SELECT * FROM recommendedImage where recommendID  = $1";
var addRecommendImage        = "INSERT INTO recommendedImage(reImageName, reImagePath, recommendID) values ($1, $2, $3)";
var checkRecommendImageByID  = "SELECT * FROM recommendedImage where reImageID = $1"
var deleteRecommendImageByID = "DELETE FROM recommendedImage WHERE reImageID = $1";

module.exports = {
    readRecommendImageByID,
    addRecommendImage,
    checkRecommendImageByID,
    deleteRecommendImageByID
}