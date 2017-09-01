
var w = 0;
var str = "charlie"
var g = str.length;


var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m",
				"n","o","p","q","r","s","t","u","v","w","x","y","z"];

var gameWord = [];
var wordArray = [];
var badArray = [];
var winArray = [];

var showButton = document.getElementById("showBtn");
var hideButton = document.getElementById("hideThisImage");

var gif1 = document.getElementById("gif1");


var guessesLeft = document.getElementById("guesses");
guessesLeft.textContent = g;
var totalWins = document.getElementById("wins");
totalWins.textContent = w;

var userText = document.getElementById("user-text");

var gameField = document.getElementById("field");
var lettersBox = document.getElementById("lettersBox");
var wordField = document.getElementById("wordField");

var hintSpan = document.getElementById("hintSpan");

var strArr = [	{word : "charlie"},
				{word : "fight milk"}, 
				{word : "kitten mittens"}, 
				{word : "rum ham"},
				{word : "thundergun express"},
				{word : "sweet dee"},
				{word : "dancing guy"},
				{word : "mantis tobagen"}];

var hintArr = [	{hint : "https://media.giphy.com/media/3oKIP9iTS7Ze73m1P2/source.gif"}, 
				{hint : "https://media.giphy.com/media/Na2i9xObnOz3W/giphy.gif"}, 
				{hint : "https://media.giphy.com/media/3o7TKNkzG2YLWPpYBO/giphy-downsized.gif"}, 
				{hint : "https://media.giphy.com/media/KzehnNYodSixq/giphy-downsized.gif"}, 
				{hint : "https://media.giphy.com/media/13FbShKpIOqeYM/source.gif"},
				{hint : "https://media.giphy.com/media/EKDIMDsRX3ihy/giphy-downsized.gif"},
				{hint : "https://media.giphy.com/media/cRIjb27zVtx6/giphy-downsized.gif"},
				{hint : "https://media.giphy.com/media/vfgMzIW1EaFAk/giphy.gif"}];

var clipArr = [ {clip : "https://www.youtube.com/embed/jfWMB-blQS8"},
				{clip : ""},
				{clip : ""},
				{clip : ""},
				{clip : ""},
				{clip : ""}];



window.onload = function generateWordAndHint() {


	var x = Math.floor(Math.random() * strArr.length);
	str = strArr[x].word;
	// console.log(str);

	hintSpan.innerHTML = "<img src='" + hintArr[x].hint +"' width='300' height='200'>";

	strArr.splice(x, 1);
	hintArr.splice(x, 1);

	// console.log(strArr.length);


	for (var i = 0; i < str.length; i++) {
		gameWord.push("_");
		var sub = str.substring(i, i = i + 1);
		winArray.push(sub);
		winArray.textContent = winArray.join(" ");
		// console.log(winArray);

		i = i - 1;
	}
		if (str.indexOf(" ") > -1) {
			gameWord.splice(str.indexOf(" "), 1, "-");
			winArray.splice(str.indexOf(" "), 1, "-");
		}
		wordField.textContent = gameWord.join(" ");
		// console.log(gameWord);

}

function regenerateWordAndHint() {

	gameWord = [];
	winArray = [];

	console.log(alphabet.join(" "));

	var x = Math.floor(Math.random() * strArr.length);
	str = strArr[x].word;
	// console.log(str);

	hintSpan.innerHTML = "<img src='" + hintArr[x].hint +"' width='300' height='200'>";

	strArr.splice(x, 1);
	hintArr.splice(x, 1);

	// console.log(strArr.length);

	for (var i = 0; i < str.length; i++) {
		gameWord.push("_");
		var sub = str.substring(i, i = i + 1);
		winArray.push(sub);
		winArray.textContent = winArray.join(" ");
		// console.log(winArray);

		i = i - 1;
	}
		if (str.indexOf(" ") > -1) {
			gameWord.splice(str.indexOf(" "), 1, "-");
			winArray.splice(str.indexOf(" "), 1, "-");
		}
		wordField.textContent = gameWord.join(" ");
		// console.log(gameWord);
	

	
}


// function wrongGuess () {

// 	g--;
// 	guessesLeft.textContent: g;

// }

