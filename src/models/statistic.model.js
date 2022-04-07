var statisticTAByProvince = 
`
select a.provinceId, a.provincetitle, count(touristAttraction.*) as count from province a 
LEFT JOIN touristAttraction ON a.provinceid = touristAttraction.provinceid group by a.provinceId, a.provincetitle
order by count desc
`;
var allProvince = 
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`
var allProvinceByYear =
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	and EXTRACT(year FROM createat::timestamp) = $1
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`
var allProvinceByMonthYear =
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	and EXTRACT(year FROM createat::timestamp) = $1
	and EXTRACT(month FROM createat::timestamp) = $2
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`

var singleProvince =
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	and c.provinceid = $1
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`
var singleProvinceByYear =
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	and c.provinceid = $1
	and EXTRACT(year FROM createat::timestamp) = $2
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`
var singleProvinceByMonthYear =
`select t.* from 
(
	select a.tourid, b.tourtitle, c.provincetitle, count(a.*) as countview from view a, touristAttraction b, province c where 
	a.tourid = b.tourid
	and b.provinceid = c.provinceid
	and c.provinceid = $1
	and EXTRACT(year FROM createat::timestamp) = $2
	and EXTRACT(month FROM createat::timestamp) = $3
	group by a.tourid, b.tourtitle, c.provincetitle
) t
order by countview asc limit 5`
module.exports ={
    statisticTAByProvince,
    allProvince,
    allProvinceByYear,
    allProvinceByMonthYear,
    singleProvince,
    singleProvinceByYear,
    singleProvinceByMonthYear
}