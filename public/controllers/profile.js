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