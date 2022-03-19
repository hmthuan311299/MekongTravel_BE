var readIMGTouristByTourID = "SELECT * FROM image where tourid = $1";
var addIMGTourist       = "INSERT INTO image(imageID, imageName, imagePath, tourID) values ($1, $2, $3)";
var checkIMGTouristByID = "SELECT * FROM image where imageID = $1"
var deleteIMGTourist    = "DELETE FROM image WHERE imageID = $1";

module.exports = {
    readIMGTouristByTourID,
    addIMGTourist,
    checkIMGTouristByID,
    deleteIMGTourist,
}