var mongoose = require("mongoose");
 var car = require("./models/cars");
var Comment = require("./models/comment");
 var data = 
 [
     {
        name : "BMW",
        image : "https://pixabay.com/get/e034b90b28fc1c22d2524518b7444795ea76e5d004b0144295f2c17eaee9b6_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
     }      ,
     {
        name : "Audi",
        image : "https://pixabay.com/get/e83db80f2cfd053ed1584d05fb1d4e97e07ee3d21cac104496f0c379afedb6bb_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
     }      ,
     
 ]

 function seedDB(){
     //remove cars;
    car.remove({}, function(err)
    {
       /* if(err)
        {console.log("err");}
        console.log("removed cars");
        data.forEach(function(seed){
            car.create(seed,function(err,car){
                if(err)
                {console.log("err");}
                else{
                    console.log("added cars");
                    Comment.create(
                        {
                           text: "this is great car",
                           author: "Rituraj Mishra" 
                        },function(err,comment){
                            if(err)
                            {console.log("err");}
                            car.comments.push(comment);
                            car.save();
                            console.log("created new comment");

                        }
                    );
                }
            });
        });*/
    });

    //add cars
    
 }

module.exports = seedDB;