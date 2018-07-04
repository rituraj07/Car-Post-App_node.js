var express = require("express");
var router = express.Router();
var car = require("../models/cars");
router.get("/cars",function(req,res){
    console.log(req.user);
   car.find({},function(err, Allcars){
    if(err)
    {console.log("1err");}
    else{
        res.render("cars/index",{car : Allcars,currentUser: req.user});
    }
});
    
});
router.post("/cars",isLoggedIn,function(req,res){
    //res.send("you hit post");
    var name = req.body.name;
    var img = req.body.img;
    var des =req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var nc = {name: name, image: img, description: des,author: author};
    car.create(nc,function(err, newlyCreated){
        if(err)
        {console.log("2err");}
        else{
            res.redirect("cars");
        }
    });
   
});
router.get("/cars/new",isLoggedIn,function(req,res){
    res.render("cars/new");
});
router.get("/cars/:id",function(req,res){
    car.findById(req.params.id).populate("comments").exec(function(err, foundCar){
        if(err)
        {console.log("err");}
        else{
            console.log(foundCar);
            res.render("cars/show",{foundCar : foundCar});
        }
    });
    
});
//edit
router.get("/cars/:id/edit",chechCarOwnership,function(req,res){
   
        
        car.findById(req.params.id,function(err,foundCar){
           console.log("opiu");
            res.render("cars/edit",{car: foundCar});
               
        });
    
    
});
//update
router.put("/cars/:id",chechCarOwnership,function(req,res){
    car.findByIdAndUpdate(req.params.id,req.body.car,function(err,updateCar){
        if(err)
        {console("err");}
        else{
            res.redirect("/cars/"+req.params.id);
        }
    });
});
//delete router
router.delete("/cars/:id",chechCarOwnership,function(req,res){
    car.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {console.log("err");}
        else{
            res.redirect("/cars");
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
     req.flash("error","Please login first");
    res.redirect("/login");
}
function chechCarOwnership(req, res, next){
    if(req.isAuthenticated()){
        
        car.findById(req.params.id,function(err,foundCar){
            if(err)
            {console.log("err");}
            else{ 
               if(foundCar.author.id.equals(req.user._id)) {
              
            next();}
                else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        
        res.redirect("back");
    }
}
 module.exports = router;