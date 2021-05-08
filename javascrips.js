var playing = false;
var score_v = 0;
var action;
var remaining_time;
var correct_answer;

//if we click on the start/reset
document.getElementById("start_reset").onclick =
    function(){
        //if we are playing
        if(playing == true){
            //reload page
            location.reload;
            document.getElementById("start_reset").innerHTML = "Start Game"
            
            Hide("timeremaining");
            Hide("gameOver");
            //score to zero
            score_v = 0;
            document.getElementById("score_value").innerHTML = score_v;
            
            //vanish question
            document.getElementById("question").innerHTML = "";
            //vanish answers
            Box_hide("box");
            //false the play mode.
            playing = false;
            StartCountDown("timeremainingvalue",playing);
            clearInterval(action);

        }
        //if we are not playing
        else{
            //true the play mode.
            playing = true;
            //set score to 0
            Show("score");
            document.getElementById("score_value").innerHTML = score_v;
            Show("timeremaining");
           
            //reduce time by 1sec in loops
           remaining_time = 60;
            document.getElementById("timeremainingvalue").innerHTML = remaining_time;
            
                //timeleft?
	               //yes->continue
                   //no->gameover
            //show countdown box
            StartCountDown("timeremainingvalue",playing);
            
           //change button start to reset
            document.getElementById("start_reset").innerHTML = "Reset Game";
            
            
           //generate new Q&A
            generateQA();
            
        }
}

//if we click on answer box
for(i=1; i<5; i++){
document.getElementById("box"+i).onclick = function(){
 //if we are playing
    if(playing == true){
       if(this.innerHTML == correct_answer){
        //   correct
        //     increase score by 1
             score_v++;
        document.getElementById("score_value").innerHTML = score_v;
//     show correct box for 1sec
        Show("correct");
        Hide("wrong");
        setTimeout(function(){Hide("correct")},1000);
//     generate new Q&A
        generateQA();
    }
    else{
     // wrong answer
        Hide("correct");
        Show("wrong");
        setTimeout(function(){Hide("wrong")}, 1000);
    }
    }
}
//    yes
//    no
//     show try again box for 1sec
    
}

// functions
function StartCountDown(ID,play){
    action = setInterval(function(){
//            for(i=59; i>-1; i--){
        if(play == false){
            clearInterval(action);
                }
        else{
        remaining_time -= 1; 
        if(remaining_time != 0 && remaining_time > 0 && play == true){
        document.getElementById(ID).innerHTML = remaining_time;
        }
        //gameOver
        if(remaining_time == 0 && play == true){
            clearInterval(action);
            Show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>game over!</p><p>your score is "+score_v+".</p>"
//           
            Hide("timeremaining");
        }
        }
            
//        if(play == true){
//        }     
//            }             
                         }, 1000);
}
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correct_answer = x * y;
    document.getElementById("question").innerHTML = x+"x"+y;
    var correct_position = 1 + Math.round(3*Math.random());
    // correct answers
    document.getElementById("box"+correct_position).innerHTML = correct_answer;
    // wrong answers
    var answers = [correct_answer];
    
    for(i=1; i<5; i++){
         if(i != correct_position)   
         {var wrong_answer;
             do{
                wrong_answer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));  
              }while(answers.indexOf(wrong_answer) > -1)    
            document.getElementById("box"+i).innerHTML = wrong_answer;
            answers.push(wrong_answer);
         }
       }  
    
}
function Show(ID){
    document.getElementById(ID).style.display = "block";
}
function Hide(ID){
    document.getElementById(ID).style.display = "none";
}
function Box_hide(ID){
    for(i=1; i<5; i++){
        document.getElementById(ID+i).innerHTML = "";
    }
}