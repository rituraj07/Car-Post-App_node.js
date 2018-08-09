var express = require("express");
var app = express();
var passport = require("passport");
var localStrategy = require("passport-local");
var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/cars");
mongoose.connect("mongodb://rituraj07:rituraj07@ds231460.mlab.com:31460/cars");
var car = require("./models/cars");
var seedDB = require("./seeds");
var bodyparser = require("body-parser");
var Comment = require("./models/comment");
var User = require("./models/user"); 
var commentRoutes = require("./routes/comments");
var carRoutes = require("./routes/cars");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
/*car.create
(
    
    {name:"Jaguar", image: "http://www.photosforclass.com/download/pixabay-1366978?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe836b70921f3093ed1584d05fb1d4e97e07ee3d21cac104497f9c771a1eabcbc_960.jpg&user=MikesPhotos"
    ,description: "Jaguar is the luxury vehicle brand of Jaguar Land Rover, a British multinational car manufacturer with its headquarters in Whitley, Coventry, England and owned by the Indian company Tata Motors since 2008"},
    function(err,car)
{
    if(err)
    {console.log("err");}
    else
    {console.log("just inserted");console.log(car);}
});
 */
//passport config
app.use(require("express-session")({
    secret: "none",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(carRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 3000);