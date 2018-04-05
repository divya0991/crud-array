var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8000;
var emp = [['divya','101','99999','div@gmail.com']];
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"static")));
app.get('/get',function(req,res){
    res.status(200);
    res.send(emp);
    res.end();
});
app.post('/post',function(req,res){
    res.status(200);
    var arr = [];
    arr[0] = req.body.name;
    arr[1] = req.body.code;
    arr[2] = req.body.phone;
    arr[3] = req.body.email;
    emp.push(arr);
    res.send('created');
    res.end();
});
app.delete('/delete/:id',function(req,res){
     res.status(200);
    var id = req.param("id");
    emp.splice(id,1);
    res.end();
   
});
app.get('/get/:id',function(request, response)
{
   response.status(200);
    var id = request.param("id");
    response.send(emp[id]);
    response.end();
    console.log(id);
})
app.put('/put/:id',function(request, response)
{
   response.status(200);
    var id = request.param("id");
   
     var tempArray = [];
    tempArray[0]=request.body.name;
    tempArray[1]=request.body.code;
    tempArray[2]=request.body.phone;
    tempArray[3]=request.body.email;
    emp[id]=tempArray;
    // response.setHeader("Content-Type", "text/plain");//  
    response.end();
    console.log(id);
})
app.listen(port);