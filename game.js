
var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(document).on("click keydown", function () {
    
    if (!started) {

        started = true;
        
        $("#level-title").text("Level " + level); 

        nextSequence();
    }
    
});

$(".btn").click(function (event) { 
    event.stopPropagation();
    
});



function checkAnswer (currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);

        }
        
    } else {
        // console.log("wrong")
        playWrongSound ();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
}


function nextSequence () {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").click(function (event) { 
    
    var userChosenColour = event.target.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function playSound (name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function playWrongSound () {

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

}



function animatePress (currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
        
    }, 100);
}

function startOver () {
    level = 0;

    gamePattern = [];
    
    started = false;
}






