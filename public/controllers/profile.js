var x = localStorage.getItem("tkmce_token");
if (x == -1 || x == null) {
	window.location.href = "./login.html";
}