

/* Filing System */

var bashSystem = {
	"root": {
		"welcome.md" 	:	{"url":"welcome.md"},
		"help.md"		:	{"url":"help.md"},
		"applications"	:	{
			"anagram.sh"	: {}
		},
		"asteroid.sh"	:	{},
		"about"			:	{
			"test"			:	{
				"banana"		: {

				}
			},
			"about.md"		:	"url"
		},
		"happy"			:	{
			"test"			: {},
			"banana"		: {}
		},
		"happy1"			:	{
			"test"			: {},
			"banana"		: {}
		},
		"happy2"			:	{
			"test"			: {},
			"banana"		: {}
		},
		"happy3"			:	{
			"test"			: {},
			"banana"		: {}
		}
	}
}

/* Variables */

var sectionsArray = ["experience","education","about","skills","contact","interests","design"],
	commandLine = document.querySelector('#command-line .commands'),
	visibleSection = document.getElementById('visible-sections'),
	commandIndex = 0;

var	functionsArray = ["cd", "ls", "sudo", "cat", "help"],
	pastCommands = [],
	currentDirectory = "root",
	bashDirectories = ["algorithms"];

/*
 *	Utility Functions
 */

function getExactPath(path) {
	var currentPathArray = currentDirectory.split('/');
	var relativePathArray = path.split('/');
	var exact_path = "";
	for (var i = relativePathArray.length; i >= 0; i--) {
		if (relativePathArray[i] == "..") {
			currentPathArray.splice(-1,1);
			relativePathArray.splice(i, 1);
		}
	}
	exact_path = currentPathArray.join('/') + '/' + relativePathArray.join('/');
	return exact_path.replace(/^\/|\/$/g, '');;
}

function isDirectory(dir) {
	var dirArray = dir.split('/');
	var tempArray = bashSystem;
	for (var i = 0; i < dirArray.length; i++) {
		if (tempArray[dirArray[i]]) {
			if (dirArray[i].indexOf('.') > -1) {
				return false;
			} else {
				tempArray = tempArray[dirArray[i]];
			}
		} else {
			return false;
		}
	}
	return true;
}

function isFile(dir) {
	var dirArray = dir.split('/');
	var tempArray = bashSystem;
	for (var i = 0; i < dirArray.length; i++) {
		if (tempArray[dirArray[i]]) {
			if (dirArray[i].indexOf('.') > -1) {
				return true;
			} else {
				tempArray = tempArray[dirArray[i]];
			}
		} else {
			return false;
		}
	}
	return false;
}

/*
 *	Control Functions
 */

function changeDirectory(dir) {
	var newDir = getExactPath(dir);
	if (isDirectory(newDir)){
		currentDirectory = newDir;
		return true;
	} else {
		return false;
	}
}

function readDirectory(dir) {
	var newDir = getExactPath(dir);
	if (isDirectory(newDir)){
		newDirArray = newDir.split('/');
		var tempArray = bashSystem;
		var returnString = "<br><br>";
		var longestString = 0;
		var width = 4;
		if (newDir == "root") {
			tempArray = bashSystem["root"];
		} else {
			for (var i = 0; i < newDir.length; i++) {
				if (tempArray[newDirArray[i]]) {
					tempArray = tempArray[newDirArray[i]];
				}
			}
		}
		for(var key in tempArray) {
			if (key.length > longestString) {
				longestString = key.length + 2;
			}
		}
		for(var key in tempArray) {
			if (width <= 0) {
				returnString += "<br><br>";
				width = 4;
			}
			width -= 1;
			var spaceCount = longestString - key.length;
			var space = "&nbsp;";
			var color = "#397FD6";
			if (key.indexOf('.') > -1) {
				if (key.slice(-2) == "sh") {
					color = "#EA5E59";
				} else {
					color = "#73B264";
				}
			}
			returnString += space.repeat(3) + "<span style='color:" + color + ";'>" + key + space.repeat(spaceCount) + "</span>";
		}
		returnString += "<br><br>";
		return returnString;
	} else {
		return "<br><p>-bash: ls: " + dir + ": No such directory</p>";
	}
}

