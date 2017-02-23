document.getElementById('button').innerHTML = "CLICK";
document.getElementById('button').onclick = function() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:8081/send", true);
	xhttp.onload = function() {
		console.log(xhttp.responseText);
	}
	xhttp.send({x:5});
}