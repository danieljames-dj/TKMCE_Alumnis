var active = "all";
var x = localStorage.getItem("tkmce_token");
if (x != -1 && x != null) {
    window.location.href = "./index.html";
}
document.getElementById('signin').onclick = function() {
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8081/signin", true);
    xhttp.onload = function() {
    	var json = JSON.parse(xhttp.responseText);
        if (json.success == true) {
            localStorage.setItem("tkmce_token", json.token);
            window.location.href = "./index.html"
        } else {
            console.log("LOL");
            alert("Invalid credentials");
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"email\":\""+document.getElementById('form-username').value+"\",\"password\":\""+document.getElementById('form-password').value+"\"}");
}