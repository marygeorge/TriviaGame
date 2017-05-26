var questionsArray=[
["There are 4 birds on a tree. You shoot one bird. How many are left?","0","1","2","3","The rest will fly away"],
["If there are 12 fish and half of them drown, how many are there?","12","6","half","4","Have you ever heard of fishes drowning?"],
["Before Mount Everest was discovered, what was the highest mountain in the world?","None of the above","Kilimanjaro","McKinley","Aconcagua","Himalayas! then...now...forever."],
["I have three apples. If you take away two from me, how many do you have?","2","all of it","1","3","You have 2 apples"],
["What color do you get when you mix red blue and green light","white","grey","black","brown","white light...may it guide you."]
];
var questionCtr=0;
var timeAllotted=5*1000;
var selectedAnswer="";
var rightCtr=0;
resetAll();
$("#startGame").on("click",nextQuestion);
$("#restart").on("click",resetAll);

$(".option").on("click",function()
{
    console.log($(this).attr("value"));
    selectedAnswer=$(this).attr("value");
    checkAnswer();
});

function resetAll()
{
    console.log("resetAll");
    $("#gamearea").hide();
    $("#correctAns").hide();
    $("#incorrectAns").hide();
    $("#allDone").hide();
    $("#startArea").show();
    questionCtr=0;
}

function checkAnswer()
{
    if(selectedAnswer === questionsArray[questionCtr][1])
    {
        console.log("right answer");
        correctAnswer();
    }
    else
    {
        console.log("Wrong answer");
        incorrectAnswer();
    }
    if(questionCtr>=questionsArray.length-1)
    {
        console.log("gameOver");
        setTimeout(gameOver,1*1000);
    }
    else
    {
    questionCtr++;
    setTimeout(nextQuestion,3*1000);
    }
}

function correctAnswer()
{
    rightCtr++;
    $("#gamearea").hide();
    $("#correctAns").html("Correct !");
    $("#correctAns").show();

}

function incorrectAnswer()
{
   $("#gamearea").hide(); 
   console.log(questionsArray[questionCtr][5]);
    $("#correctAns").html(questionsArray[questionCtr][5]);
    $("#correctAns").show();
    
}

function nextQuestion()
{
    //clearInterval(inter);
    $("#startArea").hide();
    $("#correctAns").hide();
    var i=questionCtr;
    console.log("questionCtr = "+i);
    $("#gamearea").show();
    $("#question").html(questionsArray[i][0]);
    $("#option1").val(questionsArray[i][1]);
    $("#option2").val(questionsArray[i][2]);
    $("#option3").val(questionsArray[i][3]);
    $("#option4").val(questionsArray[i][4]);
    // if(questionCtr<(questionsArray.length-1))
    // {
    //     console.log(questionCtr+"<="+(questionsArray.length-1))
    //     questionCtr=questionCtr+1;
    //     var inter=setInterval(nextQuestion,timeAllotted); 
    //     console.log(inter);
    // }
    // else
    // {
    //     gameOver();
    // }
}

function gameOver()
{
    var score="<font> Your score: " +rightCtr +"/"+questionsArray.length + "</font>"
    $("#allDone").html("Game Over</br></br>"+score);
    $("#correctAns").hide();
    $("#allDone").show();
}

