var readProvince          = "SELECT * FROM province";
var addProvince           = "INSERT INTO province(ProvinceTitle, provinceDesc) values ($1, $2)";
var checkNameProvince     = "SELECT * FROM province where provinceTitle = $1"
var checkProvinceByID     = "SELECT * FROM province where provinceId = $1"
var updateProvince        = "UPDATE PROVINCE SET provinceTitle = $1, provinceDesc=$2 WHERE provinceID = $3";
var deleteProvince        = "DELETE FROM PROVINCE WHERE provinceID = $1";

module.exports = {
    readProvince,
    addProvince,
    updateProvince,
    deleteProvince,
    checkNameProvince,
    checkProvinceByID
}