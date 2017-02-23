var active = "all";
var x = localStorage.getItem("tkmce_token");
if (x == -1 || x == null) {
	window.location.href = "./login.html";
} else {
	// var xhttp = new XMLHttpRequest();
 //    xhttp.open("POST", "http://localhost:8081/tokenCheck", true);
 //    xhttp.onload = function() {
 //    	var json = JSON.parse(xhttp.responseText);
 //        console.log(json.message);
 //        localstorage.setItem
 //    }
 //    xhttp.setRequestHeader('Content-Type', 'application/json');
 //    xhttp.send("{\"token\":\""+x+"\"}");
}
document.getElementById('logout').onclick = function() {
	localStorage.setItem("tkmce_token",-1);
	window.location.href = "./index.html";
	// var xhttp = new XMLHttpRequest();
 //    xhttp.open("POST", "http://localhost:8081/signin", true);
 //    xhttp.onload = function() {
 //    	var json = JSON.parse(xhttp.responseText);
 //        console.log(json.message);
 //        //localstorage.setItem
 //    }
 //    xhttp.setRequestHeader('Content-Type', 'application/json');
 //    xhttp.send("{\"email\":\""+document.getElementById('form-username').value+"\",\"password\":\""+document.getElementById('form-password').value+"\"}");
}

function navHelper(branch) {
	console.log("Active : " + active + " Current : " + branch);
	if (branch != active) {
		document.getElementById(active.valueOf()).className = "";
		document.getElementById(branch.valueOf()).className = "active";
		active = branch;
	}
}