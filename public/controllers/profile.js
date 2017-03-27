function isEligible(user) {
	return true;
}

function updateProfile () {
	var url = window.location.href, curEmail;
	for (var i = url.length - 1; i >= 0; i--) {
	    if (url[i] == '=') {
	        curEmail = url.substring(i+1);
	    }
	}
	console.log(curEmail);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/getUser", true);
	xhttp.onload = function() {
	    var json = JSON.parse(xhttp.responseText);
	    console.log(json);
	    if (json.success) {
	    	document.getElementById('profileContents').innerHTML += `
	    						<h5>Branch</h5>
                                <p>` + json.details.branch + `</p>
                                <h5>Name</h5>
                                <p>` + json.details.name + `</p>
                                <h5>Alternate Name</h5>
                                <p>` + json.details.name_alt + `</p>
                                <h5>Email</h5>
                                <p>` + json.details.email + `</p>
                                <h5>Contact Number</h5>
                                <p>` + json.details.contact + `</p>
                                <h5>Current Address</h5>
                                <p>` + json.details.address_new + `</p>
                                <h5>Current Location</h5>
                                <p>` + json.details.location_current + `</p>
                                <h5>Introduction</h5>
                                <p>` + json.details.intro + `</p>
                            `
	    }
	}
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send("{\"gEmail\":\""+curEmail+"\"}");
}

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function(user) {
    if (user && isEligible(user)) {
        updateProfile();
    } else {
        window.location.href = "./login.html"
    }
}, function(error) {
    console.log(error);
});