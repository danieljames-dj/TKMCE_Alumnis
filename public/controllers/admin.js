function show(gEmail, name) {
	window.location.href = "./profile.html?gEmail=" + gEmail;
}

function approve(gEmail, name) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/approve", true);
	xhttp.onload = function() {
		console.log("HI");
	    window.location.href = "./admin.html";
	}
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send('{'
               + '"gEmail":"' + gEmail + '",'
               + '"name":"' + name + '"'
               + '}');
}

function deleteUser(gEmail, name) {
	console.log(gEmail);
}

var xhttp = new XMLHttpRequest();
xhttp.open("POST", "/getNonApproved", true);
xhttp.onload = function() {
    var json = JSON.parse(xhttp.responseText);
    console.log(json);
    for (var i = 0; i < json.rows.length; i++) {
    	document.getElementById('tableBody').innerHTML += `
    	  <tr>
	        <td>` + json.rows[i].gName + `</td>
	        <td>` + json.rows[i].gEmail + `</td>
	        <td>` + json.rows[i].name + `</td>
	        <td>` + json.rows[i].email + `</td>
	        <td><button onclick="show('` + json.rows[i].gEmail + `','` + json.rows[i].name + `')" type="button" class="btn btn-default">Show Details</button></td>
	        <td><button onclick="approve('` + json.rows[i].gEmail + `','` + json.rows[i].name + `')" type="button" class="btn btn-default">Approve</button></td>
	        <td><button onclick="deleteUser('` + json.rows[i].gEmail + `','` + json.rows[i].name + `')" type="button" class="btn btn-default">Delete</button></td>
	      </tr>
  `
    }
}
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send();