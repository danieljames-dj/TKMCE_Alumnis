var rows, name = "", userDetails;
function updateForm(user) {
    userDetails = user;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/getBranchName", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText), branch = "";
        rows = json.rows;
        if (json.curUser) {
            if (json.curUser.status == 1) {
                document.getElementById("branchForm").innerHTML = "";
                document.getElementById("nameForm").innerHTML = "";
                // freeze first 2 fields
            } else {
                branch = json.curUser.branch;
                name = json.curUser.name;
            }
            // update current values
        }
        if (branch == "") {
            document.getElementById("branch").innerHTML += '<option selected disabled>Select Branch</option>';
        }
        if (json.rows.length > 0)
            document.getElementById("branch").innerHTML += '<option>' + json.rows[0].branch + '</option>';
        for (var i = 1; i < json.rows.length; i++) {
            if (json.rows[i].branch != json.rows[i-1].branch) {
                if (branch == json.rows[i].branch)
                    document.getElementById("branch").innerHTML += '<option selected>' + json.rows[i].branch + '</option>';
                else
                    document.getElementById("branch").innerHTML += '<option>' + json.rows[i].branch + '</option>';
            }
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"gEmail\":\""+user.email+"\"}");
}

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        updateForm(user);
    } else {
        window.location.href = "./login.html"
    }
}, function(error) {
    console.log(error);
});

document.getElementById("branch").onchange = function() {
    document.getElementById("name").innerHTML = '<option selected disabled>Select Name</option>';
	var branch = document.getElementById("branch").value;
    for (var i = 0; i < rows.length; i++) {
        if (branch == rows[i].branch) {
            document.getElementById("name").innerHTML += '<option>' + rows[i].name + '</option>'
        }
    }
}

document.getElementById('register').onclick = function() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/register", true);
    xhttp.onload = function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{'
     + '"gName":"' + userDetails.displayName + '",'
     + '"gEmail":"' + userDetails.email + '",'
     + '"branch":"' + document.getElementById('branch').value + '",'
     + '"name":"' + document.getElementById('name').value + '",'
     + '"altName":"' + document.getElementById('form-altName').value + '",'
     + '"email":"' + document.getElementById('form-email').value + '",'
     + '"contact":"' + document.getElementById('form-cont').value + '",'
     + '"address":"' + document.getElementById('form-address').value + '",'
     + '"location":"' + document.getElementById('form-location').value + '",'
     + '"introduction":"' + document.getElementById('form-intro').value + '"'
     + '}');
}

document.getElementById('signout').onclick = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}

// document.getElementById('register').onclick = function() {
// 	if (document.getElementById('form-password').value != document.getElementById('form-password1').value) {
// 		alert("Invalid password");
// 		return;
// 	}
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST", "/register", true);
//     xhttp.onload = function() {
//         console.log(xhttp.responseText);
//         var json = JSON.parse(xhttp.responseText);
//         if (json.success == true) {
//             window.location.href = "./login.html"
//         } else {
//             console.log("LOL");
//             alert("Unsuccessful");
//         }
//     }
//     xhttp.setRequestHeader('Content-Type', 'application/json');
//     xhttp.send('{'
//     	+ '"branch":"' + document.getElementById('branch').value + '",'
//     	+ '"name":"' + document.getElementById('name').value + '",'
//     	+ '"email":"' + document.getElementById('form-email').value + '",'
//     	+ '"password":"' + document.getElementById('form-password').value + '",'
//     	+ '"altName":"' + document.getElementById('form-altName').value + '",'
//     	+ '"contact":"' + document.getElementById('form-cont').value + '",'
//     	+ '"address":"' + document.getElementById('form-address').value + '",'
//     	+ '"location":"' + document.getElementById('form-location').value + '",'
//     	+ '"introduction":"' + document.getElementById('form-intro').value + '"'
//         // + '"introduction":"' + document.getElementById('form-intro').value + '"'
//     	+ '}');
// }