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
    var file = [], newFiles = [];
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var send = function() {
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
               + '"introduction":"' + document.getElementById('form-intro').value + '",'
               + '"file1":"' + newFiles[0] + '",'
               + '"file2":"' + newFiles[1] + '",'
               + '"file3":"' + newFiles[2] + '",'
               + '"file4":"' + newFiles[3] + '"'
               + '}');
    }

    // function readFile(e) {
    //   console.log("FFFFF");
    //   if (window.FileReader) {
    //     var file  = e.target.files[0];
    //     var reader = new FileReader();
    //     //if (file && file.type.match('image.*')) {
    //     if (true) {
    //       reader.readAsDataURL(file);
    //     } else {
    //       img.css('display', 'none');
    //       img.attr('src', '');
    //     }
    //     reader.onloadend = function (e) {
    //       console.log("LLLL");
    //     }
    //   }
    // }

    // document.getElementById('oldFace').addEventListener('change', readFile, false);
    file[0] = document.getElementById('oldFace').files[0];
    file[1] = document.getElementById('newFace').files[0];
    file[2] = document.getElementById('familyPic1').files[0];
    file[3] = document.getElementById('familyPic2').files[0];
    var j = 0;
    for (var i in file) {
      if (file[i])
        j++;
    }
    if (j == 0) send();
    if (file[0]) {
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent, x) {
          newFiles[0] = fileLoadedEvent.target.result;
          if (--j == 0) send();
      };
      fileReader.readAsDataURL(file[0]);
    }
    if (file[1]) {
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent, x) {
          newFiles[1] = fileLoadedEvent.target.result;
          if (--j == 0) send();
      };
      fileReader.readAsDataURL(file[1]);
    }
    if (file[2]) {
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent, x) {
          newFiles[2] = fileLoadedEvent.target.result;
          if (--j == 0) send();
      };
      fileReader.readAsDataURL(file[2]);
    }
    if (file[3]) {
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent, x) {
          newFiles[3] = fileLoadedEvent.target.result;
          if (--j == 0) send();
      };
      fileReader.readAsDataURL(file[3]);
    }
    // var reader = new FileReader();
    // reader.onload = function(fileLoadedEvent) {
    //   console.log("SSDSD");
    //   console.log(fileLoadedEvent.target.result);
    // };
    // console.log("READER");
    // reader.readAsText(file[0]);
    // send();
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