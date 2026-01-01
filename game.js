// Game Configuration
let GRID_SIZE = 30; // Will be set based on user selection
let DOT_RADIUS = 3; // Smaller dots for clarity
let LINE_WIDTH = 4; // Adjusted line width
let CELL_SIZE = 80; // Will be calculated based on grid size
let PADDING = 50; // Will be calculated based on canvas size
let CANVAS_SIZE = 600; // Will be calculated based on window size

// Game State
let gameState = {
    players: [],
    currentPlayerIndex: 0,
    board: {
        horizontalLines: [],
        verticalLines: [],
        boxes: [],
        horizontalLineOwners: [],
        verticalLineOwners: []
    },
    scores: [],
    gameStarted: false
};

// DOM Elements
const setupScreen = document.getElementById('setupScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const boardSizeSelect = document.getElementById('boardSize');
const numPlayersInput = document.getElementById('numPlayers');
const playersSetup = document.getElementById('playersSetup');
const startGameBtn = document.getElementById('startGame');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const currentPlayerDiv = document.getElementById('currentPlayer');
const scoresDiv = document.getElementById('scores');
const restartGameBtn = document.getElementById('restartGame');
const newGameBtn = document.getElementById('newGame');
const finalScoresDiv = document.getElementById('finalScores');

// Default colors for players
const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];

// Initialize
numPlayersInput.addEventListener('change', updatePlayerSetup);
startGameBtn.addEventListener('click', startGame);
restartGameBtn.addEventListener('click', resetToSetup);
newGameBtn.addEventListener('click', resetToSetup);
canvas.addEventListener('click', handleCanvasClick);
window.addEventListener('resize', handleResize);

// Calculate initial canvas size
updateCanvasSize();

// Initialize with 2 players
updatePlayerSetup();

function updateCanvasSize() {
    const container = document.querySelector('.container');
    
    // Base size calculation on grid size
    let baseSize = 400;
    if (GRID_SIZE === 30) {
        baseSize = 600;
    } else if (GRID_SIZE === 40) {
        baseSize = 800;
    } else if (GRID_SIZE === 50) {
        baseSize = 1000;
    }
    
    // Respect window size limits but allow scrolling for large boards
    const maxWidth = Math.min(window.innerWidth - 80, baseSize);
    const maxHeight = Math.min(window.innerHeight - 350, baseSize);
    CANVAS_SIZE = Math.min(maxWidth, maxHeight);
    CANVAS_SIZE = Math.max(CANVAS_SIZE, 400); // Minimum size
    
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    
    // Update padding and sizes based on canvas size
    PADDING = CANVAS_SIZE * 0.05;
    DOT_RADIUS = Math.max(2, CANVAS_SIZE * 0.004);
    LINE_WIDTH = Math.max(2, CANVAS_SIZE * 0.005);
    
    if (gameState.gameStarted) {
        CELL_SIZE = (CANVAS_SIZE - 2 * PADDING) / (GRID_SIZE - 1);
        drawBoard();
    }
}

function handleResize() {
    updateCanvasSize();
}

function updatePlayerSetup() {
    const numPlayers = parseInt(numPlayersInput.value);
    playersSetup.innerHTML = '';
    
    for (let i = 0; i < numPlayers; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-setup';
        playerDiv.innerHTML = `
            <h3>Player ${i + 1}</h3>
            <div class="player-row">
                <input type="text" id="playerName${i}" placeholder="Player ${i + 1}" value="Player ${i + 1}">
                <select id="playerType${i}">
                    <option value="human">Human</option>
                    <option value="ai">AI</option>
                </select>
                <input type="color" id="playerColor${i}" value="${defaultColors[i]}">
            </div>
        `;
        playersSetup.appendChild(playerDiv);
    }
}

