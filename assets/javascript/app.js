//array[0]=Question
//array[1]=Answer
//array[2]-[5]=Options
//array[6]=Comment
var questionsArray=[
["There are 4 birds on a tree. You shoot one bird. How many are left?","0","1","0","2","3","The rest will fly away"],
["If there are 12 fish and half of them drown, how many are there?","12","6","half","12","4","Have you ever heard of fishes drowning?"],
["Before Mount Everest was discovered, what was the highest mountain in the world?","None of the above","None of the above","Kilimanjaro","McKinley","Aconcagua","Himalayas! then...now...forever."],
["I have three apples. If you take away two from me, how many do you have?","2","all of it","1","3","2","You have 2 apples"],
["What color do you get when you mix red, blue and green light","white","grey","black","white","brown","white light...may it guide you."]
];
//if time permits use objects instead of arrays???

var questionCtr=0;//keep track of which question is on play
var timeAllotted=15;//time allotted to answer each question in seconds
var selectedAnswer="";//store the andwer user selects
var rightCtr=0;//keep count of the no:of right answer
var timeCtr=0;//increments by 1 for every second after the question is displayed
var inter;//stores the setInterval() value for the game
var timeInter=0;//stores the setInterval() value for the time

resetAll();

$("#startGame").on("click",gameOn);
$("#restart").on("click",resetAll);
$(".option").on("click",function()
{
    selectedAnswer=$(this).attr("value");
    checkAnswer();
});

//function to reset all the values. Triggered in the begining and on click of reset button.
function resetAll()
{
    $("#startArea").show();
    $("#gamearea").hide();
    $("#correctAns").hide();
    $("#allDone").hide();
    $("#restart").hide();
    questionCtr=0;
    rightCtr=0;
}

//Function to check if the user clicked on the right answer. Triggered when one of the options is clicked
function checkAnswer()
{
    $("#gamearea").hide();
    if(selectedAnswer === questionsArray[questionCtr][1])
    {
        rightCtr++;
        $("#correctAns").html("<br>Correct !");
    }
    else
    {
        $("#correctAns").html( "<br>Incorrect<br>"+questionsArray[questionCtr][6]);
    }
    $("#correctAns").show();
    if(questionCtr>=questionsArray.length-1)
    {
        setTimeout(gameOver,2*1000);
    }
    else
    {
        timeCtr=0;
        clearInterval(timeInter);
        questionCtr++;
        clearInterval(inter);
        setTimeout(gameOn,1*2000);
    }
console.log("answered. questionCtr="+questionCtr +" questionsArray.length-1 ="+(questionsArray.length-1)+" rightCtr="+rightCtr);
}

//displays the question and options
function nextQuestion()
{
    $("#correctAns").hide();
    $("#gamearea").show();
    $("#question").html(questionsArray[questionCtr][0]);
    $("#option1").val(questionsArray[questionCtr][2]);
    $("#option2").val(questionsArray[questionCtr][3]);
    $("#option3").val(questionsArray[questionCtr][4]);
    $("#option4").val(questionsArray[questionCtr][5]);
}

//Triggered when user dosen't choose an option and the time runs out. Called with setInterval() at the begining of the game
function runTimer()
{
  console.log("not answered. questionCtr="+questionCtr +" questionsArray.length-1 ="+(questionsArray.length-1)+" rightCtr="+rightCtr);
    if(questionCtr>=questionsArray.length-1)
    {
        gameOver();
    }
    else
    {
        questionCtr++;
        timeCtr=0;
        clearInterval(timeInter);
        timeInter=setInterval(showTime,1000);
        nextQuestion();
    }
}

//Show the time left to answer the question. Called with setInterval() for each new question.
function showTime()
{
    timeCtr++;
    $("#timerDiv").html("Time left: " +(timeAllotted-timeCtr) );
}

//Function which begins the game. also called after user selects an option.
function gameOn()
{
    $("#startArea").hide();
    timeCtr=0;
    clearInterval(timeInter);
    timeInter=setInterval(showTime,1000);
    nextQuestion();
    inter= setInterval(runTimer,timeAllotted*1000);
}

// Show the score and set up for restart
function gameOver()
{
    clearInterval(timeInter);
    clearInterval(inter);
    var score="<font> Your score: " +rightCtr +"/"+questionsArray.length + "</font>"
    $("#correctAns").hide();
    $("#gamearea").hide();
    $("#allDone").html("Game Over</br></br>"+score);
    $("#allDone").show();
    $("#restart").show();
}

