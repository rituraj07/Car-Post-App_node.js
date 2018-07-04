var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user"); 
router.get("/",function(req,res){
    res.render("landing");
});
//Auth routs
router.get("/register",function(req,res){
    res.render("register");
});
//sign up
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {req.flash("error",err.message);
    return res.render("register");}
        passport.authenticate("local")(req,res,function(){
            req.flash("success","welcome "+user.username);
            res.redirect("/cars");
        });
    });
});
//login
router.get("/login",function(req,res){
    //req.flash("success","logged you in");
    res.render("login");
});
router.post("/login",passport.authenticate("local",{
    successRedirect: "/cars",
    failureRedirect: "/login"
}),function(req,res){
    
});
//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged you out");
    res.redirect("/cars");
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect("/login");
}
module.exports = router;