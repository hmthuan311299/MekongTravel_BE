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
const responseIMGTouristObject = (status= 200, message = '', data= '')=>{
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
        "image" : data,
    }
}
const responseTouristObject = (status= 200, message = '', data= '')=>{
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
        "touristAttraction" : data,
    }
}
const responseCommentObject = (status= 200, message = '', data= '')=>{
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
        "message": message,
        "comment": data,
    }
}
const responseEvaluateObject = (status= 200, message = '', data= '')=>{
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
        "message": message,
        "evaluate": data,
    }
}
const responseSaveTAObject = (status= 200, message = '', data= '')=>{
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
        "message": message,
        "saveTA": data,
    }
}
const responseRecommendedObject = (status= 200, message = '', data= '')=>{
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
        "recommended" : data,
    }
}
const responseStatisticObject = (status= 200, message = '', data= '')=>{
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
        "statistic" : data,
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
function str_replace(search, replace, str){
	var ra = replace instanceof Array, sa = str instanceof Array, l = (search = [].concat(search)).length, replace = [].concat(replace), i = (str = [].concat(str)).length;
	while(j = 0, i--)
		while(str[i] = str[i].split(search[j]).join(ra ? replace[j] || "" : replace[0]), ++j < l);
	return sa ? str : str[0];
}
function remove_vietnamese_accents(str)
{
	accents_arr= new Array(
		"à","á","ạ","ả","ã","â","ầ","ấ","ậ","ẩ","ẫ","ă",
		"ằ","ắ","ặ","ẳ","ẵ","è","é","ẹ","ẻ","ẽ","ê","ề",
		"ế","ệ","ể","ễ",
		"ì","í","ị","ỉ","ĩ",
		"ò","ó","ọ","ỏ","õ","ô","ồ","ố","ộ","ổ","ỗ","ơ",
		"ờ","ớ","ợ","ở","ỡ",
		"ù","ú","ụ","ủ","ũ","ư","ừ","ứ","ự","ử","ữ",
		"ỳ","ý","ỵ","ỷ","ỹ",
		"đ",
		"À","Á","Ạ","Ả","Ã","Â","Ầ","Ấ","Ậ","Ẩ","Ẫ","Ă",
		"Ằ","Ắ","Ặ","Ẳ","Ẵ",
		"È","É","Ẹ","Ẻ","Ẽ","Ê","Ề","Ế","Ệ","Ể","Ễ",
		"Ì","Í","Ị","Ỉ","Ĩ",
		"Ò","Ó","Ọ","Ỏ","Õ","Ô","Ồ","Ố","Ộ","Ổ","Ỗ","Ơ",
		"Ờ","Ớ","Ợ","Ở","Ỡ",
		"Ù","Ú","Ụ","Ủ","Ũ","Ư","Ừ","Ứ","Ự","Ử","Ữ",
		"Ỳ","Ý","Ỵ","Ỷ","Ỹ",
		"Đ"
	);
 
	no_accents_arr= new Array(
		"a","a","a","a","a","a","a","a","a","a","a",
		"a","a","a","a","a","a",
		"e","e","e","e","e","e","e","e","e","e","e",
		"i","i","i","i","i",
		"o","o","o","o","o","o","o","o","o","o","o","o",
		"o","o","o","o","o",
		"u","u","u","u","u","u","u","u","u","u","u",
		"y","y","y","y","y",
		"d",
		"A","A","A","A","A","A","A","A","A","A","A","A",
		"A","A","A","A","A",
		"E","E","E","E","E","E","E","E","E","E","E",
		"I","I","I","I","I",
		"O","O","O","O","O","O","O","O","O","O","O","O",
		"O","O","O","O","O",
		"U","U","U","U","U","U","U","U","U","U","U",
		"Y","Y","Y","Y","Y",
		"D"
	);
 
	return str_replace(accents_arr,no_accents_arr,str);
}
module.exports = {  
    responseSupporterObject, 
    responseMemberObject, 
    responseProvinceObject, 
    responseAdminObject, 
    titleCase,
    responseTouristObject,
    responseIMGTouristObject,
    responseCommentObject,
    responseEvaluateObject,
    responseSaveTAObject,
    remove_vietnamese_accents,
    responseRecommendedObject,
    responseStatisticObject
}