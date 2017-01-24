
var height = 30;
var width = 30;
var data;
var stopInt;
//перезавантажує сторінку
function reload() {
    location.reload();
}

window.onload = function() { //виводить напис з розмірами таблиці
	document.getElementById("myDiv").innerHTML = "Розмір поля " + height + "x" + width + " клітинок";
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
	stopInt = setInterval(controller, 500);
}

function stop() {
	clearInterval(stopInt);
}

function cell_info(aliveOrDead, frame) {
    this.alive = aliveOrDead;
    this.frames = frame;
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
		for (var j = 0; j < x[i].length; j++) { //створення об'єкта в клітинці
			x[i][j] = new cell_info(false, 0); //{alive:false, frames:0}
		}
	}
	for (i = 0; i < x.length; i++) {
		for (var j = 0; j < x[i].length; j++) {
			x[i][j].alive = false;
			/*if (i == randomi3 || randomi < j && j < randomi2) {*/ //механізм рандому
			if (height1 < i && i < height2 && width1 < j && j < width2) {
				x[i][j].alive = true;
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
		for (var j = 0; j < new_life[i].length; j++) {//створення об'єкта в клітинці
			new_life[i][j] = new cell_info(false, 0); //{alive:false, frames:0};
		}
	}
	for (i = 0; i < h; i++) {
		for (var j = 0; j < w; j++) {
			var c = 0;
			if (j != 0 && i != 0 && data[i - 1][j - 1].alive == true) {
				c = c + 1;
			} if (j != 0 && data[i][j - 1].alive == true) {
				c = c + 1;
			} if (j != 0 && i != h - 1 && data[i + 1][j - 1].alive == true) {
				c = c + 1;
			} if (i != h - 1 && data[i + 1][j].alive == true) {
				c = c + 1;
			} if (i != h - 1 && j != w - 1 && data[i + 1][j + 1].alive == true) {
				c = c + 1;
			} if (j != w - 1 && data[i][j + 1].alive == true) {
				c = c + 1;
			} if (i != 0 && j != w - 1 && data[i - 1][j + 1].alive == true) {
				c = c + 1;
			} if (i != 0 && data[i - 1][j].alive == true) {
				c = c + 1;
			}
			if (data[i][j].alive == true) {
				if (c == 2 || c == 3) {
					new_life[i][j].alive = true;
					new_life[i][j].frames = data[i][j].frames + 1;
				} else {
					new_life[i][j].alive = false;
					new_life[i][j].frames = 0;
				}
			} else {
				if (c == 3) {
					new_life[i][j].alive = true;
					new_life[i][j].frames = 0;
				} else {
					new_life[i][j].alive = false;
					new_life[i][j].frames = data[i][j].frames + 1;
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
			var lightness = Math.max(100 - 10 * Math.sqrt(data[i][j].frames + 1), 40);
			if (data[i][j].alive == true) {
				viewport.rows[i].cells[j].style.backgroundColor = "hsl(240, 100%, " +
				lightness + "%)";
			} else {
				viewport.rows[i].cells[j].style.backgroundColor = "hsl(60, 100%, " +
				lightness + "%)";
			}
		}
	}
}
//HSL stands for Hue(відтінок), Saturation(насичення), and Lightness(яскравість)
/*Hue is a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue.
Saturation is a percentage value; 0% means a shade of gray and 100% is the full color. Lightness is also a percentage;
0% is black, 100% is white.*/
