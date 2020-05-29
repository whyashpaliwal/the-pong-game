/*
Project: Pong 
Created By: Yash Paliwal
Date Updated: 29-05-2020
Description:  js to draw game elements and functional code.
*/

var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WIN_SCORE = 7;

var showStartScreen = true;      
var showingWinScreen = false;

var player1Name;
var player2Name;
var p2NameList = ["Dave", "John", "Ram", "Ronny", "Heisenberg", "Schrödinger", 
                  "El Professor", "Tokyo", "Arturito", "Ash", "Zuck", "Guru", 
                  "Rama", "Randy", "Kookie", "Nirobi", "Miguel", "Berlin", 
                  "Jon","Dany", "Tony", "Tommy"]

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT  = 100;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX  - rect.left - root.scrollLeft;
    var mouseY = evt.clientY  - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    }
}
//FOR START SCREEN
function handleStartScreen(evt){
    if(showStartScreen){
        

        player1Score = 0;
        player2Score =0;
        showStartScreen = false;
        
    }
}

// TO CONTINUE AFTER EACH GAME
function handleMouseClick(evt){
    if(showingWinScreen){
            player1Score = 0;
            player2Score =0;
            showingWinScreen = false;

    }
}

window.onload = function(){
    //console.log("hey fucker");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;

    var randValue  = Math.floor(Math.random() * Math.floor(p2NameList.length));
        //alert(randValue);
        
    if(randValue >= 0 || randValue <= p2NameList.length){
        player2Name = p2NameList[randValue]; 
    }   
    console.log(player2Name);

    setInterval(function (){// function to call both
        drawEverything();
        moveEverything();
        //console.log(ballY);
    } , 1000/framesPerSecond);
    
    //getting player 1 name from local storage
    player1Name = localStorage.getItem('name');
    this.console.log(this.player1Name);

    //event handler for start screen
    canvas.addEventListener('mousedown', handleStartScreen);

    //event handler for mouse movement 
    canvas.addEventListener('mousemove', 
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    
        });
    //event handler for win screen
    canvas.addEventListener('mousedown',handleMouseClick);

}



// draw code
function drawEverything(){   
    //background Canvas     
    colorRect(0,0,canvas.width,canvas.height, "black");
   
    //check for game starts
    if(showStartScreen){
        customText("Welcome to the game", 180, 180,"40px","Roberto");
        customText("The match will be between", 260, 220,"20px","Roberto");
        customText(player1Name + " vs " + player2Name, canvas.width/2 - 120, 270,"30px","Roberto");
        
        customText("click to begin the game", 285, 350,"18px","Roberto");
        return;
    }


    // check for game ends 
    if(showingWinScreen){
        canvasContext.fillStyle = "white";

        if(player1Score >= WIN_SCORE){
            customText("!YOU WON!", canvas.width/2 - 130, 150, "50px", "Roberto");
            customText(player1Name + ", It was a nice game lets play again!!", 180, 200, "20px", "Roberto");
        } 
        else if(player2Score >= WIN_SCORE){
            customText("GAME OVER", canvas.width/2 - 130, 150, "50px", "Roberto");
            customText("Better luck next time cuz, "+ player2Name + " WINS this time", 180, 200, "20px", "Roberto");
        }
        canvasContext.fillText("click to restart", 335, 250);
        
        return;
    }    
    // center net
    drawNet(canvas.width/2, true);
    //top boundry 
    drawNet(0, false);
    //bottom net
    drawNet(canvas.height - 5, false);


    // left player's paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, 85, "white");
    
    // right player's padlle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, 85, "white");

    // drawing ball  
    colorCircle(ballX, ballY, 10, "white");
    
    //player 1 score and name
    customText(player1Score, 20, 50, "20px", "Alegria");
    customText(player1Name, 0.24*canvas.width, 47, "20px", "Alegria");
    
    //player 2 score and name
    customText(player2Score, canvas.width-50, 50, "20px", "Alegria");
    customText(player2Name, 0.73* canvas.width , 47, "20px", "Alegria");
    
}
//function to customized text
function customText(text, leftX, topY, fontSize, fontStyle){
    canvasContext.font = fontSize + " " + fontStyle;

    //for gradient
    var gradient = canvasContext.createLinearGradient(0,0, canvas.width, 0);
    gradient.addColorStop("0", "white");
    gradient.addColorStop("0.1", "white");
    gradient.addColorStop("0.9", "white");
    gradient.addColorStop("1", "white");

    //adding the defined gradient into text
    canvasContext.fillStyle = gradient;
    canvasContext.fillText(text, leftX, topY);
}

//function to create a rectangle
function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

//function todraw net
function drawNet(pos, isVerticle){
    if(isVerticle){
        for(var i=0; i<canvas.height; i+=40){
                colorRect(pos, i, 2, 20,'white');
            }
    } else{
        for(var i=0; i<canvas.width; i+=40){
                colorRect(i, pos, 20, 2,'white');
            }
    }           
}

//function to create circle
function colorCircle(leftX, topY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(leftX, topY, radius, 0, Math.PI *2, true);
    canvasContext.fill();
}

//reset ball
function ballReset(){
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2; 
}

// move Code 
function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY + 35){
        paddle2Y += 8;
    }else if(paddle2YCenter > ballY + 35){
        paddle2Y -= 8;
    } 
}

function moveEverything(){
    if(showingWinScreen){
        return;
    }

    //right paddle auto movement
    computerMovement();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //for horizontal movement 
    if(ballX < 0){    
        //checking if the left paddle touches the ball
        if(ballY > paddle1Y &&
           ballY < paddle1Y +PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY
                        - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else{
            player2Score++;  //update score reset
            if (player2Score >= WIN_SCORE || 
                player1Score >= WIN_SCORE){
                  
                    showingWinScreen = true;
                }
            ballReset();                    
        }
    }
    if( ballX > canvas.width){
        //ballSpeedX = -ballSpeedX;
        if(ballY > paddle2Y &&
           ballY < paddle2Y +PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY
                        - (paddle2Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else{
            player1Score++;  //update score reset
            if (player1Score >= WIN_SCORE || 
                player2Score >= WIN_SCORE){
                
                    showingWinScreen = true;
                }
            ballReset();
        }
    }
    

    //for vertical movement
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    }                    
}
