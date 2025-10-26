const User = require('../models/user.js');

module.exports.signUp = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.signupRender = async(req, res)=>{
    try{
        let{username, email, password}=req.body;
        const newUser = new User({email, username});
        const regUser = await User.register(newUser,password);
        req.login(regUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.login = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.loginRender = async(req, res)=>{
    req.flash("success","Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You Logged Out!");
        res.redirect("/listings");
    });
};