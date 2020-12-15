var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
async function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
console.log(username, password)
let res = await fetch("/login", {
    method: "post",
    headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: username, password:password})
} )
let data= await res.json()
console.log(data[0], "!!!", data[1]);

if (data[0] === "Login Successfull" && data[1]){
    window.location = data[1] + ".html";

// Reataurant.html?name=burgerking    //use query parameters
}

 else {
     if (data[0] === "Login Successfull"){
         data[0] = "Page under construction"
     }
   attempt --;// Decrementing by one.
   let error = document.getElementById("error")
   error.innerText=data[0]+ " You have "+attempt+" attempts left"
   console.log(data);
 
   
// alert("Wrong username or password! You have "+attempt+" attempts left;");
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


function Register(){
    var newusername = document.getElementById("newusername").value;
    var newpassword = document.getElementById("newpassword").value;
        fetch("/users", {
        method: "post",
        headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: newusername, password:newpassword, restaurant:"admin1"})
        } )
        console.log("cockies")
    // window.location = "admin3.html";  //just to test if Register function works // Register should take back to Login page to let new registered user Login //
}