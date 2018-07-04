//comments
var express = require("express");
var router = express.Router();
var car = require("../models/cars");
var Comment = require("../models/comment") 
router.get("/cars/:id/comment/new",isLoggedIn,function(req,res){
    car.findById(req.params.id, function(err,car){
        if(err)
        {console.log("err");}
        else{
            res.render("comments/new",{car: car});
        }
    });
    
});
router.post("/cars/:id/comments",isLoggedIn,function(req,res){
    car.findById(req.params.id,function(err,car){
        if(err)
        {console.log("err");}
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {console.log("err");}
                else{
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();
                    car.comments.push(comment);
                    car.save();
                    console.log(comment);
                    res.redirect("/cars/"+car._id);
                }
            });
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;