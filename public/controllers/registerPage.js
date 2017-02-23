document.getElementById('register').onclick = function() {
	console.log("HI");
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8081/register", true);
    xhttp.onload = function() {
        console.log(xhttp.responseText);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"email\":\""+document.getElementById('form-username').value+
    	"\",\"password\":\""+document.getElementById('form-password').value+"\"}");
}