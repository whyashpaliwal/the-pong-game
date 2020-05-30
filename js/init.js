/*
Project: Pong 
Created By: Yash Paliwal
Date Created: 04-05-2020
Date Updated: 28-05-2020
Description: This is a input form js to get the player's name.
*/
window.onload = function(){
  var windowSize;
  windowSize = window.screen.width;
this.console.log(windowSize);
  if(windowSize<1000){
    window.location.replace("landing.html")
  }
}


var questions = [
  {question:"Choose a cool username ;)"}
];
(function(){

  var tTime = 100  // transition transform time from #register in ms
  var wTime = 200  // transition width time from #register in ms
  var eTime = 1000 // transition width time from inputLabel in ms

  // init
  // --------------
  var position = 0

  putQuestion()

  progressButton.addEventListener('click', validate)
  inputField.addEventListener('keyup', function(e){
    transform(0, 0) // ie hack to redraw
    if(e.keyCode == 13) validate()
  })

  // functions
  // --------------

  // load the next question
  function putQuestion() {
    inputLabel.innerHTML = questions[position].question
    inputField.value = ''
    inputField.type = questions[position].type || 'text'  
    inputField.focus()
    showCurrent()
  }
  
  // when all the questions have been answered
  function done() {
    
    // remove the box if there is no next question
    register.className = 'close'
    
    // add the h1 at the end with the welcome text 
    // add btn to start the game
    var h1 = document.createElement('h1');
    player1Name = questions[0].value;

    //using cache
    localStorage.setItem('name', player1Name);
    
    h1.id = "welcomeTextH1";
    h1.addEventListener("click", startGame);
    h1.appendChild(document.createTextNode('Welcome ' + player1Name + ' let\'s start the game <<click to start>>'))
    setTimeout(function() {
      register.parentElement.appendChild(h1);
      setTimeout(function() {h1.style.opacity = 1}, 50)  
    }, eTime)   
  }

  // when submitting the current question
  function validate() {

    // set the value of the field into the array
    questions[position].value = inputField.value

    // check if the pattern matches
    if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
    else ok(function() {
      
      // set the progress of the background
      progress.style.width = ++position * 100 / questions.length + 'vw'

      // if there is a new question, hide current and load next
      if (questions[position]) hideCurrent(putQuestion)
      else hideCurrent(done)
             
    })

  }

  // helper
  // --------------

  function hideCurrent(callback) {
    inputContainer.style.opacity = 0
    inputProgress.style.transition = 'none'
    inputProgress.style.width = 0
    setTimeout(callback, wTime)
  }

  function showCurrent(callback) {
    inputContainer.style.opacity = 1
    inputProgress.style.transition = ''
    inputProgress.style.width = '100%'
    setTimeout(callback, wTime)
  }

  function transform(x, y) {
    register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
  }

  function ok(callback) {
    register.className = ''
    setTimeout(transform, tTime * 0, 0, 10)
    setTimeout(transform, tTime * 1, 0, 0)
    setTimeout(callback,  tTime * 2)
  }
}())

/* function to start game
*/

function startGame(){
  //creating animation
  setTimeout(function(){document.getElementById("welcomeTextH1").innerHTML = " Game Loading."}, 1000);
  setTimeout(function(){document.getElementById("welcomeTextH1").innerHTML = " Game Loading.."}, 2000);
  setTimeout(function(){document.getElementById("welcomeTextH1").innerHTML = " Game Loading..."}, 3000);
  setTimeout(function(){document.getElementById("welcomeTextH1").innerHTML = " Game Loading...."}, 4000);
  
  //later show the [player 1 vs player 2] names

  //reseting the body
  setTimeout(function(){document.body.innerHTML = "";}, 5000);

  setTimeout(function(){
    window.location.replace("game.html")
  }, 5500);


}
