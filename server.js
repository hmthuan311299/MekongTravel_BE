const express = require('express');
var app = express();
const port = process.env.port || 3000;
app.use(express.json());
var jwt = require('jsonwebtoken');

//import Router
var memberRouter = require('./src/router/member.route')
var provinceRoute = require('./src/router/province.route')


app.get('/', (req, res) => {
    res.send('Website tìm kiếm và giới thiệu địa điểm du lịch đồng bằng Sông Cửu Long')
})
//member
app.use('/member', memberRouter);

//province
app.use('/province', provinceRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})