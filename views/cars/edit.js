<% include partials/header %>
<div class="container" >
<div class="row"> 

<div style="width: 30%; margin: 40px auto;">
<form action="/cars" method="post">
 <h1 style="text-align: center;">Edit car details</h1>
  <div class="form-group">
   <input class="form-control" style="margin: 25px 0 0 0;" type="text" name="name" placeholder="name">
   </div>
   <div class="form-group">
   <input class="form-control" type="text" name="img" placeholder="enter URL">
   </div>
    <div class="form-group">
   <input class="form-control" type="text" name="description" placeholder="description">
   </div>
     <div class="form-group">
     <button class="btn btn-primary btn-large btn-block">Add</button>
</div>
</form>
</div>
</div>
</div>
<% include partials/footer %>