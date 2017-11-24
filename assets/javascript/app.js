$(document).ready(function(){
//i got vars out me arse:
	let score = 0;
	let cardNumber;//0 because index and not ordinal number

	// Variable showImage will hold the setInterval when we start the slideshow
	// var showImage; give it a name so i can stop it.
	let quizTimer;

	const questions = [
	["What is the capital of France?", "Madrid", "Paris", "Detroit", "China", "B"],
	["What is a group of crows called?", "Murder", "Clique", "Britches", "Ruby", "A"],
	["What type of hound is a saluki?", "Blood", "Sweat", "Tears", "Sight", "D"],
	["What is our instructor's GitHub handle?", "Tank Engine", "Schmomas", "Mr. T", "HumbleDev", "D"],
	["Who let the dogs out?", "You", "I", "Who?", "They're not out yet", "C"]
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
				<h1>${questions[idx][0]}</h1>
				<ul>
					<li>${questions[idx][1]}</li>
					<li>${questions[idx][2]}</li>
					<li>${questions[idx][3]}</li>
					<li>${questions[idx][4]}</li>
				</ul>
				<p>Question <span>${idx + 1}</span> of <span>${questions.length}</span></p>
			</div>
		`)
	}

	// function nextQuestion(){
	// 	//show that card for a set length of time THIS IS THE TIMEOUT
	// 	 setTimeout(askQuestions, 200);
	// 			//get the next card in the array:
					
	// }



//else stop
//struggled with stopping the interval. found fix with the google-fus. 
//if the index exists, do sthg. 
	const askQuestions = function(idx) {
		if(questions[idx]){
			console.log(questions[idx]);
			renderCard(idx)
			quizTimer = setTimeout(()=>{
				askQuestions(idx + 1);
			}, 1000);
		}
		else {
			console.log("Quiz is finished");
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
	

	//vars needed. 
	//object that stores topics questions answers (r and w)
	//current question 
	//scores: right and wrong
	//interval timer and timeout timer

	//notes on questions. let be array of objects. 

	// NOTES ON INTERVAL AND TIMEOUT USAGE:
	// interval is ongoing. use this for the display of card/questions. it's on repeat.
	// timer is within the setinterval because within the rotation, you're setting a finite time to answer the question.
/*what is the interval callback? -- showing the (next) card
what is the timeout callback? -- showing the current card. 
having verb issues. show and show. one shows as in presents
the other shows as in displays. use give/ask in interval because I am asking over and over again. the other will be waiting. This part is doing my head in.*/

// I also need to show the time left. see the timer activity and the clock tutorial i did. let there be other options for showing time. there's counting down iwht numbers. there's a clock. there's a loading bar


	





















});//end of doco reado