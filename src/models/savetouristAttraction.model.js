var readSaveTouristAttraction     = "SELECT distinct c.*, a.memberId, d.provincetitle FROM  SaveTouristAttraction a, member b, touristAttraction c, province d where d.provinceid = c.provinceid and a.memberid = b.memberid and a.tourid = c.tourid and a.memberId= $1";
var insertSaveTouristAttraction    = "INSERT INTO SaveTouristAttraction(memberid, tourid, createAt) values($1, $2, $3)"
var deleteSaveTouristAttraction    = "DELETE FROM SaveTouristAttraction WHERE memberid = $1 and tourid=$2";
var checkSaveTouristAttraction    = "select * FROM SaveTouristAttraction WHERE memberid = $1 and tourid=$2";
module.exports = {
    readSaveTouristAttraction, insertSaveTouristAttraction, deleteSaveTouristAttraction,
    checkSaveTouristAttraction
}