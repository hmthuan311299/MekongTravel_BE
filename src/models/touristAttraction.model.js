var readAllTouristAttraction = "SELECT a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid";
var readTouristAttractionByProvince = "SELECT a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and a.provinceid = $1";
var readTouristAttractionById = "SELECT * FROM touristAttraction where tourid = $1";
var addTouristAttraction   = "INSERT INTO touristAttraction(tourID, tourTitle, tourPicture, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId) values ($1, $2, $3, $4, $5, $6, $7, $8)";
var checkNameTourist       = "SELECT * FROM touristAttraction where tourTitle ILIKE $1"
var checkTouristByID       = "SELECT * FROM touristAttraction where tourId = $1"
var updateTouristAtraction = "UPDATE touristAttraction SET tourTitle = $1, tourDesc=$2, tourAddress=$3, tourMap=$4, tourLinkVideo=$5, provinceId= $6 WHERE tourid = $7";
var updateTouristAtractionHavePicture = "UPDATE touristAttraction SET tourTitle = $1, tourDesc=$2, tourAddress=$3, tourMap=$4, tourLinkVideo=$5, provinceId= $6, tourPicture = $7 WHERE tourid = $8";
var deleteTouristAtraction = "DELETE FROM touristAttraction WHERE tourID = $1";
// var searchTouristAttraction = "Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE $1 or tourTitle ILIKE $2 or provinceTitle ILIKE $3 or provinceTitle ILIKE $4"
var searchTouristAttraction = "Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE $1 or provinceTitle ILIKE $2"

module.exports = {
    readAllTouristAttraction,
    readTouristAttractionByProvince,
    readTouristAttractionById,
    addTouristAttraction,
    checkTouristByID,
    updateTouristAtraction,
    checkNameTourist,
    updateTouristAtractionHavePicture,
    deleteTouristAtraction,
    searchTouristAttraction
}