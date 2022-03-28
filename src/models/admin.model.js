var readAdmin        = "SELECT adminEmail, adminName FROM admin where adminAccount = 'admin'";
var updateAdmin      = "UPDATE admin SET adminEmail = $1, adminName = $2 WHERE adminAccount  = 'admin'";
var changePassword  = "UPDATE admin SET adminPass  = $1 WHERE adminAccount  = 'admin'";
var readLoginAdmin   = "SELECT * FROM admin WHERE adminAccount ILIKE $1 and adminPass = $2"
var checkPassword   = "Select * from admin where adminpass = $1 and adminAccount  = 'admin'";

module.exports = {
    readAdmin, updateAdmin, changePassword, readLoginAdmin, checkPassword
}