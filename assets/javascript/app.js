
$(document).ready(function(){
	
//question bank:
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
	},
	{
		species: "toads", 
		options: ["Wart", "Knot", "Coven", "Clever"],
		ansPos: 1
	},
	{
		species: "rhinoceroses", 
		options: ["Flash", "Smash", "Crash", "Rash"],
		ansPos: 2
	},
	{
		species: "buffaloes", 
		options: ["Obstinacy", "Stubborn", "Rudeness", "Sass"],
		ansPos: 0
	},
	{
		species: "sharks", 
		options: ["Shriek", "Fright", "Nervous titter", "Shiver"],
		ansPos: 3
	},
	{
		species: "starlings", 
		options: ["Quiverescence", "Flickeration", "Palpatation", "Murmuration"],
		ansPos: 3
	},
	{
		species: "lobsters",
		options: [ "Snipping", "Redness", "Risk", "Caution"],
		ansPos: 2
	},
	{
		species: "otters",
		options: [ "Nookie", "Romp", "Roll", "Thrill"],
		ansPos: 1
	},
	{
		species: "cormorants",
		options: [ "Swallow", "Gag", "Sniff", "Gulp"],
		ansPos: 3
	},
	{
		species: "ravens",
		options: [ "zanpf", "meanness", "unkindness", "rudeness"],
		ansPos: 2
	},
	{
		species: "jellyfish",
		options: [ "morph", "bloom", "bleurph", "scurry"],
		ansPos: 2
	},
	{
		species: "jays",
		options: [ "scold", "grounding", "tisk", "grump"],
		ansPos: 0
	},
	{
		species: "foxes",
		options: [ "shyness", "creeping", "slither", "skulk"],
		ansPos: 3
	},
	{
		species: "vultures",
		options: [ "kettle", "all of them", "committee", "wake"],
		ansPos: 1
	},
	{
		species: "zebras",
		options: [ "stripe", "dazzle", "clodding", "sleft"],
		ansPos: 1
	},
	{
		species: "peacocks",
		options: [ "ostentation", "glory", "fanning", "fluster"],
		ansPos: 0
	}
];

const rando = Math.floor(Math.random() * ((questions.length) - 10));
//i got vars out me arse:
	let score = 0;
	console.log(rando);
	console.log(questions.length);
	let userAnswer = null; 
	let answer = null;
	var quizTimer;
	let seconds = 10;
	let cardPosition;

	//for extras
	/*randomize questions if i get more than 10. get 10 random numbers
	push to array, let those be the question?
	In ES6, Array#from and Arrow function can be used.
		Array.from({length: 6}, () => Math.floor(Math.random() * 9));
		but no repeating
	var foo = new Array(45);//create an empty array with length 45
	then when you want to use it... (un-optimized, just for example)

	for(var i=0;i<foo.length;i++){
  document.write('Item: ' + (i+1) + ' of ' + foo.length + '<br/>'); 
}


	*/
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
	//function to pose questions. render to dom. count down starts. renders q
	//sep question from buttons
	function renderQuestion() {
		if(questions[cardPosition]){

			$('#timer').html(`
			<h2 class="asideH2">Time Remaining: <span> ${seconds} secs</span></h2>`);

			$("#cardHolder").html(`
				<h2 class="quizQuestion">What is the word for a group of ${questions[cardPosition].species}?</h2>`);

			let optionsArray = questions[cardPosition].options;
			optionsArray.forEach(function(option, idx){
				$("#choices").append(`
					<div class="choiceBtn" data-key="${idx}">${option}</div>
					`);
			});

			quizTimer = setInterval(timer, 1000);

		} else { 
			$("#grade").html(`
				<h2 class="asideH2">Time is up!</h2>
				<p>Final score: ${score} right and ${questions.length - score} wrong for ${score/questions.length * 100}%.</p>
				<p>Hit "Restart" to play again?</p>
			`);
			$("#start").text("Restart").show();
		}
	};

//////// THE CHANGE / NEW QUESTION (the interval) ////////
// move up the card deck cardPos
//restart timer. reset seconds. reset html dom elems timer
	function newCard() {
		cardPosition++;
		clearInterval(quizTimer);
		seconds = 10;

		setTimeout(()=>{
			wipeOut();
			renderQuestion();
		}, 2000)
	};

function timer(){
	seconds--;

	if(seconds <= 0){
		clearInterval(quizTimer);
		showMessage("unanswered");
		$("#cardHolder").empty();
		$("#choices").empty();
		setTimeout(function(){
			wipeOut();
			newCard();
		}, 2000);
	} 
	else {
		$('#timer').html(`
			<h2 class="asideH2">Time Remaining: <span>${seconds} secs</span></h2>`);
	}
};

	function wipeOut (){
		seconds = 10;
		$('#grade').empty();
		$("#cardHolder").empty();
		$("#choices").empty();
	};

	function showMessage(result){
		if(result === "correct"){
				$("#grade").html(`
					<h2>Huzzah!</h2>
					<p>Score: ${score}/${questions.length}</p>
					`);
		} else if(result === "incorrect") {
				$("#grade").html(`
					<h2>Bugger!</h2>
					<p>Answer was ${answer}. Score: ${score}/${questions.length}</p>
					`);
		} else if(result === "unanswered"){
			$("#grade").html(`
					<h2>Pokey pants!</h2>
					<p>Answer was ${answer}. Score: ${score}/${questions.length}</p>
					`);
		}
	}


	function startQuiz(){
		cardPosition = rando;
		seconds = 10;
		score = 0;
		wipeOut();
		$(this).hide();
		$(".intro").hide();
		$("#stop").show();
		
		renderQuestion();
	}


//////////////////////////////////////////////
//////////     THE EVENTS       //////////////
//////////////////////////////////////////////

	$("#start").click(startQuiz);//works. am happy

	$("#choices").on("click", ".choiceBtn", function(e){
		$('#timer').empty();
		$("#cardHolder").empty();
		$("#choices").empty();
		userAnswer = $(this).data("key");

		let answerPos = questions[cardPosition].ansPos;
		answer = questions[cardPosition].options[answerPos];

		if(userAnswer === answerPos){
			score++;
			showMessage("correct");
		} else {
			showMessage("incorrect");
		}
		newCard();
	});


/*Array todo: build out to 100. comment out all but 10 at first
set cardnumber to be an array with random numbers from 0 to the array length minus 10
so that the test taker gets 10 random ones. 
until you figure that out, though, stick with 10.
OOOOOOOOOORRRR shuffle the array before each quiz.
*/

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


// optionsArray.forEach(function(option, idx){ 
// 				var child = $("<div class='choiceBtn' data-key="+idx+">"+option+"</div>");
// 				child.on()
// 				$("#choices").append(`
					
// 					`);
// 			})















});//end of doco reado