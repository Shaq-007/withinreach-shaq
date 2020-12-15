var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "admin1" && password == "admin1"){
alert ("Login successfully");
window.location = "admin1.html"; // Redirecting to other page.
return false;
}
else if( username == "admin2" && password == "admin2"){
    alert ("Login successfully");
    window.location = "admin2.html"; // Redirecting to other page.
    return false;
    }
else{
attempt --;// Decrementing by one.
alert("Wrong username or password! You have "+attempt+" attempts left;");
// Disabling fields after 3 attempts.
if( attempt == 0){
document.getElementById("username").disabled = true;
document.getElementById("password").disabled = true;
document.getElementById("submit").disabled = true;
alert("Please contact your local Support Representative!");
window.location = "bye.html";
window.close();
return false;
}
}
}

// function Register(){
//     var newusername = document.getElementById("newusername").value;
//     var newpassword = document.getElementById("newpassword").value;
//     post http://localhost:3000/users
//     alert ("Wellcome You signed up successfully");
//     window.location = "admin1.html";
// }