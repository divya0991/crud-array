window.onload = function()
{
    var xml = new XMLHttpRequest();
      $("#editor").hide();
    if(xml)
    {
        xml.onreadystatechange = ajaxresponse;
        xml.open("GET",'/get');
        xml.send(null);
    }
        function ajaxresponse()
        {
            if(xml.readyState != 4)
            {
                console.log("its in process");
            }
            else if(xml.status == 200)
            {
                console.log("done");
                createform(xml.response);
            }
            else
            {
                console.log("its in error");
            }
        }
    
}
function createform(obj){
    var data = JSON.parse(obj);
    console.log(data);
   
    var form = "";
    for(i=0; i<data.length; i++){
        form += '<tr>';
        for(j=0; j<data[0].length; j++)
        {   
            form += '<td>'+data[i][j]+'</td>';
        }
        form += '<td><button class="btn btn-info" onclick="updateRecord(' + i + ')">edit</button>&nbsp;&nbsp;<button class="btn btn-warning" onclick="window.location.reload(); requestDelete(' + i + ')">delete</button></td>';
        form += '</tr>';
        document.getElementById('empTable').innerHTML = form;
        
    }
}

function requestDelete(id){
   alert(id);
   var choice =  confirm("Are you sure, you want to delete this record")
   if (choice == true) 
   {
       deleterecord(id);
        //document.getElementById("loading").style.display = "block";

   }  			
}
function deleterecord(id){
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = ajaxresponse;
    xml.open('DELETE',"/delete/"+id);
    xml.send(null);
    function ajaxresponse(){
        if(xml.readystate != 4){
            console.log("its in process");
            
        }
        else if(xml.status == 200){
            onload();
        }
        else{
            console.log("its in error");
        }
    }
}

function updateRecord(id){
   
      var ajaxRequest = new XMLHttpRequest();
			if (ajaxRequest) 
            {
                ajaxRequest.onreadystatechange = ajaxResponse;
                ajaxRequest.open("GET", "/get/"+id); // Where?
                ajaxRequest.send(null);
			}
       function ajaxResponse() {//This gets called when the readyState changes.

		             if(ajaxRequest.readyState != 4){
                    
                         console.log("its in process");

                 }else if(ajaxRequest.status == 200){

                          createForm(ajaxRequest.response,id);  /*===Record delted complete load the data again from get api======*/

                 }else{

                 	   console.log("Error");
                 }

  }


}
function createForm(obj,id)
{
    var data = JSON.parse(obj);   
    var formString ="";
    $("#editor").show();
    $("#wrapper").hide();
    document.getElementById('name').value=data[0];
    document.getElementById('code').value=data[1];
    document.getElementById('phone').value=data[2];
    document.getElementById('email').value=data[3];
    formString += '<div class="relative fullwidth col-xs-12"><button type="submit" name="submit" class="form-btn semibold" onclick="window.location.reload(); updateRec(' + id + ');">Update</button></div>;' 
    document.getElementById('update').innerHTML = formstring;
    
}
function updateRec(id)
{
      var order = new Object();
            order.name = document.getElementById('name').value;
            order.code = document.getElementById('code').value;
            order.phone =document.getElementById('phone').value;
            order.email =document.getElementById('email').value;
 alert(JSON.stringify(order))
    var ajaxRequest = new XMLHttpRequest();
		if (ajaxRequest) 
        {
            ajaxRequest.onreadystatechange = ajaxResponse;
            ajaxRequest.open("PUT","/put/"+id);
        ajaxRequest.setRequestHeader("Content-Type", "application/json");// Where?
            ajaxRequest.send(JSON.stringify(order));
           
		}
       function ajaxResponse() 
        {
            if(ajaxRequest.readyState != 4)
            {
                console.log("its in process")

            }else if(ajaxRequest.status == 200)
            {
                onload(); 
            }
            else
            {
                console.log("Error")
            }

  }
}
function addrecord(){
    alert("hello");
    var add = new Object();
    add.name = document.getElementById('add_name').value;
    add.code = document.getElementById('add_code').value;
    add.email = document.getElementById('add_email').value;
    add.phone = document.getElementById('add_phone').value;
 
    var xml = new XMLHttpRequest();
    if(xml)
    {
        xml.onreadystatechange = ajaxresponse;
        xml.open("POST",'/post');
        xml.setRequestHeader("Content-Type", "application/json");// Where?
        xml.send(JSON.stringify(add));
    }
    function ajaxresponse(){
        if(xml.readystate != 4){
            console.log("its in process");
        }
        else if(xml.status == 200){
            window.location.reload();
        }
        else{
            console.log("its in error");
        }
    }
    
}