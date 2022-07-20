let registration={}
function details(key,value){
    registration[key] = value;
    display();
}
let logins={}
function logindetails(key,value){
    logins[key]=value;
    
}
let pills={}
function pilldetails(key,value){
    pills[key]=value;
    display();
}
let syrups={}
function syrupdetails(key,value){
    syrups[key]=value;
    display();
}
let drops={}
function dropdetails(key,value){
    drops[key]=value;
    display();
}
let injects={}
function injectiondetails(key,value){
    injects[key]=value;
    display();
}
// function display(){
//     document.getElementById('code').innerHTML = JSON.stringify(pills)
// }
function register(){
    let name=document.form.name.value;
    console.log(name)
    let password=document.form.password.value;
    let email=document.form.email.value;
    if (name==null || name==""){
        alert("Name can't be blank");
        return false;
    }else if(password==null || password==""){
        alert("Password must be filled");
        return false;}
      else if(email==null || email==""){
        alert("Password must be filled");
        return false;}
       
        $.ajax({
            url:'http://karka.academy/api/action.php',
            type:'post',
            data:{
                request:'user_register',
                name:registration.name,
                email:registration.email,
                password:registration.password
            
            },
            success:function(response){
            
            let b=(JSON.parse(response).status)
            console.log(b)
            window.location='file:///D:/medicine%20app/medicine-reminder/html%20files/login.html';

           

            }
        })
    }
    
    function login(){
        console.log("hai")
        $.ajax({
            url:'http://karka.academy/api/action.php',
            type:'get',
            data:{
                request:'stefhi_login',
                email:logins.email,
                password:logins.password
            },
            success:function(response){
                console.log(response);
                let b=(JSON.parse(response));
                console.log(b.data.id);
                var x=b.data.id;
                if(b.status=='success'){
                    localStorage.setItem("email",b.data.email);
                    localStorage.setItem("name",b.data.name)
                    localStorage.setItem("id",b.data.id);
                    window.location = "file:///D:/medicine%20app/medicine-reminder/html%20files/home.html";
                    // window.location.href="account.html?id="+b.data.name+ "&email="+b.data.email;
                }
                
                // let x=b.data.name;
                // let z=b.data.email;
                // account(x,z);
                
            
            //     console.log(JSON.parse(response).data.email)
            // let Object=JSON.parse(response).data;
            // console.log(Object)
            }
        
        })
    } 
    function home(){
        window.location="file:///D:/medicine%20app/medicine-reminder/html%20files/home.html"
    }
    
  function pill(){
    let id=localStorage.getItem("id")
    console.log(id)
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'post',
        data:{
            request:'set_reminder',
            userid:id,
            medicinename:pills.pillname,
            startdate:pills.pillstartdate,
            time:pills.pilltime,
            stock:pills.pillcount,
            type:'pill'  
        },
        success:function(response){
            console.log(response);
        }
    
    })
  }   
  function syrup(){
    let id=localStorage.getItem("id")
    console.log(id)
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'post',
        data:{
            request:'set_reminder',
            userid:id,
            medicinename:syrups.syrupname,
            startdate:syrups.syrupstartdate,
            time:syrups.syruptime,
            stock:syrups.syrupcount,
            type:'syrup'  
        },
        success:function(response){
            console.log(response);
        }
    
    })
  }
  function drop(){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'post',
        data:{
            request:'set_reminder',
            userid:id,
            medicinename:drops.dropname,
            startdate:drops.dropstartdate,
            time:drops.droptime,
            stock:drops.dropcount,
            type:'drop'  
        },
        success:function(response){
            console.log(response);
        }
    
    })
  } 
  function injection(){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'post',
        data:{
            request:'set_reminder',
            userid:id,
            medicinename:injects.injectionname,
            startdate:injects.injectionstartdate,
            time:injects.injectiontime,
            stock:injects.injectioncount,
            type:'injection'  
        },
        success:function(response){
            console.log(response);
        }
    
    })
  }  
  function getdata(){
    
    let id=localStorage.getItem("id")
    let tr_container="";
    
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
       
        data:{
            request:'filter_reminder',
            type:'pill',
            userid:id
            
        },
        
        success:function(response){
console.log(response)
let b=(JSON.parse(response));
                console.log(b.data);
                console.log(b.data[0].id)
          let th_container=` <th scope="col">Medicine Name</th>
           <th scope="col">Start Date</th>
           <th scope="col">Time</th>
           <th scope="col">Stock</th>
           <th scope="col">type</th>`
            for(let i=0;i<b.data.length;i++){
                tr_container+=`<tr>
               
                            <td>${b.data[i].medicinename}</td> 
                            <td>${b.data[i].startdate}</td> 
                            <td>${b.data[i].time}</td>
                            
                            <td>${b.data[i].type}</td> 
                            <td><button type="button" onclick="delete_pill(${b.data[i].id})"  ><img src="./../css files/icons8-delete-25.png"/></button></td>
                            </tr>
                            `
            }
            let table=  tr_container; 
            console.log(table)
            $('#reminderlist').html(table);

            // window.location="file:///D:/medicine%20app/medicine-reminder/reminderlist.html" 
            
        }
    })
}   
function syrupdata(){
    let id=localStorage.getItem("id")
    
    let tr_container="";
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
      
        data:{
            request:'filter_reminder',
            type:'syrup',
            userid:id
        },
        
        success:function(response){
console.log(response)
var b=(JSON.parse(response));
            console.log(b.status)   
            if(b.status=='success'){
          let th_container=` <th scope="col">Medicine Name</th>
           <th scope="col">Start Date</th>
           <th scope="col">Time</th>
           <th scope="col">Stock</th>
           <th scope="col">type</th>`
            for(let i=0;i<b.data.length;i++){
                tr_container+=`<tr>
               
                            <td>${b.data[i].medicinename}</td> 
                            <td>${b.data[i].startdate}</td> 
                            <td>${b.data[i].time}</td>
                            
                            <td>${b.data[i].type}</td> 
                            <td><button type="button" onclick="delete_syrup(${b.data[i].id})"  ><img src="./../css files/icons8-delete-25.png"/></button></td>
                            </tr>
                            `
            }
            let table= tr_container; 
            console.log(table)
            $('#reminderlist').html(table);

            // window.location="file:///D:/medicine%20app/medicine-reminder/reminderlist.html" 
        }  
       else if(b.status=='failed')
        {
            console.log("hai")
        var tr_container;
        for(let i=0;i<b.data.length;i++){
            tr_container+=`<tr>
           
                        <td>No data</td> 
                        <td></td> 
                        <td></td>
                        <td></td>
                        <td></td> `
                                   
    }
    let table=tr_container;
    console.log(table)
    $('#reminderlist').html(table);}
}
        
    
            
})
}
 
    
  
