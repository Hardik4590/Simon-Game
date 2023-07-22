var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]!=gamePattern[currentLevel])
    {
        playSound("wrong");
        $("h1").text("Game Over. Press Any Key to Restart");
        level=0;
        while(gamePattern.length>0)
        {
            gamePattern.pop();
        }
    }
}

var index=0;
$(".btn").click(function()
    {
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        //console.log(userClickedPattern);
        animatePress(userChosenColor);
        checkAnswer(index);
        index++;
        if(index==level)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
        //console.log("userclickedPattern: "+userClickedPattern);
        //nextSequence();
    })


$("body").on("keypress",function(event){
        nextSequence();
})

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

var level=0;

function nextSequence()
{
    while(userClickedPattern.length>0)
    {
        userClickedPattern.pop();
    }
    index=0;
    var r=Math.random()*4;
    var randomNumber= Math.floor(r);
    var randomColorChosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    level++;
    console.log("gamePattern: "+gamePattern);
    $("h1").text("Level "+level);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}



