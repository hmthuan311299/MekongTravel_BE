const express = require('express');
var app = express();
const port = process.env.port || 3000;
app.use(express.json());
var jwt = require('jsonwebtoken');
var path = require('path');
//import Router
var memberRouter = require('./src/router/member.route')
var provinceRoute = require('./src/router/province.route')
var adminRouter = require('./src/router/admin.route')
var supporterRouter = require('./src/router/supporter.route')
var touristAttractionRouter = require('./src/router/touristAttraction.route')
var imageRouter = require('./src/router/imgTouristAttraction.route')
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
    res.send('Website tìm kiếm và giới thiệu địa điểm du lịch đồng bằng Sông Cửu Long')
})
//admin
app.use('/admin', adminRouter);

//member
app.use('/member', memberRouter);
//supporter
app.use('/supporter', supporterRouter);
//province
app.use('/province', provinceRoute);
//touristAttraction
app.use('/touristAttraction', touristAttractionRouter)
app.use('/image', imageRouter)
app.use(express.static(__dirname))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})