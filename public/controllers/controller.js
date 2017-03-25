function signIn(user) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/signin", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        if (json.success == true) {
            window.location.href = "./index.html"
        } else {
            window.location.href = "./register.html"
        }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"gEmail\":\""+user.email+"\",\"gName\":\""+user.displayName+"\"}");
}

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        signIn(user);
    }
}, function(error) {
    console.log(error);
});

document.getElementById('signin').onclick = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}