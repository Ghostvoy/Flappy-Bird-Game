document.addEventListener('DOMContentLoaded',()=>{
    const bird = document.querySelector('.bird');
    const gamedisplay = document.querySelector('.background');

    let birdleft = 150
    let birdbottom = 220
    let gravity = 3
    let isGameover = false
    let gap= 400
    let val=-1


    function start(){
        birdbottom -= gravity;
        bird.style.bottom = birdbottom + 'px';
        bird.style.left = birdleft +'px';
        document.getElementById('score').textContent = 'SCORE : ' + val;
    }
    let GametimerId = setInterval(start , 20);

    function control(e){
        if(e.keyCode===32){
            jump()
        }
    }
    

    function jump(){
        if(birdbottom < 450) birdbottom += 50
        bird.style.bottom = birdbottom + 'px';
    }
    document.addEventListener('keyup',control)

    function generateObstacle(){
        let obstacleleft = 400
        let randheight = Math.random()*60
        let obstaclebottom = randheight
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameover) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
            val++;
        }
        gamedisplay.appendChild(obstacle);
        gamedisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleleft + 'px';
        obstacle.style.bottom = obstaclebottom + 'px';
        topObstacle.style.left = obstacleleft + 'px';
        topObstacle.style.bottom = obstaclebottom + gap + 'px';
    function moveObstacle(){
        obstacleleft -= 2
        obstacle.style.left = obstacleleft + 'px';
        topObstacle.style.left = obstacleleft + 'px';

        if(obstacleleft===-50){
            clearInterval(timerId)
            gamedisplay.removeChild(obstacle)
            gamedisplay.removeChild(topObstacle)
        }
        if(obstacleleft > 100 && obstacleleft < 202 && birdleft ===150 && (birdbottom < obstaclebottom + 152 || birdbottom > obstaclebottom +gap - 153) ||
            birdbottom===1
            ){
          gameOver();
        }
    }
    function gameOver(){
        clearInterval(GametimerId)
        document.removeEventListener('keyup',control);
        isGameover= true
        clearInterval(timerId)
        document.getElementById('message').textContent = 'You Lose!!!'
    }
    let timerId = setInterval(moveObstacle ,20);  
    if(!isGameover) setTimeout(generateObstacle , 3000);

    }
    generateObstacle();
})