function readFile(dir) {
	var newDir = getExactPath(dir);
	if (isFile(newDir)){
		newDirArray = newDir.split('/');
		var tempArray = bashSystem;
		var returnString = "<br><br>";
		var longestString = 0;
		var width = 4;
		if (newDir == "root") {
			tempArray = bashSystem["root"];
		} else {
			for (var i = 0; i < newDir.length; i++) {
				if (tempArray[newDirArray[i]]) {
					tempArray = tempArray[newDirArray[i]];
				}
			}
		}
		var ajaxURL = "content/" + tempArray["url"];
		var xhttp = new XMLHttpRequest();
		  	xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
					var responseTextArray = this.responseText.split( /\n/g);
					for (var i = 0; i < responseTextArray.length; i++) {
						if (responseTextArray[i].substring(0, 3) == "###") {
							createSection("<br><h2>" responseTextArray[i] "</h2>");
						} else {
							createSection("<br><span>" responseTextArray[i] "</span>");
						}
					}
			    }
		  	};
		xhttp.open("GET", ajaxURL, true);
		xhttp.send();
		/*
		for(var key in tempArray) {
			if (width <= 0) {
				returnString += "<br><br>";
				width = 4;
			}
			width -= 1;
			var spaceCount = longestString - key.length;
			var space = "&nbsp;";
			var color = "#397FD6";
			if (key.indexOf('.') > -1) {
				if (key.slice(-2) == "sh") {
					color = "#EA5E59";
				} else {
					color = "#73B264";
				}
			}
			returnString += space.repeat(3) + "<span style='color:" + color + ";'>" + key + space.repeat(spaceCount) + "</span>";
		}
		*/
		//returnString += "<br><br>";
		//return returnString;
	} else {
		return "<br><p>-bash: ls: " + dir + ": No such directory</p>";
	}
}

/* Bash Functions */

function cd(dir) {
	if (dir) {
		if (changeDirectory(dir)) {
			createSection("<br>");
		} else {
			createSection("<br><p>-bash: cd: " + dir + ": No such directory</p>");
		}
	} else {
		currentDirectory = "root";
		createSection("<br>");
	}
}

function ls(dir) {
	if (dir) {
		createSection(readDirectory(dir));
	} else {
		createSection(readDirectory(""));
	}
}

function pwd() {
	createSection("<br><span>~" + currentDirectory.slice(4) + " $</span> /Users/jacobhenning/resume/" + currentDirectory.slice(5));
}

function help() {
	createSection("<br><br>");
	createSection(" <span style='color:#C37938;'> cd </span> <span style='color:#E5DC60;'> (argument) </span> <span> - Change current directory </span>");
	createSection("<br>");
	createSection(" <span style='color:#C37938;'> ls </span> <span style='color:#E5DC60;'> (argument) </span> <span> - Display sub-directories </span>");
	createSection("<br>");
	createSection(" <span style='color:#C37938;'> pwd </span> <span style='color:#E5DC60;'>  </span> <span> - Show current path </span>");
	createSection("<br>");
}

function cat(dir) {
	if (dir) {
		readFile(dir);
	} else {
		createSection("<br>-bash: " + "cat" + ": Invalid, no argument found. Enter '--help' for assistance.");
	}
}

function keyPressHandler(e) {
	var code = (e.keyCode) ? e.keyCode: e.charCode;

	if( e.metaKey || e.ctrlKey || e.altKey )
		return;

	e.preventDefault();
	commandIndex--;

	switch(code) {
		case 8:
			backspaceKey();
			break;
		case 13:
			enterKey();
			break;
		case 32:
			addCharSpace();
			break;
		case 187:
		case 61:
			addCharPlusEquals(e);
			break;
		case 189:
		case 109:
		case 173:
			addCharDash();
			break;
		case 38:
			upArrowKey();
			break;
		case 190:
			periodKey();
			break;
		case 191:
			regexKey();
			break;
		case 40:
			commandIndex += 2;
			downArrowKey();
			break;
		default:
			if( e.shiftKey )
				return;

			letterKey(code);
			break
	}
}
document.addEventListener("keydown", keyPressHandler);