document.onkeyup = function guessWord (event) {


	var userGuess = event.key;
	var letterStr = lettersBox.innerHTML;
	letterStr = letterStr.toLowerCase();

	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i] === userGuess){
			userText.textContent = event.key;
		
			// for (var i = 0; i < str.length; i++) {
			
			
				if(str.indexOf(userGuess) > -1){
				var letterIndex = str.indexOf(userGuess);
				var delIndex = alphabet.indexOf(userGuess)
				var goodAlph = [];
				
					for (var i = 0; i < alphabet.length; i++) {
						goodAlph.push(alphabet[i]);
					}
				eliminateDuplicates(gameWord, str, userGuess);
				wordField.textContent = gameWord.join(" ");
				
				lettersBox.textContent = goodAlph.join(" ").toUpperCase();
				
				// console.log(gameWord);

				checkForWin();

				
				}
				else{
				var wrongLetterIndex = str.indexOf(userGuess);
				var wrongDelIndex = alphabet.indexOf(userGuess);
				var badAlph = [];
					for (var i = 0; i < alphabet.length; i++) {
						badAlph.push(alphabet[i]);
					}
				badAlph.splice(wrongDelIndex, 1);
				badArray.splice(wrongLetterIndex, 1, userGuess);
				
				lettersBox.textContent = badAlph.join(" ").toUpperCase();
				g--;
				guessesLeft.textContent = g;

					if (g === 0) {

						gameOver();
						userText.textContent = "";
						document.getElementById("userLbl").style.display = "none";
						for (var i = 0; i < alphabet.length; i++) {
							alphabet.splice(i, 1);
						}
						hintSpan.innerHTML = "<img src='assets/images/frankHanging.png' width='300' height='450'>";
						// console.log(alphabet);

						// gameField.style.display = "none";
						hideButton.style.display = "none";
						showButton.style.display = "none";
						lettersBox.textContent = "Game Over!";
						document.getElementById("guessLbl").style.display = "none";
						document.getElementById("winLbl").style.display = "none";
						document.getElementById("rules").style.display = "none";

						$(lettersBox).on("click", function(){
							location.reload();
						})

						

						}

					}

				}
			// }
		}
	}

showButton.onclick = function showHint() {
	gif1.style.display = "block";
}

hideButton.onclick = function hideHint() {
	gif1.style.display = "none";
}

function eliminateDuplicates(arr, str, char) {

	for(var i=0; i<str.length;i++) {
    if (str[i] === char) {
 
    			arr.splice(i, 1, char);
    	
		}
	}
}

function newGame() {

	// console.log(g);

	g = 7;
	w = 0;

	hideButton.style.display = "initial";
	showButton.style.display = "initial";
	lettersBox.textContent = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
	document.getElementById("guessLbl").style.display = "initial";
	document.getElementById("winLbl").style.display = "initial";
	document.getElementById("rules").style.display = "initial";

	var strArr = [	{word : "charlie"},
				{word : "fight milk"}, 
				{word : "kitten mittens"}, 
				{word : "rum ham"},
				{word : "thundergun express"},
				{word : "sweet dee"},
				{word : "dancing guy"},
				{word : "mantis tobagen"}];

	var hintArr = [	{hint : "https://media.giphy.com/media/3oKIP9iTS7Ze73m1P2/source.gif"}, 
				{hint : "https://media.giphy.com/media/Na2i9xObnOz3W/giphy.gif"}, 
				{hint : "https://media.giphy.com/media/3o7TKNkzG2YLWPpYBO/giphy-downsized.gif"}, 
				{hint : "https://media.giphy.com/media/KzehnNYodSixq/giphy-downsized.gif"}, 
				{hint : "https://media.giphy.com/media/13FbShKpIOqeYM/source.gif"},
				{hint : "https://media.giphy.com/media/EKDIMDsRX3ihy/giphy-downsized.gif"},
				{hint : "https://media.giphy.com/media/cRIjb27zVtx6/giphy-downsized.gif"},
				{hint : "https://media.giphy.com/media/vfgMzIW1EaFAk/giphy.gif"}];

				regenerateWordAndHint();

}


function checkForWin(){

	if (gameWord.indexOf("_") === -1) {
				
		w++;
		totalWins.textContent = w;
		userText.textContent = "nice guess !!!";
		gameWord = ["_"];
		winArray = ["_"];
		regenerateWordAndHint();

		if (w === 8) {

		lettersBox.textContent = "Congrats! You Win!!!"
		userText.textContent = '';
		
		$(showButton).html("Play Again");
		$(hideButton).html("Watch a Clip");

		$(showButton).on("click", function(){

			location.reload();

		})

		$(hideButton).on("click", function(){

			hintSpan.innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/jfWMB-blQS8' frameborder='0' allowfullscreen></iframe>";

		})
		
	}
	else{
		regenerateWordAndHint();
}
		}


}

function gameOver(){

	for (var i = 0; i < str.length; i++)
	{
		var sub = str.substring(i, i = i + 1);
		wordArray.push(sub);
		wordField.textContent = "Correct answer: " + wordArray.join("");
		// console.log(wordArray);
		i = i - 1;
	}

}

function checkWord(arr) {

	if(str.indexOf(arr[0] > -1) && str.indexOf(arr[1] > -1) && str.indexOf(arr[2] > -1) 
		&& str.indexOf(arr[3] > -1) && str.indexOf(arr[4] > -1) &&
		str.indexOf(arr[5] > -1) && str.indexOf(arr[6] > -1))
	{
			w++;
			document.getElementById("wins").textContent ="Wins: " + w;	
			// console.log(arr);
	}

}


