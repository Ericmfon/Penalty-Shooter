var canvas = document.getElementById("mycanvas")
var context = canvas.getContext("2d");
context.beginPath();

window.addEventListener('keydown', this.inputs);

score = 0;

goalY = -10;

keeperX = (canvas.width/2) - 90;
keeperY = 200;

ballX = (canvas.width/2) - 35;
ballY = 600;
ballSpeedX = 0;
ballSpeedY = 0;


ball_image = document.getElementById("ball");
goal_image = document.getElementById("goal");
keeper_image = document.getElementById("keeper");
win_image = document.getElementById("win");
lose_image = document.getElementById("lose");
nice_def = document.getElementById("def");
goal_ani = document.getElementById("ani");
stat_img = document.getElementById("def")

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if(score >= 100)
    {
        context.drawImage(win_image, 200, 150);
    }

    if(score <= -20)
    {
        context.drawImage(lose_image, 200, 150);
    }

    if(score > -20 && score < 100)
    {
        context.drawImage(goal_image, (canvas.width/2)-350, goalY, 700,350);
        context.drawImage(keeper_image, keeperX, keeperY, 100, 100);
        context.drawImage(ball_image, ballX, ballY, 50, 50);
        context.drawImage(stat_img, 10, 30, 100, 100);
        context.font = "20px Roboto";
        context.fillText(score, 30, 30);
    }
    context.fill();
}

function update()
{
    draw();
    setTimeout(update, 10);

    if(score< 100)
    {
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        checkCollision();
        checkCollisionGoal();
    }

}

function checkCollision()
{
    if((ballX >= keeperX && ballX <= keeperX+150) || (keeperX >= ballX && keeperX <= ballX+50)) 
    {
        if((ballY >= keeperY && ballY <= keeperY +150) || (keeperY >= ballY && keeperY <= ballY+50))
        {
            reset();
            score = score + 10;
            stat_img = nice_def;
        }
    }
}

function checkCollisionGoal()
{
    if((ballY >= goalY && ballY <= goalY +350) || (goalY >= ballY && goalY <= ballY+50))
    {
        reset();
        score = score - 10;
        stat_img = goal_ani;
    }
}

function getRandomArbitrary(min, max) 
{
    return Math.random() * (max - min) + min;
}

  function inputs(event)
{
    console.log(event.keyCode)
    //left
	if(event.keyCode == 65)
	{
		keeperX = keeperX-40;
	}
    //right
	if(event.keyCode == 68)
	{
		keeperX = keeperX+40;
	}
    if(event.keyCode == 87)
    {
        keeperY = keeperY-10;
    }
    if(event.keyCode == 83)
    {
        keeperY = keeperY +10;
    }

	// kicking ball
	if(event.keyCode == 32)
	{
		ballSpeedY = - 7;
        ballSpeedX = getRandomArbitrary(-7,7);
	}

	if(event.keyCode == 27)
	{
		reset();
	}
}

function checkGoal()
{

}

function reset()
{
    ballY = 600;
    ballSpeedY = 0;
    ballX = (canvas.width/2) -35;
    ballSpeedX = 0;
}
update();