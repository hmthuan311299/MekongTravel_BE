var readProvince          = "SELECT * FROM province";
var readProvinceById      = "SELECT * FROM province where provinceid = $1";
var addProvince           = "INSERT INTO province(provincePicture, ProvinceTitle, provinceDesc) values ($1, $2, $3)";
var checkNameProvince     = "SELECT * FROM province where provinceTitle ILIKE $1"
var checkProvinceByID     = "SELECT * FROM province where provinceId = $1"
var updateProvince        = "UPDATE PROVINCE SET provincePicture = $1, provinceTitle = $2, provinceDesc=$3 WHERE provinceID = $4";
var deleteProvince        = "DELETE FROM PROVINCE WHERE provinceID = $1";

module.exports = {
    readProvince,
    addProvince,
    updateProvince,
    deleteProvince,
    checkNameProvince,
    checkProvinceByID,
    readProvinceById
}