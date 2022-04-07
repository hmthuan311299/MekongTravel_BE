var readAllTouristAttraction = 
`select t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid, t.provincetitle,  avg(evaluate.evaluatestar)  
from (SELECT a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid) t
left join evaluate on t.tourid = evaluate.tourid 
group by t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid, t.provincetitle`;
var readTouristAttractionByProvince = 
`select t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid, t.provincetitle, avg(evaluate.evaluatestar)  
from (SELECT a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and a.provinceid = $1) t
left join evaluate on t.tourid = evaluate.tourid 
group by t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid, t.provincetitle`
var readTouristAttractionById = 
`select t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid, avg(evaluate.evaluatestar) from 
(SELECT * FROM touristAttraction t where t.tourid = $1) t
left join evaluate on t.tourid = evaluate.tourid
group by t.tourid, t.tourtitle, t.tourpicture, t.tourdesc, t.touraddress, t.tourmap, t.tourlinkvideo, t.provinceid`;
var addTouristAttraction   = "INSERT INTO touristAttraction(tourID, tourTitle, tourPicture, tourDesc, tourAddress, tourMap, tourLinkVideo, provinceId) values ($1, $2, $3, $4, $5, $6, $7, $8)";
var checkNameTourist       = "SELECT * FROM touristAttraction where tourTitle ILIKE $1"
var checkTouristByID       = "SELECT * FROM touristAttraction where tourId = $1"
var updateTouristAtraction = "UPDATE touristAttraction SET tourTitle = $1, tourDesc=$2, tourAddress=$3, tourMap=$4, tourLinkVideo=$5, provinceId= $6 WHERE tourid = $7";
var updateTouristAtractionHavePicture = "UPDATE touristAttraction SET tourTitle = $1, tourDesc=$2, tourAddress=$3, tourMap=$4, tourLinkVideo=$5, provinceId= $6, tourPicture = $7 WHERE tourid = $8";
var deleteTouristAtraction = "DELETE FROM touristAttraction WHERE tourID = $1";
// var searchTouristAttraction = "Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE $1 or tourTitle ILIKE $2 or provinceTitle ILIKE $3 or provinceTitle ILIKE $4"
var searchTouristAttraction = "Select distinct a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and tourTitle ILIKE $1 or provinceTitle ILIKE $2"
var rankTAByProvince = 
`select * from 
    (select a.tourid as tourid, b.tourtitle, count(evaluateStar) as numberEval, avg(evaluateStar), b.touraddress, c.provincetitle, b.tourpicture from evaluate a, touristAttraction b, province c
    where a.tourid = b.tourid and b.provinceid = c.provinceid and c.provinceid = $1 group by a.tourid, b.tourtitle, b.touraddress, c.provincetitle, b.tourpicture limit 5) t 
order by t.numberEval desc`;
var suggestionTAByProvince =
`
SELECT a.*, b.provinceTitle FROM touristAttraction a, province b where a.provinceid = b.provinceid and a.provinceid = $1
Except
(select b.*, c.provinceTitle from evaluate a, touristAttraction b, province c  
where a.tourid = b.tourid and b.provinceid = c.provinceid and c.provinceid = $1 group by b.tourid, c.provinceTitle)
`
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
    searchTouristAttraction,
    rankTAByProvince,
    suggestionTAByProvince
}