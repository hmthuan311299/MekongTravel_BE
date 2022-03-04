var readAdmin        = "SELECT adminAccount, adminEmail, adminName, adminAddress, adminGender FROM admin where adminAccount = 'admin'";
var updateAdmin      = "UPDATE admin SET adminEmail = $1, adminName = $2, adminAddress = $3 WHERE adminAccount  = 'admin'";
var changePassAdmin  = "UPDATE admin SET adminPass  = $1 WHERE adminAccount  = 'admin'";
var readLoginAdmin   = "SELECT * FROM admin WHERE adminAccount ILIKE $1 and adminPass = $2"
module.exports = {
    readAdmin, updateAdmin, changePassAdmin, readLoginAdmin
}