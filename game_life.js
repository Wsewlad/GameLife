
var height = 10;
var width = 10;
var data;
var stopInt;
window.onload = function() {
	document.getElementById("mySpan").innerHTML = height + "x" + width;
}

function populate_table(table, height, width) {
	for (var i = 0; i < height; i++) {
		var row = document.createElement("tr");
		table.appendChild(row);
		for (var j = 0; j < width; j++) {
			var cell = document.createElement("td");
			cell.className = "cell";
			row.appendChild(cell);
		}
	}
}
	
/*window.onload = */function start() {
	var viewport = document.getElementById("viewport");
	populate_table(viewport, height, width);
	data = initialize(data);
	//console.log(JSON.stringify(data));
	stopInt = setInterval(controller, 1000);
}

function stop() {
	clearInterval(stopInt);
}

function initialize(x) {
	var height1 = document.getElementById("height1").value;
	var height2 = document.getElementById("height2").value;
	var width1 = document.getElementById("width1").value;
	var width2 = document.getElementById("width2").value;
	var rangeMin = 5, rangeMax = 10; 
//змінна з випадковим значенням від 1 до 5;	
	var randomi = Math.floor((Math.random() * rangeMin) + 1); 
//змінна з випадковим значенням від 1 до 10;
	var randomi3 = Math.floor((Math.random() * rangeMax) + 1);
//змінна з випадковим значенням, від 5 до 10;
	var randomi2 = Math.floor(Math.random() * (rangeMax - rangeMin + 1) + rangeMin ); 
	var x = new Array(height);
	for (var i = 0; i < x.length; i++) {
		x[i] = new Array(width);
	}
	for (i = 0; i < x.length; i++) {
		for (var j = 0; j < x[i].length; j++) {
			x[i][j] = false;
			if (i == randomi3 && randomi < j && j < randomi2) {
				x[i][j] = true;
			}	
		}	
	}
	return x;
}

function controller() {
	data = business_logic_life(data);
	present(data, viewport);
}

function business_logic_test(data) {
	for (i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			if (i == j){
				data[i][j] = "red";
			} else {
				data[i][j] = "white";
			}
		}
	}
	return data;
}

function business_logic_life(data) {
	var w = data[0].length;
	var h = data.length;
	var new_life = new Array(h);
	for (var i = 0; i < new_life.length; i++) {
		new_life[i] = new Array(w);
	}	
	for (i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {   
			var c = 0;
			if (j != 0 && i != 0 && data[i - 1][j - 1] == true) {
				c = c + 1;
			} if (j != 0 && data[i][j - 1] == true) {
				c = c + 1;
			} if (j != 0 && i != h - 1 && data[i + 1][j - 1] == true) {
				c = c + 1;
			} if (i != h - 1 && data[i + 1][j] == true) {
				c = c + 1;
			} if (i != h - 1 && j != w - 1 && data[i + 1][j + 1] == true) {
				c = c + 1;
			} if (j != w - 1 && data[i][j + 1] == true) {
				c = c + 1;
			} if (i != 0 && j != w - 1 && data[i - 1][j + 1] == true) {
				c = c + 1;
			} if (i != 0 && data[i - 1][j] == true) {
				c = c + 1;
			} 
			if (data[i][j] == true) {
				if (c == 2 || c == 3) {
					new_life[i][j] = true;
				} else {
					new_life[i][j] = false;
				}	
			} else {
				if (c == 3) {
					new_life[i][j] = true;
				} else {
					new_life[i][j] = false;
				}
			}
		}
	}
	return new_life;
}

function present(data, viewport) {
	var viewport = document.getElementById("viewport");
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if (data[i][j] == true) {
				viewport.rows[i].cells[j].style.backgroundColor = "yellowgreen";
			} else {
				viewport.rows[i].cells[j].style.backgroundColor = "#003300";
			}
		}
	}
}