var active = "all";
var regdList;

var display = function() {
	document.getElementById('people').innerHTML = "";
	for (var i in regdList) {
		if (!regdList[i].gEmail) regdList[i].gEmail = "a@a";
		if (active != 'all' && active != regdList[i].branch) continue;
    	console.log(regdList[i]);
    	var image = `<img class="img-responsive" src="http://placehold.it/400x300" alt="">`;
    	if (regdList[i].new_face) {
    		//
    	}
		document.getElementById('people').innerHTML += `
			<div class="col-lg-3 col-md-4 col-xs-6 thumb">
                <a class="thumbnail" href="./profile.html?gEmail=` + regdList[i].gEmail + `"> ` + image + `
                </a>
                <p>` + regdList[i].name + `</p>
            </div>
		`;
    }
}

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Hi");
        var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/getRegdList", true);
		xhttp.onload = function() {
			var json = JSON.parse(xhttp.responseText);
		    console.log(json);
		    regdList = json.details;
		    display();
		}
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.send();
    } else {
        window.location.href = "./login.html"
    }
}, function(error) {
    console.log(error);
});

document.getElementById('logout').onclick = function() {
	firebase.auth().signOut().then(function() {
      window.location.href = "./login.html"
    }).catch(function(error) {
      // An error happened.
    });
}

function navHelper(branch) {
	console.log("Active : " + active + " Current : " + branch);
	if (branch != active) {
		document.getElementById(active.valueOf()).className = "";
		document.getElementById(branch.valueOf()).className = "active";
		active = branch;
		display();
	}
}