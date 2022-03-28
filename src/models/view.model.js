var countview  = "INSERT INTO view(createAt, tourid) values ($1, $2)";
var checkTouristByID  = "SELECT * FROM touristAttraction where tourId = $1"
module.exports = {
    countview,
    checkTouristByID
}