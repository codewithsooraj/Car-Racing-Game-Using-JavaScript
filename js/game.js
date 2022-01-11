// Creating a object of keys that will be used in the game 
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
// these events will be performed when any key is pressed
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// set true value of the key object that will pressed
function keyDown(k) {
    k.preventDefault();
    keys[k.key] = true;
    // console.log(keys);
}
// set false value of the key that will pressed
function keyUp(k) {
    k.preventDefault();
    keys[k.key] = false;
    // console.log("unpressed");
}

// selecting the html classes and storing them into constant variables
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let player = { speed : 5, score: 0};
startScreen.addEventListener('click', start)

function crash(a,b){
    carA = a.getBoundingClientRect();
    carB = b.getBoundingClientRect();

    return  !((carA.top > carB.bottom) ||
            (carA.bottom < carB.top)  ||
            (carA.right < carB.left)  ||
            (carA.left > carB.right))

}

function moveLines(){
    let lines = document.querySelectorAll('.road-lines');
    lines.forEach(function(item){
        if(item.y >= 700){ 
            item.y -= 750;
        }
    item.y += player.speed;
    item.style.top = (item.y) + "px";

    })
    
}
function stopGame(){
    player.start= false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over.. <br> Your final score is "+ player.score + "<br>Click here restart thr game."
}

function moveOppCars(car){
    let oppCar = document.querySelectorAll('.oppCar');
    oppCar.forEach(function(item){

        if (crash(car,item)){
            //console.log("crashed")
            stopGame();
        }
        if(item.y >= 750){ 
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
    item.y += player.speed;
    item.style.top = (item.y) + "px";

    })
    
}
// this function will revoke (call) until the game is running
function playGame() {
    //console.log("start game");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveOppCars(car);
        if(keys.ArrowUp && player.y > road.top + 150) { player.y -= player.speed }
        if(keys.ArrowDown && player.y < road.bottom - 100) { player.y += player.speed }
        if(keys.ArrowLeft && player.x > -15) { player.x -= player.speed }
        if(keys.ArrowRight && player.x < road.width - 100) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(playGame);
        score.innerText = (player.score++)
    }
}

// this function will start game
function start() {
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(playGame);

    for(i=0;i<5;i++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','road-lines')
        roadLine.y = (i * 150);
        roadLine.style.top = (roadLine.y) + "px";
        gameArea.appendChild(roadLine)
    }

    for(i=0;i<3;i++){
        let oppCar = document.createElement('div');
        oppCar.setAttribute('class','oppCar')
        oppCar.y = ((i+1) * 350) * -1;
        oppCar.style.top = (oppCar.y) + "px";
        let opp = ['../cars/opp1.png',
                    '../cars/opp2.png',
                    '../cars/opp3.png',
                    '../cars/opp4.png',
                    '../cars/opp5.png',
                    '../cars/opp6.png',
                    '../cars/opp7.png',
                    '../cars/opp8.png',
                    '../cars/opp9.png',
                    '../cars/opp10.png',
                    '../cars/opp11.png',
                    '../cars/opp12.png',
                    '../cars/opp13.png',
                    '../cars/opp14.png',
                    '../cars/opp15.png',
                    '../cars/opp16.png',
                    '../cars/opp17.png',
                    '../cars/opp18.png',
                    '../cars/opp19.png',
                    '../cars/opp20.png',
                    '../cars/opp21.png',
                    '../cars/opp22.png',]
                    var randomNumber = Math.floor(Math.random() * opp.length);
                    var ocars = 'url(' + opp[randomNumber] + ')';
                    oppCar.style.backgroundImage = ocars; 
        // oppCar.style.background = randomColor();
        oppCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(oppCar)
    }
    // function randomColor(){
    //     function c(){
    //         let hex = Math.floor(Math.random() * 256).toString(16);
    //         return ("0" + String(hex)).substr(-2);
    //     }
    //     return "#"+c()+c()+c();
    // }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText = "Audi R8";
    gameArea.appendChild(car);
    
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position : " + car.offsetTop);
    // console.log("left position : " + car.offsetLeft);
    
}