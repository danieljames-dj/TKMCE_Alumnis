document.getElementById('signin').onclick = function() {
	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8081/signin", true);
    xhttp.onload = function() {
    	var json = JSON.parse(xhttp.responseText);
        // console.log(json);
        if (json.success == true) {
            localStorage.setItem("tkmce_token", json.token);
            window.location.href = "./index.html"
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"email\":\""+document.getElementById('form-username').value+"\",\"password\":\""+document.getElementById('form-password').value+"\"}");
}

void displayAll() {
    console.log("Hi");
}