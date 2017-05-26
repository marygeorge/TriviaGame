var questionsArray=[
["There are 4 birds on a tree. You shoot one bird. How many are left?","0","1","0","2","3","The rest will fly away"],
["If there are 12 fish and half of them drown, how many are there?","12","6","half","12","4","Have you ever heard of fishes drowning?"],
["Before Mount Everest was discovered, what was the highest mountain in the world?","None of the above","None of the above","Kilimanjaro","McKinley","Aconcagua","Himalayas! then...now...forever."],
["I have three apples. If you take away two from me, how many do you have?","2","all of it","1","3","2","You have 2 apples"],
["What color do you get when you mix red, blue and green light","white","grey","black","white","brown","white light...may it guide you."]
];
//use objects instead of arrays???

var questionCtr=0;
var timeAllotted=15;
var selectedAnswer="";
var rightCtr=0;
var timeCtr=0;
var inter;
var timeInter=0;

resetAll();

$("#startGame").on("click",gameOn);
$("#restart").on("click",resetAll);

$(".option").on("click",function()
{
    selectedAnswer=$(this).attr("value");
    checkAnswer();
});

function resetAll()
{
    $("#restart").hide();
    $("#gamearea").hide();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#allDone").hide();
    $("#startArea").show();
    questionCtr=0;
    rightCtr=0;
}

function checkAnswer()
{
    if(selectedAnswer === questionsArray[questionCtr][1])
    {
        correctAnswer();
    }
    else
    {
        incorrectAnswer();
    }
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

function correctAnswer()
{
    rightCtr++;
    $("#gamearea").hide();
    $("#correctAns").html("<br>Correct !");
    $("#correctAns").show();
}

function incorrectAnswer()
{
   $("#gamearea").hide(); 
   $("#correctAns").html( "<br>Incorrect<br>"+questionsArray[questionCtr][6]);
   $("#correctAns").show();
}

function nextQuestion()
{
    $("#correctAns").hide();
    $("#gamearea").show();
    var i=questionCtr;
    $("#question").html(questionsArray[i][0]);
    $("#option1").val(questionsArray[i][2]);
    $("#option2").val(questionsArray[i][3]);
    $("#option3").val(questionsArray[i][4]);
    $("#option4").val(questionsArray[i][5]);
}

function runTimer()
{
  console.log("not answered. questionCtr="+questionCtr +" questionsArray.length-1 ="+(questionsArray.length-1)+" rightCtr="+rightCtr);
    if(questionCtr>=questionsArray.length-1)
    {
        clearInterval(inter);
        clearInterval(timeInter);
        gameOver();
    }
    else
    {
        questionCtr++;
        timeCtr=0;
        clearInterval(timeInter);
        timeCtr=0;
        clearInterval(timeInter);
        timeInter=setInterval(showTime,1000);
        nextQuestion();
    }
}

function showTime()
{
    timeCtr++;
    $("#timerDiv").html("Time left: " +(timeAllotted-timeCtr) );
}

function gameOn()
{
    $("#startArea").hide();
    nextQuestion();
    timeCtr=0;
    clearInterval(timeInter);
    timeInter=setInterval(showTime,1000);
    inter= setInterval(runTimer,timeAllotted*1000);
}

function gameOver()
{
    var score="<font> Your score: " +rightCtr +"/"+questionsArray.length + "</font>"
    $("#correctAns").hide();
    $("#gamearea").hide();
    $("#timerDiv").html(" ");
    $("#allDone").html("Game Over</br></br>"+score);
    $("#allDone").show();
    $("#restart").show();
}