function startGame() {
    // Set board size based on user selection
    GRID_SIZE = parseInt(boardSizeSelect.value);
    
    // Update canvas size based on grid size
    updateCanvasSize();
    
    // Calculate cell size to fit the canvas
    CELL_SIZE = (CANVAS_SIZE - 2 * PADDING) / (GRID_SIZE - 1);
    
    const numPlayers = parseInt(numPlayersInput.value);
    gameState.players = [];
    gameState.scores = [];
    
    for (let i = 0; i < numPlayers; i++) {
        const name = document.getElementById(`playerName${i}`).value || `Player ${i + 1}`;
        const type = document.getElementById(`playerType${i}`).value;
        const color = document.getElementById(`playerColor${i}`).value;
        
        gameState.players.push({ name, type, color });
        gameState.scores.push(0);
    }
    
    initializeBoard();
    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameState.gameStarted = true;
    
    drawBoard();
    updateUI();
    
    // If first player is AI, let them move
    if (gameState.players[gameState.currentPlayerIndex].type === 'ai') {
        setTimeout(makeAIMove, 500);
    }
}

function initializeBoard() {
    // Initialize horizontal lines
    gameState.board.horizontalLines = [];
    gameState.board.horizontalLineOwners = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        gameState.board.horizontalLines[row] = [];
        gameState.board.horizontalLineOwners[row] = [];
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            gameState.board.horizontalLines[row][col] = false;
            gameState.board.horizontalLineOwners[row][col] = null;
        }
    }
    
    // Initialize vertical lines
    gameState.board.verticalLines = [];
    gameState.board.verticalLineOwners = [];
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        gameState.board.verticalLines[row] = [];
        gameState.board.verticalLineOwners[row] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            gameState.board.verticalLines[row][col] = false;
            gameState.board.verticalLineOwners[row][col] = null;
        }
    }
    
    // Initialize boxes
    gameState.board.boxes = [];
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        gameState.board.boxes[row] = [];
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            gameState.board.boxes[row][col] = null;
        }
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw filled boxes
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (gameState.board.boxes[row][col] !== null) {
                const playerIndex = gameState.board.boxes[row][col];
                const player = gameState.players[playerIndex];
                const x = PADDING + col * CELL_SIZE;
                const y = PADDING + row * CELL_SIZE;
                
                // Fill box
                ctx.fillStyle = player.color + '40';
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                
                // Draw player number
                ctx.fillStyle = player.color;
                const fontSize = Math.max(10, Math.min(20, CELL_SIZE * 0.4));
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(playerIndex + 1, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
            }
        }
    }
    
    // Draw horizontal lines
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            const x1 = PADDING + col * CELL_SIZE;
            const y1 = PADDING + row * CELL_SIZE;
            const x2 = PADDING + (col + 1) * CELL_SIZE;
            const y2 = y1;
            
            if (gameState.board.horizontalLines[row][col]) {
                const ownerIndex = gameState.board.horizontalLineOwners[row][col];
                ctx.strokeStyle = gameState.players[ownerIndex].color;
                ctx.lineWidth = LINE_WIDTH;
            } else {
                ctx.strokeStyle = '#ddd';
                ctx.lineWidth = Math.max(1, LINE_WIDTH * 0.4);
            }
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    // Draw vertical lines
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const x1 = PADDING + col * CELL_SIZE;
            const y1 = PADDING + row * CELL_SIZE;
            const x2 = x1;
            const y2 = PADDING + (row + 1) * CELL_SIZE;
            
            if (gameState.board.verticalLines[row][col]) {
                const ownerIndex = gameState.board.verticalLineOwners[row][col];
                ctx.strokeStyle = gameState.players[ownerIndex].color;
                ctx.lineWidth = LINE_WIDTH;
            } else {
                ctx.strokeStyle = '#ddd';
                ctx.lineWidth = Math.max(1, LINE_WIDTH * 0.4);
            }
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    // Draw dots
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const x = PADDING + col * CELL_SIZE;
            const y = PADDING + row * CELL_SIZE;
            
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function handleCanvasClick(event) {
    if (!gameState.gameStarted) return;
    
    // Check if current player is AI
    if (gameState.players[gameState.currentPlayerIndex].type === 'ai') {
        return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Scale coordinates if canvas is scaled
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    
    const line = getClickedLine(scaledX, scaledY);
    
    if (line) {
        makeMove(line);
    }
}

function getClickedLine(x, y) {
    // Dynamic threshold based on cell size for better clicking
    const threshold = Math.max(10, CELL_SIZE * 0.2);
    
    let closestLine = null;
    let closestDistance = Infinity;
    
    // Check horizontal lines
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (gameState.board.horizontalLines[row][col]) continue;
            
            const x1 = PADDING + col * CELL_SIZE;
            const y1 = PADDING + row * CELL_SIZE;
            const x2 = PADDING + (col + 1) * CELL_SIZE;
            const midX = (x1 + x2) / 2;
            
            // Check if click is near this horizontal line
            if (Math.abs(y - y1) < threshold && x >= x1 - threshold && x <= x2 + threshold) {
                const distance = Math.abs(y - y1) + Math.abs(x - midX) * 0.1;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLine = { type: 'horizontal', row, col };
                }
            }
        }
    }
    
    // Check vertical lines
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (gameState.board.verticalLines[row][col]) continue;
            
            const x1 = PADDING + col * CELL_SIZE;
            const y1 = PADDING + row * CELL_SIZE;
            const y2 = PADDING + (row + 1) * CELL_SIZE;
            const midY = (y1 + y2) / 2;
            
            // Check if click is near this vertical line
            if (Math.abs(x - x1) < threshold && y >= y1 - threshold && y <= y2 + threshold) {
                const distance = Math.abs(x - x1) + Math.abs(y - midY) * 0.1;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLine = { type: 'vertical', row, col };
                }
            }
        }
    }
    
    return closestLine;
}

