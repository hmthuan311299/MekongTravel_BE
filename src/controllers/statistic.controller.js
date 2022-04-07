const pool = require('../database');
const model = require('../models/statistic.model');
const {responseStatisticObject} = require('../helpers');
const statisticTAByProvince = (req, res)=>{
    pool.query(model.statisticTAByProvince, (error, result)=>{
        res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
    })
}
const statisticProvince = (req, res)=>{
    var {provinceId, month, year} = req.query;
    if(provinceId){
        if(!year){
            pool.query(model.singleProvince,[provinceId] , (error, result)=>{
                res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
            })
        }else{
            if(!month){
                pool.query(model.singleProvinceByYear,[provinceId,year] ,(error, result)=>{
                    res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
                })
            }else{
                pool.query(model.singleProvinceByMonthYear,[provinceId, year, month] ,(error, result)=>{
                    res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
                })
            }
        }
    }else{
        if(!year){
            pool.query(model.allProvince, (error, result)=>{
                res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
            })
        }else{
            if(!month){
                pool.query(model.allProvinceByYear, [year] , (error, result)=>{
                    res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
                })
            }else{
                pool.query(model.allProvinceByMonthYear,[year, month] , (error, result)=>{
                    res.send(responseStatisticObject(200,"Kết nối thành công", result.rows))
                })
            }
        }
    }
}
module.exports = {
    statisticTAByProvince, statisticProvince
}