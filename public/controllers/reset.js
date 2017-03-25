document.getElementById('reset').onclick = function() {
	var query = document.getElementById('query').value, newQuery = "", charA = "", charB = "";
	for (var i = 0; i < query.length; i++) {
		if (query[i] == '\t') {
			charA = query.substring(0,i);
			query = query.substring(i+1,query.length);
			i = 0;
		} else if (query[i] == '\n') {
			charB = query.substring(0,i);
			query = query.substring(i+1,query.length);
			i = 0;
			newQuery += "insert into users (name, branch) values ('" + charB + "', '" + charA + "'); ";
			charA = "";
			charB = "";
		}
	}
	console.log(newQuery);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/reset", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"query\":\""+newQuery+"\"}");
}
/*
Mechanical	Name A
Mechanical	Name B
Mechanical	Name C
Mechanical	Name D
Mechanical	Name E
Electrical	Name F
Electrical	Name G
Electrical	Name H
Electrical	Name I
Electrical	Name J
Civil	Name K
Civil	Name L
Civil	Name M
Civil	Name N
Civil	Name O
*/