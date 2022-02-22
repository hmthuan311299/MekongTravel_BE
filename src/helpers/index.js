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
module.exports = {responseMemberObject}