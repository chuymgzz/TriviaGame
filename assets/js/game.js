// Question, Answer List and Answer Value

var triviaQuestions = [{
	question: "This company acquired the mobile phone maker Motorola Mobility in 2012.",
	answerList: ["Microsoft", "Samsung", "Google", "Apple"],
	answer: 2
},{
	question: "This company was famously started out of a Silicon Valley garage by two high-school friends.",
	answerList: ["Apple", "Microsoft", "Viewsonic", "Google"],
	answer: 0
},{
	question: "This tech company is the maker of the popular Galaxy brand of smartphones.",
	answerList: ["Sony", "Samsung", "Google", "Huawei"],
	answer: 1
},{
	question: "This company’s first customer was Walt Disney Productions in 1939, which bought audio technology to make the film Fantasia.",
	answerList: ["Hewlett-Packard", "Sony", "LG", "Beats Audio"],
	answer: 0
},{
	question: "The first product this company produced was an electric rice cooker.",
	answerList: ["Samsung", "Whirlpool", "KitchenAid", "Sony"],
	answer: 3
},{
	question: "The original name of this tech company was PC’s Limited.",
	answerList: ["Intel", "IBM", "Dell", "Hewlett-Packard"],
	answer: 2
},{
	question: "This company got its start by selling books online.",
	answerList: ["Amazon", "Toshiba", "AOL", "Apple"],
	answer: 0
},{
	question: "This company is the number one manufacturer of semiconductor computer circuits.",
	answerList: ["Adobe", "Dell", "Intel", "Samsung"],
	answer: 2
}];

// Establish our variables

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yes, nailed it!",
	incorrect: "Wrong, wrong, wrong!",
	endTime: "Time Out!",
	finished: "Let's see your score now."
}

// Button to Start Game - Hide Button Function

$('#startButton').on('click', function(){
	$(this).hide();
	newGame();
});

// Button to Restart Game - Hide Button Function

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Function New Game - Set Initial Values to 0

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

// Function New Question

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
// Sets New Question and Answer List

	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

// Pause Time and Setup Answer Page on Answer Click

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

// Function Timer 10 Seconds

function countdown(){
	seconds = 10;
	$('#remainingTime').html('<p>Time Remaining: ' + seconds + '<p>');
	answered = true;

// Time Goes Down by 1 Second

	time = setInterval(showCountdown, 1000);
}

// Show Countdown on HTML and Set Answer False if Countdown <1 Second

function showCountdown(){
	seconds--;
	$('#remainingTime').html('<p>Time Remaining: ' + seconds + '<p>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// Sets Page with Answers

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 

//Clears question page

$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "300px">');

// Verify Correct, Incorrect, or Unanswered
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: <strong>' + rightAnswerText + '<strong>');
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: <strong>' + rightAnswerText + '<strong>');
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 7000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 7000);
	}	
}

// Sets Values Last Page with Scoreboard

function scoreboard(){
	$('#remainingTime').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}