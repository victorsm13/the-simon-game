const loseSound = new Audio('../audio/losesound.mp3');

const jsStartBttn = document.querySelector('.jsStartBtt');

const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];

let userSequence = [];

let gameIndex = 0;

let score = 0;

let highScore = localStorage.getItem('highScore') || 0;

const jsGreenBtt = document.querySelector('.jsGreenBtt');
const jsRedBtt = document.querySelector('.jsRedBtt');
const jsYellowBtt = document.querySelector('.jsYellowBtt');
const jsBlueBtt = document.querySelector('.jsBlueBtt');

const jsMessageContainer = document.querySelector('.jsMessageContainer');

const jsPlayAgainBtt = document.querySelector('.jsPlayAgainBtt');

const jsScoreValue = document.querySelector('.jsScoreValue');
const jsHighScoreValue = document.querySelector('.jsHighScoreValue');

jsHighScoreValue.textContent = highScore;

function saveToStorage(value){
   localStorage.setItem('highScore', value);
}

function randomSequence(){

    let randomNumber = Math.floor(Math.random() * 4 + 1);

    switch(randomNumber){
        case 1:
            gameSequence.push('green')
            break;
        case 2:
            gameSequence.push('red')
            break;
        case 3:
            gameSequence.push('yellow')
            break;
        case 4:
            gameSequence.push('blue')
            break;
    };
}

function game () {

    randomSequence();

    for(let i = 0; i < gameSequence.length; i++){

         let time = 1000 * i;

         setTimeout(()=>{
            if(gameSequence[i] === 'green'){
            jsGreenBtt.classList.add('opacity');
            setTimeout(()=>{
              jsGreenBtt.classList.remove('opacity');
            }, 500)
            } else if(gameSequence[i] === 'red'){
                jsRedBtt.classList.add('opacity');
                setTimeout(()=>{
                jsRedBtt.classList.remove('opacity');
                }, 500)
            } else if (gameSequence[i] === 'yellow'){
                jsYellowBtt.classList.add('opacity');
                setTimeout(()=>{
                jsYellowBtt.classList.remove('opacity');
                }, 500)
            } else if (gameSequence[i] === 'blue'){
                jsBlueBtt.classList.add('opacity');
            setTimeout(()=>{
                jsBlueBtt.classList.remove('opacity');
                }, 500)
            }
         }, time);

    };


};

function verifySequence(){

    let gameStatus = 'undefined';

    if(gameSequence.length === userSequence.length){
        for(let i = 0; i < gameSequence.length; i++){

        if(gameSequence[i] === userSequence[i]){
            gameStatus = 'right';
        } else {
            gameStatus = 'wrong';
        }
    }

    userSequence = [];

     if(gameStatus === 'wrong'){
        jsMessageContainer.classList.remove('hidden');
        gameSequence = [];
        jsScoreValue.textContent = score;
        loseSound.play();
    } else {
        score++;
        jsScoreValue.textContent = score;
        game();
        if(highScore === 0){
            highScore = score;
            jsHighScoreValue.textContent = highScore;
            saveToStorage(highScore);
        } else if(score > highScore){
            highScore = score;
            jsHighScoreValue.textContent = highScore;
            winSound.play();
            saveToStorage(highScore);
        }
    }
    

    } else {

        for(let i = 0; i < gameSequence.length; i++){
            if(gameSequence[i] != userSequence[i]){
                if(userSequence[i] === undefined){
                    continue;
                } else {
                    jsMessageContainer.classList.remove('hidden');
                    gameSequence = [];
                }
            }
        }
    }

}



jsStartBttn.addEventListener('click', ()=>{

    userSequence = [];
    jsStartBttn.classList.add('hidden');
    game();
})


jsGreenBtt.addEventListener('click', ()=>{

    userSequence.push('green');

    verifySequence();
  
});

jsRedBtt.addEventListener('click', ()=>{

    userSequence.push('red');

    verifySequence();
});

jsYellowBtt.addEventListener('click', ()=>{

    userSequence.push('yellow');

    verifySequence();
});

jsBlueBtt.addEventListener('click', ()=>{

    userSequence.push('blue');

    verifySequence();

});

jsPlayAgainBtt.addEventListener('click', ()=>{
    score = 0;
    jsMessageContainer.classList.add('hidden');
    jsStartBttn.classList.remove('hidden');
    jsScoreValue.textContent =  '0';
})