function makeMove(line) {
    if (!line) return;
    
    const { type, row, col } = line;
    
    // Mark the line and store the owner
    if (type === 'horizontal') {
        if (gameState.board.horizontalLines[row][col]) return;
        gameState.board.horizontalLines[row][col] = true;
        gameState.board.horizontalLineOwners[row][col] = gameState.currentPlayerIndex;
    } else {
        if (gameState.board.verticalLines[row][col]) return;
        gameState.board.verticalLines[row][col] = true;
        gameState.board.verticalLineOwners[row][col] = gameState.currentPlayerIndex;
    }
    
    // Check if any boxes were completed
    const completedBoxes = checkCompletedBoxes(line);
    
    if (completedBoxes.length > 0) {
        // Award boxes to current player
        completedBoxes.forEach(box => {
            gameState.board.boxes[box.row][box.col] = gameState.currentPlayerIndex;
            gameState.scores[gameState.currentPlayerIndex]++;
        });
        
        drawBoard();
        updateUI();
        
        // Check if game is over
        if (isGameOver()) {
            endGame();
            return;
        }
        
        // Player gets another turn - if AI, make another move
        if (gameState.players[gameState.currentPlayerIndex].type === 'ai') {
            setTimeout(makeAIMove, 500);
        }
    } else {
        // Switch to next player
        gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
        drawBoard();
        updateUI();
        
        // If next player is AI, make their move
        if (gameState.players[gameState.currentPlayerIndex].type === 'ai') {
            setTimeout(makeAIMove, 500);
        }
    }
}

