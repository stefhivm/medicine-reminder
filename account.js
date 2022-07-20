// var baseUrl = (window.location).href; // You can also use document.URL
//     var koopId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
//     var koopId2 = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
// var url_string =(window.location).href; ; //window.location.href
// var url = new URL(url_string);
// var c = url.searchParams.get("id");
// var d = url.searchParams.get("email");

    let c=localStorage.getItem("name");
    let d=localStorage.getItem("email")
    $(document).ready(function(){
        console.log(c)
        console.log(d)
        let account='';
        account=` <p>Name: ${c}</p>
         <p>Email: ${d}</p>`
         $('#accname').html(account);

        }) 
    function logout(){
          window.location="file:///D:/medicine%20app/medicine-reminder/login.html"
    }    