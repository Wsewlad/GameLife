
var height = 10;
var width = 10;
var data;
var stopInt;
//перезавантажує сторінку
function reload() {
    location.reload();
}

window.onload = function() { //виводить напис з розмірами таблиці
	document.getElementById("mySpan").innerHTML = height + "x" + width;
}

function disable_button(buttonName) {
	document.getElementById(buttonName).disabled = true;
	document.getElementById(buttonName).style.cursor = "not-allowed";
	document.getElementById(buttonName).style.opacity = 0.6;
}
//переводить кнопку в активний або пасивний стан та викликає дод. функц.
function disabled_button_start() {
	disable_button("buttonStart");
    document.getElementById("buttonStop").disabled = false;
	start();
}
function disabled_button_stop() {
	disable_button("buttonStop");
	stop(stopInt);
}

 //перевірка данних на коректність
function check_input() {
	var height1 = document.getElementById("height1").value;
	var height2 = document.getElementById("height2").value;
	var width1 = document.getElementById("width1").value;
	var width2 = document.getElementById("width2").value;
	if (height1 < 0 || width1 < 0) {
		alert("You have entered wrong value in fields for 'i' or 'j' !!! Value for 'i' or 'j' must be >= 0. ");
	} if (height2 > height || width2 > width) {
		alert("You have entered wrong value in fields for 'i' or 'j' !!! Value for 'i' must be <= " + height + "." + 
			  " Value for 'j' must be <= " + width + ".");
	}	
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
//Далі механізм рандому
/*	var rangeMin = 5, rangeMax = 10; 
//змінна з випадковим значенням від 1 до 5;	
	var randomi = Math.floor((Math.random() * rangeMin) + 1); 
//змінна з випадковим значенням від 1 до 10;
	var randomi3 = Math.floor((Math.random() * rangeMax) + 1);
//змінна з випадковим значенням, від 5 до 10;
	var randomi2 = Math.floor(Math.random() * (rangeMax - rangeMin + 1) + rangeMin ); */
	var x = new Array(height);
	for (var i = 0; i < x.length; i++) {
		x[i] = new Array(width);
	}
	for (i = 0; i < x.length; i++) {
		for (var j = 0; j < x[i].length; j++) {
			x[i][j] = false;
			/*if (i == randomi3 && randomi < j && j < randomi2) {*/ //механізм рандому
			if (height1 < i && i < height2 && width1 < j && j < width2) {
				x[i][j] = true;
			}	
		}	
	}
	return x;
}

function controller() {
	present(data, viewport);
	data = business_logic_life(data);
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