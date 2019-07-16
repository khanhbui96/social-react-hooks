const validator = require('validator')
module.exports.registerValidate = (req, res, next)=>{
    const errs = {};
    const data = req.body;
    if(!validator.isEmail(data.email)){
        errs.email = 'email is valid!'
    };
    if(validator.isEmpty(data.email)){
        errs.email = 'email is required !'
    };
    if(validator.isEmpty(data.login)){
        errs.login = 'Login field is required!'
    };
    if(!validator.isLength(data.login, {min: 4, max: 40})){
        errs.login = 'Login must between 4 and 40 characters'
    };
    
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errs.password = 'Password must between 6 and 30 characters'
    };
    if(validator.isEmpty(data.password)){
        errs.password = 'Password field is required!'
    };
    if(!validator.equals(data.password, data.password2)){
        errs.password2 = 'Password2 must match'
    };
    if(validator.isEmpty(data.password2)){
        errs.password2 = 'Password2 field is required!'
    };
    if(Object.keys(errs).length){
        res.status(404).json(errs)
    }else{next()};   
};
module.exports.loginValidate = (req, res, next)=>{
    const errs = {};
    const data = req.body;
    if(!validator.isEmail(data.email)){
        errs.email = 'email is valid!'
    };
    if(validator.isEmpty(data.email)){
        errs.email = 'email is required !'
    };
    if(validator.isEmpty(data.password)){
        errs.password = 'Password field is required!'
    };
    if(!validator.isLength(data.password, {min: 6, max: 30})){
        errs.password = 'Password must between 6 and 30 characters'
    };
    if(Object.keys(errs).length){
        res.status(404).json(errs)
    }else{next()};   
}
    