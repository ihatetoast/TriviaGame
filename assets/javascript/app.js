$(document).ready(function(){
//i got vars out me arse:
	let score = 0;
	let cardNumber;//0 because index and not ordinal number
	// let userAnswer; //will be determined by data-key on click. maybe also keycode?


	// Variable showImage will hold the setInterval when we start the slideshow
	// var showImage; give it a name so i can stop it.
	let quizTimer;

/*Array todo: build out to 100. comment out all but 10 at first
set cardnumber to be an array with random numbers from 0 to the array length minus 10
so that the test taker gets 10 random ones. 
until you figure that out, though, stick with 10.
OOOOOOOOOORRRR shuffle the array before each quiz.
*/
	const questions = [
	["crows", "Murder", "Clique", "Britches", "Ruby", "A"],
	["elephants", "Circus", "Fantastic", "Parade", "Pride", "C"],
	["hippopotamuses", "Bloat", "Belch", "Belly", "Band", "A"],
	["squids", "Schloop", "Pod", "Crowd", "Audience", "D"],
	["toads", "Wart", "Knot", "Coven", "Clever", "B"],
	["rhinoceroses", "Flash", "Smash", "Crash", "Rash", "C"],
	["buffaloes", "Obstinacy", "Stubborn", "Rudeness", "Sass", "A"],
	["sharks", "Shriek", "Fright", "Nervous titter", "Shiver", "D"],
	["starlings", "Quiverescence", "Flickeration", "Palpatation", "Murmuration", "D"],
	["lobsters", "Snipping", "Redness", "Risk", "Caution", "C"]
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],
	// ["salamanders?", "Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg", "B"],

	
	]

	/*events (HEY, TAs! I TRIED A FEW VERSIONS AND THEY ALL WORK. OTHER 
	THAN ONE BEING BULKY, IS THERE REALLY A PREFERENCE?)*/
	// $("#start").on("click", function(){
	// 	// console.log("START button booped");
	// 	startQuiz();
	// });
	// 	$("#stop").on("click", function(){
	// 	// console.log("STOP button booped");
	// 	stopQuiz();
	// });
	$("#start").click(startQuiz);//works. am happy
	$("#stop").click(stopQuiz);// works. am happy
		// $("#start").on("click", startQuiz);
		// $("#stop").on("click", stopQuiz);

//just make one. you'll call this in the timeout. it'll show for the length of time on the timer
//the card will determined by the idx/count/cardNumber of array 				<img src="${questions[0].themeImg}" alt="dummytext">
	function renderCard(idx){
		$('#cardHolder').html(`
			<div>
				<h1>What is a group of <span class='animalName'>${questions[idx][0]}</span> called?</h1>
				<ul>
					<li><div class="choiceBtn" data-key="A">A. ${questions[idx][1]}</div></li>
					<li><div class="choiceBtn" data-key="B">B. ${questions[idx][2]}</div></li>
				</ul>
				<ul>
					<li><div class="choiceBtn" data-key="C">C. ${questions[idx][3]}</div></li>
					<li><div class="choiceBtn" data-key="D">D. ${questions[idx][4]}</div></li>
				</ul>
				<p>Question <span>${idx + 1}</span> of <span>${questions.length}</span></p>
			</div>
		`)
	}

let correctAnswer;
let userAnswer;
//else stop
//struggled with stopping the interval. found fix with the google-fus. 


//function to ask all the questions
	const askQuestions = function(idx) {
	//if the index exists, render the question and reassign answer 
		if(questions[idx]){
			renderCard(idx)
			correctAnswer = questions[idx][5];
		}
		else {
			console.log("Quiz is finished");
		}
		quizTimer = setTimeout(()=>{
				askQuestions(idx + 1);
			}, 5000);	
	}

	$("#cardHolder").on("click", ".choiceBtn", function(){
		userAnswer = this.dataset.key;
		console.log(`user's answer is ${userAnswer}`);
		console.log(`Correct answer is ${correctAnswer}`);
		checkAnswer(correctAnswer, userAnswer);
	});

function checkAnswer(actual, guess){
	if(actual == guess){
		score++;
		console.log(`user is right. score is now ${score} out of 10`);
	} else {
		console.log(`user is wrong score is still ${score} out of 10`);
	}
}


	function startQuiz(){
		cardNumber = 0;
		console.log("quiz started");
		askQuestions(cardNumber);
	}

	function stopQuiz(){
		console.log("stopQuiz fired");
		clearTimeout(quizTimer);
		
	}

//like the slide show inclass work
//so we need array of something to show. array of objs?

//variable of hte setInterval that runs the rotation of quiz cards

//functions to start, stop restart, (see below)
	//render question to the page renderCard timeQuestion
	//check if answer is correct
	//get the (next) card (clock ticks/time down. shown. see timer exercise)
		//if at the end, you're done. total?


//events
//onkeyup, store that as an answer and then compare
//reset as button at the end of the game
//onclick with dynamically loaded elems
	// As of jQuery 1.7 you should use jQuery.fn.on:
	// $(staticAncestors).on(eventName, dynamicChild, function() {});



	//vars needed. 
	//object that stores topics questions answers (r and w)
	//current question 
	//scores: right and wrong
	//interval timer and/or timeout timer

	// NOTES ON INTERVAL AND TIMEOUT USAGE:
	// interval is ongoing. use this for the display of card/questions. it's on repeat.
	// timer is within the setinterval because within the rotation, you're setting a finite time to answer the question.
/*what is the interval callback? -- showing the (next) card
what is the timeout callback? -- showing the current card. 
having verb issues. show and show. one shows as in presents
the other shows as in displays. use give/ask in interval because I am asking over and over again. the other will be waiting. This part is doing my head in.*/

// I also need to show the time left. see the timer activity and the clock tutorial i did. let there be other options for showing time. there's counting down iwht numbers. there's a clock. there's a loading bar


	
				// console.log(typeof userAnswer); //string
				// console.log(typeof correctAnswer);//




















});//end of doco reado