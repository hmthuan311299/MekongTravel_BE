
const responseMemberObject = (status= 200, message = '', data= '', access_Token= '')=>{
    status,
    message,
    data
    if(!data){
        return{
            "status": status,
            "message" : message,
        }
    }
    if(!access_Token){
        return{
            "status": status,
            "message" : message,
            "member" : data
        }
    }
    return {
        "status": status,
        "message" : message,
        "member" : data,
        "access_token": access_Token

        }
}
const responseSupporterObject = (status= 200, message = '', data= '', access_Token= '')=>{
    status,
    message,
    data
    if(!data){
        return{
            "status": status,
            "message" : message,
        }
    }
    if(!access_Token){
        return{
            "status": status,
            "message" : message,
            "supporter" : data
        }
    }
    return {
        "status": status,
        "message" : message,
        "supporter" : data,
        "access_token": access_Token

        }
}
const responseAdminObject = (status= 200, message = '', data= '', access_Token= '')=>{
    status,
    message,
    data
    if(!data){
        return{
            "status": status,
            "message" : message,
        }
    }
    if(!access_Token){
        return{
            "status": status,
            "message" : message,
            "admin" : data
        }
    }
    return {
        "status": status,
        "message" : message,
        "admin" : data,
        "access_token": access_Token

        }
}
const responseProvinceObject = (status= 200, message = '', data= '')=>{
    status,
    message,
    data
    if(!data){
        return{
            "status": status,
            "message" : message,
        }
    }
    return {
        "status": status,
        "message" : message,
        "province" : data,
    }
}
//Hàm viết hoa mỗi chữ đầu
const titleCase = (str)=>{
    var convertToArray = str.toLowerCase().split(' ');
    var result = convertToArray.map(function(val) {
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
    });
    return result.join(' ');
}
module.exports = {responseSupporterObject, responseMemberObject, responseProvinceObject, responseAdminObject, titleCase}