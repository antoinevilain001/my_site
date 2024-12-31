document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded!");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const gridSize = 20; // Size of each cell
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }]; // Snake starts with one segment
    let food = { x: 5, y: 5 }; // Food starts at a random position
    let dx = 1; // Direction on the x-axis
    let dy = 0; // Direction on the y-axis
    let score = 0;
    let pause = true;
    let gameover = false;

    const score_box = document.getElementById("score_box");
    const pause_box = document.getElementById("pause_box");


    function drawGrid() {
        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function updateScore() {
        score_box.textContent = `Score: ${score}`;
        if (gameover) pause_box.textContent = `Pause: GAMEOVER!!`;
        if (!gameover) pause_box.textContent = `Pause: ${pause}`;
    }

    function drawSnake() {
        ctx.fillStyle = "green";
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }
    
    function drawFood() {
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }
    
    
    function moveSnake() {
        const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    
        // Check if the snake eats the food
        if (newHead.x === food.x && newHead.y === food.y) {
            score++;
            placeFood(); // Place new food
        } else {
            snake.pop(); // Remove the tail
        }
    
        // Check collisions
        if (isCollision(newHead)) {
            // alert("Game Over! Your score: " + score);
            pause = true;
            gameover = true;
        }
    
        snake.unshift(newHead); // Add the new head to the snake
    }
    
    function isCollision(head) {
        // Check wall collisions
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            return true;
        }
    
        // Check self-collision
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
    
        return false;
    }
    
    
    function placeFood() {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
    }
    
    
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "w":
                console.log("w presssed!");
                if (dy === 0) { dx = 0; dy = -1; }
                break;
            case "s":
                console.log("s presssed!");
                if (dy === 0) { dx = 0; dy = 1; }
                break;
            case "a":
                console.log("a presssed!");
                if (dx === 0) { dx = -1; dy = 0; }
                break;
            case "d":
                console.log("d presssed!");
                if (dx === 0) { dx = 1; dy = 0; }
                break;
            case " ":
                console.log("spacebar pressed!");
                pause = !pause;
                if (gameover) {
                    resetGame();
                    gameover = !gameover;
                    pause = true;
                }
                break;
        }
    });
    
    
    function gameLoop() {
        updateScore();
        if (!pause) {
            drawGrid();
            moveSnake();
            drawSnake();
            drawFood();
        }
        setTimeout(gameLoop, 100); // Adjust speed by changing the timeout
    }
    
    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        dx = 1;
        dy = 0;
        score = 0;
        placeFood();
    }
    
    resetGame();
    drawGrid();
    drawSnake();
    drawFood();
    gameLoop();    
});
