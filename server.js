const express = require('express');
var app = express();
const port = process.env.port || 3000;
app.use(express.json());
var jwt = require('jsonwebtoken');
var path = require('path');
// var dirName = "./src/public"
app.use(express.static(__dirname))
//import Router
var memberRouter = require('./src/router/member.route')
var provinceRoute = require('./src/router/province.route')
var adminRouter = require('./src/router/admin.route')
var supporterRouter = require('./src/router/supporter.route')
var touristAttractionRouter = require('./src/router/touristAttraction.route')
var imageRouter = require('./src/router/imgTouristAttraction.route')
var commentRouter = require('./src/router/comment.route')
var evaluateRouter = require('./src/router/evaluate.route')
var saveTARouter = require('./src/router/saveTouristAttraction')
var recommededPlace = require('./src/router/recommendedPlace.route')
app.use(function (req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
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
app.use('/comment', commentRouter)
app.use('/evaluate', evaluateRouter)
app.use('/saveTA', saveTARouter)
app.use('/recommendedPlace', recommededPlace)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})