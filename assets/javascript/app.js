/*TAs. I had to do a lot of fu of the google art on this one and felt more discombobulated with all the mini functions and dealing with setTimeout and setInterval, so i am NOT cleaning up my notes or comments until much later. I want these notes here when I look over them in the future if I want to use something from this. I'll clean it up before April*/

$(document).ready(function(){
//i got vars out me arse:
	let score = 0;
	let cardPosition = 0;//0 because index and not ordinal number
	let userAnswer; //will be determined by data-key on click. maybe also keycode?
	let seconds = 10;
	let answer;

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
	{
		species: "crows",
		options: ["Murder", "Clique", "Britches", "Ruby"],
		ansPos: 0
	},
	{
		species: "elephants",
		options: ["Circus", "Fantastic", "Parade", "Pride"],
		ansPos: 2
	},
	{
		species: "hippopotamuses",
		options: ["Bloat", "Belch", "Belly", "Band"],
		ansPos: 0
	},
	{
		species: "squids",
		options: ["Schloop", "Pod", "Crowd", "Audience"],
		ansPos: 3
	}//,
	// {
	// 	species: "toads", 
	// 	options: ["Wart", "Knot", "Coven", "Clever"],
	// 	ansPos: 1
	// },
	// {
	// 	species: "rhinoceroses", 
	// 	options: ["Flash", "Smash", "Crash", "Rash"],
	// 	ansPos: 2
	// },
	// {
	// 	species: "buffaloes", 
	// 	options: ["Obstinacy", "Stubborn", "Rudeness", "Sass"],
	// 	ansPos: 0
	// },
	// {
	// 	species: "sharks", 
	// 	options: ["Shriek", "Fright", "Nervous titter", "Shiver"],
	// 	ansPos: 3
	// },
	// {
	// 	species: "starlings", 
	// 	options: ["Quiverescence", "Flickeration", "Palpatation", "Murmuration"],
	// 	ansPos: 3
	// },
	// {
	// 	species: "lobsters",
	// 	options: [ "Snipping", "Redness", "Risk", "Caution"],
	// 	ansPos: 2
	// }
];
	//for extras
	// {
	// 	species: "salamanders?",
	// 	options: ["Meerschaum", "Maelstrom", "Schadenfreude", "Blitzkrieg"],
	// 	ansPos: 1
	// },
	// 
	// {
	// 	species: goes into a span in a div. one question but animal changes
	// 	options: array of answers. note the idx of the answer. indices of these as data-key
	// 	ansPos: index of the answer. will need to match the user's option
	// },

/////////////////////////////////////////////
//////           FUNCTIONS:            //////
/////////////////////////////////////////////


///////  THE QUESTION CARD  ///////
//just make one. you'll call this in the timeout. it'll show for the length of time on the timer
//the card will determined by the idx/count/cardNumber of array 				<img src="${questions[0].themeImg}" alt="dummytext">
	// function renderCard(idx){
	// 	$('#cardHolder').html(`
	// 		<div>
	// 			<h1>What is a group of <span class='animalName'>${questions[idx][0]}</span> called?</h1>
	// 			<ul>
	// 				<li><div class="choiceBtn" data-key="A">A. ${questions[idx][1]}</div></li>
	// 				<li><div class="choiceBtn" data-key="B">B. ${questions[idx][2]}</div></li>
	// 			</ul>
	// 			<ul>
	// 				<li><div class="choiceBtn" data-key="C">C. ${questions[idx][3]}</div></li>
	// 				<li><div class="choiceBtn" data-key="D">D. ${questions[idx][4]}</div></li>
	// 			</ul>
	// 			<p>Question <span>${idx + 1}</span> of <span>${questions.length}</span></p>
	// 		</div>
	// 	`)
	// }

	//function to pose questions. render to dom. count down starts. renders q
	//sep question from buttons
	function renderQuestion() {
	//if the index exists, render the question and reassign answer 
		if(questions[cardPosition]){
			//dom: timer
			$('#timer').html(`
			<h2 class="asideH2">Time Remaining: <span> ${seconds} secs</span></h2>
		`);//not sure if nec if i put 10 secs in html
			//dom: question
			$("#cardHolder").html(`
				<h2 class="quizQuestion">What is the word for a group of ${questions[cardPosition].species}?</h2>
			`);
			//dom: buttons. the awful part
			//arr of options that'll be buttons/divs/radio?
			let optionsArray = questions[cardPosition].options;
			//arr.forEach(function callback(currentValue, index, array) {
			//	your iterator
			//}[, thisArg]);
			optionsArray.forEach(function(option, idx){
				$("#choices").append(`
					<div class="choiceBtn" data-key="${idx}">${option}</div>
					`);
			});
			quizTimer = setInterval(timer, 1000);//this is just the seconds. not part of questioning.
		} else { //as in there are no more questions bc index dernt exist
			console.log("quiz is done");
			$("#grade").html(`
				<h2 class="asideH2">Time is up!</h2>
				<p>Final score: ${score} right and ${questions.length - score} wrong for ${score/questions.length * 100}%.</p>
				<p>Hit "Restart" to play again?</p>
			`);
			$("#start").text("Restart").show();

		}
	}

//////// THE CHANGE / NEW QUESTION (the interval) ////////
// move up the card deck cardPos
//restart timer. reset seconds. reset html dom elems timer
function newCard() {
	cardPosition++;
	clearInterval(quizTimer);
	seconds = 10;
	$("#cardHolder").html('');
	$("#choices").html('');
	setTimeout(()=>{
		$("#grade").html('');
		$('#timer').html(`
			<h2 class="asideH2">Time Remaining: <span> 10 secs</span></h2>
		`);
		renderQuestion();
	}, 2000)
}


//////// THE TIMER (the look, not the timing) ////////
//function that shows the counting down. that fcn is passed into setTimeout
//count set at a time. goes down every 1000ms.
//does nothing but decrement time remaining. html done thorugh var of timeRem
//maybe a warning? v2
//if no more time, ask next question, give right or wrong notice
//if more time, show next second
//buttons load but need to empty first.
function timer(){
	seconds--;
	if(seconds <= 0){
		showMessage("unanswered");
		setTimeout(()=>{
			newCard();
		}, 2000);
	} else {
		$('#timer').html(`
			<h2 class="asideH2">Time Remaining: <span>${seconds} secs</span></h2>
		`);
	}
};

function showMessage(result){
	if(result === "correct"){
			$("#grade").html(`
				<h1>Huzzah!</h1>
				<p>Score: ${score}/${questions.length}</p>
				`);
	} else if(result === "incorrect") {
			$("#grade").html(`
				<h1>Bugger!</h1>
				<p>Answer was ${answer}. Score: ${score}/${questions.length}</p>
				`);
	} else if(result === "unanswered") {
			$("#grade").html(`
				<h1>Oops, pokeypants!</h1>
				<p>Answer was ${answer}. Score: ${score}/${questions.length}</p>
				`);
	}
}

//clear old results, clean up. renderqeustuion fcn
	function startQuiz(){
		$(this).hide();
		$("#stop").show();
		cardPosition = 0;
		seconds = 10;
		$("#choices").empty();
		renderQuestion();
	}
//a quit midway fcn so my patience isn't totally gone.
	function stopQuiz(){
		$(this).hide();
		$("#start").show();
		clearTimeout(quizTimer);
	}

//////////////////////////////////////////////
//////////     THE EVENTS       //////////////
//////////////////////////////////////////////

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
	
		// $("#start").on("click", startQuiz);
		// $("#stop").on("click", stopQuiz);
	$("#start").click(startQuiz);//works. am happy
	$("#stop").click(stopQuiz);// works. am happy

	$("#choices").on("click", ".choiceBtn", function(e){
		$('#timer').html('');
		//why didn't dataset work? jQ?
		userAnswer = $(this).data("key");
		//get this squestion's correct answer's position
		let answerPos = questions[cardPosition].ansPos;
		answer = questions[cardPosition].options[answerPos];
		if(userAnswer == answerPos){
			score++;
			showMessage("correct");
		} else {
			showMessage("incorrect");
		}
		newCard();
	});



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