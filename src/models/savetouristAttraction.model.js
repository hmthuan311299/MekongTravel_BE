var readSaveTouristAttraction     = "SELECT distinct a.*, b.memberName  FROM  SaveTouristAttraction a, member b, touristAttraction c where a.memberid = b.memberid and a.tourid = c.tourid and a.tourid= $1";
var insertSaveTouristAttraction    = "INSERT INTO SaveTouristAttraction(memberid, tourid, createAt) values($1, $2, $3)"
var deleteSaveTouristAttraction    = "DELETE FROM SaveTouristAttraction WHERE memberid = $1 and tourid=$2";
module.exports = {
    readSaveTouristAttraction, insertSaveTouristAttraction, deleteSaveTouristAttraction
}