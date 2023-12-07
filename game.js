var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keydown(function() {

    if (!started){
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
    

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        console.log(gamePattern);
        console.log(userClickedPattern);

        if (gamePattern.length == userClickedPattern.length ){
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        }

    }else{
        
        console.log("wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart" + " Score: "+level);
        started = false;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
      
    }

}

$(".btn").click(function (e){
    var userChosenColour = e.target.getAttribute("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (started){
    userClickedPattern.push(userChosenColour);
    var indexOfLastUserClicked = userClickedPattern.length - 1;
    checkAnswer(indexOfLastUserClicked);}
        

   
    
})

function nextSequence(){
   
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);
    animatePress(randomChosenColor);

  
} 



function playSound(name){
    var colorSound = new Audio("./sounds/"+ name + ".mp3");
    colorSound.play();
   
}

function animatePress(currentColor){
    $(".btn."+ currentColor).addClass("pressed");
    setTimeout(function (){
        $(".btn."+ currentColor).removeClass("pressed");
    }, 100);
    
}


