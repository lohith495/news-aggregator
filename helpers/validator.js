class Validator{
    static validateRegistrationInfo(user, usersArray){
        const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(user.hasOwnProperty("email") && user.hasOwnProperty("fullName") && user.hasOwnProperty("password")){
            if(user.password == null || user.password.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "password is null or empty"
                }
            }
            else if(user.fullName == null || user.fullName.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "fullName  is null or empty"
                }
            }
            else if(!(nameRegex.test(user.fullName))){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "invalid fullName"
                }
            }
            else if(user.email == null || user.email.trim() == ''){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "email  is null or empty"
                }
            }
            else if(!(emailRegex.test(user.email))){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "invalid email"
                }
            }
            else if(usersArray.filter(val => val.email == user.email).length > 0){
                return {
                    "validationStatus": false,
                    "responseStatus": 400,
                    "message": "email already registered/exists"
                }
            }
            else{
                return{
                    "validationStatus" : true,
                    "responseStatus": 201,
                    "message" : "Validated Successfully"
                };
            }            
        }
        else{
            return {
                "validationStatus": false,
                "responseStatus": 400,
                "message": "Missing/incorrect required parameters in user registration details, make sure you provide them all correctly"
            }
        }
    }
}
module.exports = Validator;