function checkCompletedBoxes(line) {
    const completedBoxes = [];
    const { type, row, col } = line;
    
    if (type === 'horizontal') {
        // Check box above
        if (row > 0) {
            if (isBoxComplete(row - 1, col)) {
                completedBoxes.push({ row: row - 1, col });
            }
        }
        // Check box below
        if (row < GRID_SIZE - 1) {
            if (isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        }
    } else { // vertical
        // Check box to the left
        if (col > 0) {
            if (isBoxComplete(row, col - 1)) {
                completedBoxes.push({ row, col: col - 1 });
            }
        }
        // Check box to the right
        if (col < GRID_SIZE - 1) {
            if (isBoxComplete(row, col)) {
                completedBoxes.push({ row, col });
            }
        }
    }
    
    return completedBoxes;
}

function isBoxComplete(row, col) {
    if (gameState.board.boxes[row][col] !== null) return false;
    
    return gameState.board.horizontalLines[row][col] &&
           gameState.board.horizontalLines[row + 1][col] &&
           gameState.board.verticalLines[row][col] &&
           gameState.board.verticalLines[row][col + 1];
}

function isGameOver() {
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (gameState.board.boxes[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}

function updateUI() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const playerNumber = gameState.currentPlayerIndex + 1;
    
    // Update current player display
    currentPlayerDiv.innerHTML = `<strong>${currentPlayer.name}'s Turn (Player ${playerNumber})</strong>`;
    currentPlayerDiv.style.color = currentPlayer.color;
    currentPlayerDiv.style.borderLeft = `8px solid ${currentPlayer.color}`;
    currentPlayerDiv.style.paddingLeft = '20px';
    
    // Add pseudo-element color via CSS variable
    currentPlayerDiv.style.setProperty('--player-color', currentPlayer.color);
    
    scoresDiv.innerHTML = '';
    gameState.players.forEach((player, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'score-item';
        const playerNum = index + 1;
        scoreItem.textContent = `${playerNum}. ${player.name}: ${gameState.scores[index]}`;
        scoreItem.style.backgroundColor = player.color;
        scoresDiv.appendChild(scoreItem);
    });
}

function endGame() {
    gameState.gameStarted = false;
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    // Find winner(s)
    const maxScore = Math.max(...gameState.scores);
    
    finalScoresDiv.innerHTML = '<h3>Final Scores:</h3>';
    
    // Sort players by score
    const sortedPlayers = gameState.players
        .map((player, index) => ({ player, score: gameState.scores[index] }))
        .sort((a, b) => b.score - a.score);
    
    sortedPlayers.forEach(({ player, score }, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.className = 'final-score-item';
        if (index === 0 && score === maxScore) {
            scoreItem.classList.add('winner');
            scoreItem.textContent = `🏆 ${player.name}: ${score} boxes - WINNER!`;
        } else {
            scoreItem.textContent = `${player.name}: ${score} boxes`;
        }
        scoreItem.style.backgroundColor = player.color;
        finalScoresDiv.appendChild(scoreItem);
    });
}

function resetToSetup() {
    gameState = {
        players: [],
        currentPlayerIndex: 0,
        board: {
            horizontalLines: [],
            verticalLines: [],
            boxes: [],
            horizontalLineOwners: [],
            verticalLineOwners: []
        },
        scores: [],
        gameStarted: false
    };
    
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
    
    updatePlayerSetup();
}

// Advanced AI Logic with Minimax
function makeAIMove() {
    if (!gameState.gameStarted) return;
    if (gameState.players[gameState.currentPlayerIndex].type !== 'ai') return;
    
    const availableLines = getAllAvailableLines();
    if (availableLines.length === 0) return;
    
    let bestMove = null;
    let bestScore = -Infinity;
    
    // Evaluate each possible move
    for (const move of availableLines) {
        const score = evaluateMoveAI(move, gameState.currentPlayerIndex, 0);
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    
    if (bestMove) {
        makeMove(bestMove);
    }
}

function evaluateMoveAI(move, playerIndex, depth) {
    // Simulate the move
    const { type, row, col } = move;
    const originalValue = type === 'horizontal' ? 
        gameState.board.horizontalLines[row][col] : 
        gameState.board.verticalLines[row][col];
    
    // Make the move
    if (type === 'horizontal') {
        gameState.board.horizontalLines[row][col] = true;
        gameState.board.horizontalLineOwners[row][col] = playerIndex;
    } else {
        gameState.board.verticalLines[row][col] = true;
        gameState.board.verticalLineOwners[row][col] = playerIndex;
    }
    
    // Check boxes completed
    const completedBoxes = checkCompletedBoxes(move);
    let score = 0;
    
    // Reward for completing boxes
    score += completedBoxes.length * 1000;
    
    // Penalize for giving opponent boxes (look ahead)
    const opponentBoxesPossible = countOpponentBoxesAfterMove(move, playerIndex);
    score -= opponentBoxesPossible * 500;
    
    // Positional evaluation
    score += evaluatePositionalValue(move, playerIndex, completedBoxes);
    
    // If move completes boxes, recursively evaluate follow-up moves
    if (completedBoxes.length > 0 && depth < 3) {
        const followUpMoves = getAllAvailableLines();
        let maxFollowUp = -Infinity;
        
        for (const nextMove of followUpMoves) {
            const followUpScore = evaluateMoveAI(nextMove, playerIndex, depth + 1);
            if (followUpScore > maxFollowUp) {
                maxFollowUp = followUpScore;
            }
        }
        
        if (maxFollowUp !== -Infinity) {
            score += maxFollowUp * 0.5; // Weight future moves less
        }
    }
    
    // Undo the move
    if (type === 'horizontal') {
        gameState.board.horizontalLines[row][col] = originalValue;
        gameState.board.horizontalLineOwners[row][col] = null;
    } else {
        gameState.board.verticalLines[row][col] = originalValue;
        gameState.board.verticalLineOwners[row][col] = null;
    }
    
    return score;
}

function evaluatePositionalValue(move, playerIndex, completedBoxes) {
    let score = 0;
    const { type, row, col } = move;
    
    // Prefer moves in center of board (control)
    const centerRow = GRID_SIZE / 2;
    const centerCol = (GRID_SIZE - 1) / 2;
    let distanceToCenter = 0;
    
    if (type === 'horizontal') {
        distanceToCenter = Math.abs(row - centerRow) + Math.abs(col - centerCol);
    } else {
        distanceToCenter = Math.abs(row - (GRID_SIZE - 1) / 2) + Math.abs(col - centerCol);
    }
    
    // Penalize distance from center
    score -= distanceToCenter * 5;
    
    // Evaluate adjacent boxes
    let twoSidedBoxes = 0;
    let threeSidedBoxes = 0;
    
    if (type === 'horizontal') {
        if (row > 0 && gameState.board.boxes[row - 1][col] === null) {
            const sides = countBoxSides(row - 1, col);
            if (sides === 2) twoSidedBoxes++;
            if (sides === 3) threeSidedBoxes++;
        }
        if (row < GRID_SIZE - 1 && gameState.board.boxes[row][col] === null) {
            const sides = countBoxSides(row, col);
            if (sides === 2) twoSidedBoxes++;
            if (sides === 3) threeSidedBoxes++;
        }
    } else {
        if (col > 0 && gameState.board.boxes[row][col - 1] === null) {
            const sides = countBoxSides(row, col - 1);
            if (sides === 2) twoSidedBoxes++;
            if (sides === 3) threeSidedBoxes++;
        }
        if (col < GRID_SIZE - 1 && gameState.board.boxes[row][col] === null) {
            const sides = countBoxSides(row, col);
            if (sides === 2) twoSidedBoxes++;
            if (sides === 3) threeSidedBoxes++;
        }
    }
    
    // Creating 3-sided boxes is bad (opponent gets them)
    score -= threeSidedBoxes * 200;
    
    // Creating 2-sided boxes is good (setup)
    if (completedBoxes.length === 0) {
        score += twoSidedBoxes * 50;
    }
    
    return score;
}

function countOpponentBoxesAfterMove(move, playerIndex) {
    // Count how many boxes opponents could complete after this move
    let potentialOpponentBoxes = 0;
    const { type, row, col } = move;
    
    // Check adjacent boxes for 3-sided status
    if (type === 'horizontal') {
        if (row > 0 && gameState.board.boxes[row - 1][col] === null) {
            if (countBoxSides(row - 1, col) === 3) potentialOpponentBoxes++;
        }
        if (row < GRID_SIZE - 1 && gameState.board.boxes[row][col] === null) {
            if (countBoxSides(row, col) === 3) potentialOpponentBoxes++;
        }
    } else {
        if (col > 0 && gameState.board.boxes[row][col - 1] === null) {
            if (countBoxSides(row, col - 1) === 3) potentialOpponentBoxes++;
        }
        if (col < GRID_SIZE - 1 && gameState.board.boxes[row][col] === null) {
            if (countBoxSides(row, col) === 3) potentialOpponentBoxes++;
        }
    }
    
    return potentialOpponentBoxes;
}



function countBoxSides(row, col) {
    let count = 0;
    if (gameState.board.horizontalLines[row][col]) count++;
    if (gameState.board.horizontalLines[row + 1][col]) count++;
    if (gameState.board.verticalLines[row][col]) count++;
    if (gameState.board.verticalLines[row][col + 1]) count++;
    return count;
}

function getAllAvailableLines() {
    const lines = [];
    
    // Horizontal lines
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE - 1; col++) {
            if (!gameState.board.horizontalLines[row][col]) {
                lines.push({ type: 'horizontal', row, col });
            }
        }
    }
    
    // Vertical lines
    for (let row = 0; row < GRID_SIZE - 1; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (!gameState.board.verticalLines[row][col]) {
                lines.push({ type: 'vertical', row, col });
            }
        }
    }
    
    return lines;
}
