var x = localStorage.getItem("tkmce_token");
if (x != -1 && x != null) {
    window.location.href = "./index.html";
}
document.getElementById("branch").onchange = function() {
	var branch = document.getElementById("branch").value;
	if (branch == 'Electrical')
		document.getElementById("name").innerHTML = "<option selected disabled>Select Name</option>" + "<option>Electrical</option>\n" + "<option>Electrical</option>\n";
	else if (branch == 'Mechanical')
		document.getElementById("name").innerHTML = "<option selected disabled>Select Name</option>" + "<option>Mechanical</option>\n" + "<option>Electrical</option>\n";
	else if (branch == 'Civil')
		document.getElementById("name").innerHTML = "<option selected disabled>Select Name</option>" + "<option>Civil</option>\n" + "<option>Electrical</option>\n";
}

document.getElementById('register').onclick = function() {
	if (document.getElementById('form-password').value != document.getElementById('form-password1').value) {
		alert("Invalid password");
		return;
	}
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8081/register", true);
    xhttp.onload = function() {
        console.log(xhttp.responseText);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{'
    	+ '"branch":"' + document.getElementById('branch').value + '",'
    	+ '"name":"' + document.getElementById('name').value + '",'
    	+ '"email":"' + document.getElementById('form-email').value + '",'
    	+ '"password":"' + document.getElementById('form-password').value + '",'
    	+ '"altName":"' + document.getElementById('form-altName').value + '",'
    	+ '"contact":"' + document.getElementById('form-cont').value + '",'
    	+ '"address":"' + document.getElementById('form-address').value + '",'
    	+ '"location":"' + document.getElementById('form-location').value + '",'
    	+ '"introduction":"' + document.getElementById('form-intro').value + '"'
    	+ '}');
}