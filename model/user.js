class User {
    constructor(email, fullname, password, preferences){
        this.email = email;
        this.fullname = fullname;
        this.password = password;
        this.preferences = preferences;
    }
};
module.exports = User;