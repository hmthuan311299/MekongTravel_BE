const pool = require('../database');
const model = require('../models/statistic.model');
const {responseStatisticObject} = require('../helpers');
const statisticTAByProvince = (req, res)=>{
    pool.query(model.statisticTAByProvince, (error, result)=>{
        res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
    })
}
module.exports = {
    statisticTAByProvince
}