function enterKey() {
	var command = commandLine.innerText || commandLine.textContent;
	command = command.trim();
	// Store in past commands array
	pastCommands.push(command);
	// Add the completed command to the content section
	var completed = document.createElement('div');
	completed.classList.add('completed-command');
	completed.innerHTML = document.getElementById('command-line').innerHTML;
	visibleSection.appendChild(completed);

	var commandArray = command.split(/\s+/);

	if (commandArray.length == 1 && commandArray[0].length > 0) {
		switch(commandArray[0]) {
			case 'cd':
				cd();
				break;
			case 'ls':
				ls();
				break;
			case 'pwd':
				pwd();
				break;
			case 'cat':
				cat();
				break;
			case 'help':
				help();
				break;
			default:
				if(isDirectory(currentDirectory + '/' + commandArray[0])) {
					createSection("<br><span>~" + currentDirectory.slice(4) + " $</span> /Users/jacobhenning/resume" + currentDirectory.slice(4) + '/' + commandArray[0] + " is a directory");
				} else if (isFile(currentDirectory + '/' + commandArray[0])){
					createSection("<br><span>~" + currentDirectory.slice(4) + " $</span> /Users/jacobhenning/resume" + currentDirectory.slice(4) + '/' + commandArray[0] + " is a file");
				} else {
					createSection("<br>-bash: " + command + ": not a valid command or directory. Enter '--help' for assistance.");
				}
				break;
		}
	} else if (commandArray.length == 2) {
		switch(commandArray[0]) {
			case 'cd':
				cd(commandArray[1]);
				break;
			case 'ls':
				ls(commandArray[1]);
				break;
			case 'pwd':
				pwd();
				break;
			case 'cat':
				cat(commandArray[1]);
				break;
			default:
				createSection("<br>-bash: " + command + ": not a valid command or directory. Enter '--help' for assistance.");
				break;
		}
	} else if (command.length > 0) {
		createSection("<br>-bash: " + command + ": not a valid command or directory. Enter '--help' for assistance.");
	} else new Promise(function(resolve, reject) {
		createSection("<br>");
	});
	document.getElementById('command-line').firstElementChild.innerHTML = "<span>~" + currentDirectory.slice(4) + " $</span>";
	commandLine.innerHTML = '<b></b>';
}

function appendSection(section) {
	var newContent = document.createElement('div');
	newContent.innerHTML = document.getElementById(section).innerHTML;

	visibleSection.appendChild(newContent);
	commandLine.scrollIntoView(false);
}

function createSection(content) {
	var newContent = document.createElement('div');
	newContent.innerHTML = content;

	visibleSection.appendChild(newContent);
	commandLine.scrollIntoView(false);
}

function backspaceKey() {
	var str = commandLine.innerHTML;

	str = str.substring(0, str.length - 1);

	if( str.slice(-5) === '&nbsp' ) {
		str = str.substring(0, str.length - 5);
	}

	commandLine.innerHTML = str;
}

function periodKey() {
	commandLine.innerHTML += '&#46;';
}

function regexKey() {
	commandLine.innerHTML += '&#47;';
}

function letterKey(code) {
	var c = '';

	if( (code > 47 && code < 58) || (code > 95 && code < 106) ) {
		// Top numbers
		c = code - 48;

		// Keypad numbers
		if( c > 9 ) {
			c = c - 48;
		}

	} else {
		// Letters
		code = code + 32;
		c = String.fromCharCode(code);
	}

	commandLine.innerHTML += c;
}

function addCharSpace() {
	commandLine.innerHTML += '&nbsp;';
}

function addCharDash() {
	commandLine.innerHTML += '-';
}

function addCharPlusEquals(e) {
	if(e.shiftKey) {
		commandLine.innerHTML += '+';
	} else {
		commandLine.innerHTML += '=';
	}
}

function upArrowKey() {
	if( commandIndex < 0 ) {
		commandIndex = pastCommands.length - 1;
	}

	commandLine.innerHTML = pastCommands[commandIndex] + '<b></b>';
}

function downArrowKey() {
	// Get next command
	if( commandIndex >= pastCommands.length ) {
		commandLine.innerHTML = '<b></b>';
	} else {
		commandLine.innerHTML = pastCommands[commandIndex] + '<b></b>';
	}
}