function dropdata(){
    let id=localStorage.getItem("id")
    
    let tr_container="";
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
       
        data:{
            request:'filter_reminder',
            type:'drop',
            userid:id
            
        },
        
        success:function(response){
console.log(response)
let b=(JSON.parse(response));
                console.log(b.data);
                console.log(b.data[0].medicinename)
          let th_container=` <th scope="col">Medicine Name</th>
           <th scope="col">Start Date</th>
           <th scope="col">Time</th>
           <th scope="col">Stock</th>
           <th scope="col">type</th>`
            for(let i=0;i<b.data.length;i++){
                tr_container+=`<tr>
               
                            <td>${b.data[i].medicinename}</td> 
                            <td>${b.data[i].startdate}</td> 
                            <td>${b.data[i].time}</td>
                           
                            <td>${b.data[i].type}</td>
                            <td><button type="button" onclick="delete_drop(${b.data[i].id})"  ><img src="./../css files/icons8-delete-25.png"/></button></td> 
                            </tr>
                            `
            }
            let table=  tr_container; 
            console.log(table)
            $('#reminderlist').html(table);

            // window.location="file:///D:/medicine%20app/medicine-reminder/reminderlist.html" 
            
        }
    })
}   
function injectiondata(){
    
    let id=localStorage.getItem("id")
    let tr_container="";
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
       
        data:{
            request:'filter_reminder',
            type:'injection',
            userid:id
            
        },
        
        success:function(response){
console.log(response)
let b=(JSON.parse(response));
                console.log(b.data);
                console.log(b.data[0].medicinename)
          let th_container=` <th scope="col">Medicine Name</th>
           <th scope="col">Start Date</th>
           <th scope="col">Time</th>
           <th scope="col">Stock</th>
           <th scope="col">type</th>`
            for(let i=0;i<b.data.length;i++){
                tr_container+=`<tr>
               
                            <td>${b.data[i].medicinename}</td> 
                            <td>${b.data[i].startdate}</td> 
                            <td>${b.data[i].time}</td>
                            
                            <td>${b.data[i].type}</td> 
                            <td><button type="button" onclick="delete_inject(${b.data[i].id})"><img src="./../css files/icons8-delete-25.png"/></button></td>
                            <td>
                            </tr>
                            `
            }
            let table=  tr_container; 
            console.log(table)
            $('#reminderlist').html(table);

            // window.location="file:///D:/medicine%20app/medicine-reminder/reminderlist.html" 
            
        }
    })
}  

function delete_pill(m_id){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
        data:{
            request:'delete_reminder',
            userid:id,
            id:m_id
        },
        success:function(resp){
            
             getdata();
        }
    })

} 
function delete_syrup(m_id){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
        data:{
            request:'delete_reminder',
            userid:id,
            id:m_id
        },
        success:function(resp){
            
             syrupdata();
        }
    })

} 
function delete_drop(m_id){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
        data:{
            request:'delete_reminder',
            userid:id,
            id:m_id
        },
        success:function(resp){
            
             dropdata();
        }
    })

} 
function delete_inject(m_id){
    let id=localStorage.getItem("id")
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
        data:{
            request:'delete_reminder',
            userid:id,
            id:m_id
        },
        success:function(resp){
            
             injectiondata();
        }
    })

}  

setInterval(function () 
{ 
    let id=localStorage.getItem("id")
    var today= new Date()
    // var time = today.getHours() + ":" + today.getMinutes()
    // console.log(time); 

     var time=   today.toLocaleString('en-US', {
          hour12: false,

          
          hour: '2-digit',
          minute: '2-digit'
        
        })
        console.log(time)
    
    $.ajax({
        url:'http://karka.academy/api/action.php',
        type:'get',
        data:{
            request:'medicine_email_notification',
            current_time:time,
            userid:id
        },
        success:function(resp){
            
            
        }
    })

}, 60000);

