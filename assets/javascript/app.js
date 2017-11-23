$(document).ready(function(){
	$('#boop').html(`<h1>BOOYEAH! I LOADED</h1>`);

	let score = 0;
	let cardNumber = 1;//0 because index and not ordinal number
	const questionCard =[{
		question: "Is this a question?",
		options: ["one", "two", "three", "four"],
		answerIdx: 0,
		themeImg: "http://static.donquijote.org/images/tops/600/numbers.jpg"
	},
	{
		question: "Is this another question",
		options: ["aye", "bee", "cee", "dee"],
		answerIdx: 1,
		themeImg: "https://i.pinimg.com/originals/36/d9/4a/36d94af52287c56bdaf963709204ef86.jpg"
	}];

//just make one. you'll call this in the timeout. it'll show for the length of time on the timer
//the card will determined by the idx/count/cardNumber of array
	function renderCard(){
		$('#cardHolder').html(`
			<div>
				<h1>${questionCard[cardNumber].question}</h1>
				<img src="${questionCard[cardNumber].themeImg}" alt="dummytext">
				<ul>
					<li>${questionCard[cardNumber].options[0]}</li>
					<li>${questionCard[cardNumber].options[1]}</li>
					<li>${questionCard[cardNumber].options[2]}</li>
					<li>${questionCard[cardNumber].options[3]}</li>
				</ul>
			</div>
		`)
	}
	renderCard();

//like the slide show inclass work
//so we need array of something to show. array of objs?

//variable of hte setInterval that runs the rotation of quiz cards

//functions to start, stop restart, (see below)
	//render question to the page renderCard timeQuestion
	//check if answer is correct
	//get the (next) card (clock ticks/time down. shown. see timer exercise)
		//if at the end, you're done. total?



	

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