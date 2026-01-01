# Lines and Boxes Game 🎮

A modern, interactive implementation of the classic Lines and Boxes (Dots and Boxes) game with beautiful UI, intelligent AI opponents, and customizable gameplay.

![Game Screenshot](https://img.shields.io/badge/Game-Lines%20%26%20Boxes-purple?style=for-the-badge)
![Players](https://img.shields.io/badge/Players-2--4-blue?style=for-the-badge)
![Mode](https://img.shields.io/badge/Mode-Local%20Play-orange?style=for-the-badge)

## 🎯 Game Description

Lines and Boxes is a strategic pencil-and-paper game where players take turns drawing lines between dots on a grid. When a player completes the fourth side of a box, they claim it and earn another turn. The player with the most boxes at the end wins!

## ✨ Features

### Core Gameplay
- **2-4 Players** - Play with friends locally or against AI
- **Pass-and-Play** - Multiple players on the same device
- **Human vs AI** - Choose human or AI opponents for each player
- **Multiple Board Sizes** - Select from 30x30, 40x40, or 50x50 grids
- **Custom Player Colors** - Each player chooses their own color
- **Bonus Turn System** - Complete a box to earn another turn
- **Smart AI** - Advanced AI with minimax algorithm and strategic evaluation

### AI Features 🤖
- **Strategic Decision Making** - AI evaluates moves up to 3 steps ahead
- **Box Completion Priority** - Always completes available boxes
- **Opponent Prevention** - Avoids giving boxes to opponents
- **Positional Control** - Prefers center board positions
- **Risk Assessment** - Analyzes 3-sided box creation

### Visual & Interface
- **Beautiful UI** - Modern, colorful gradient design
- **Responsive Design** - Adapts to any screen size
- **Color-Coded Gameplay** - Lines and boxes show in player colors
- **Real-Time Scores** - Live scoreboard with player standings
- **Clear Turn Indicators** - Always know whose turn it is
- **Smooth Animations** - Winner celebration effects
- **Desktop Window Support** - Play in a native Windows window

## 🎮 How to Play

### Game Rules
1. Players take turns drawing lines between adjacent dots
2. When you complete the 4th side of a box:
   - The box is filled with your color
   - Your player number appears in the box
   - You get another turn immediately
3. Game ends when all boxes are completed
4. Player with the most boxes wins!

## 🚀 Quick Start

### Option 1: Desktop Application (Recommended for Windows)

**First Time Setup:**
1. Double-click **`1. Install Requirements.bat`**
2. Wait for pywebview to install

**Play the Game:**
1. Double-click **`2. Play Game.bat`**
2. Game opens in a native desktop window
3. Configure players and board size
4. Start playing!

### Option 2: Browser Version

**Simply open `index.html` in any modern web browser:**
- Chrome
- Firefox  
- Edge
- Safari

No installation required! Perfect for quick games on any device.

## ⚙️ Game Setup

When starting a new game, you can configure:

1. **Board Size**: Choose from 30x30, 40x40, or 50x50
2. **Number of Players**: 2-4 players
3. **For Each Player**:
   - Player name
   - Type: **Human** (for pass-and-play) or **AI** (computer opponent)
   - Color selection

### Play Modes

**🎮 Pass-and-Play Mode**
- Multiple humans on the same device
- Players take turns at the screen
- Perfect for family game nights

**🤖 Human vs AI Mode**
- Play against computer opponents
- Mix human and AI players
- Great for practice or solo play

**👥 Mixed Mode**
- Combine human and AI players
- Example: 2 humans + 1 AI

## 📁 Project Structure

```
Lines-and-Boxes/
├── index.html                  # Main game HTML interface
├── game.js                     # Game logic, AI, and rendering
├── style.css                   # Game styling and animations
├── app.py                      # Desktop window launcher (Python)
├── 1. Install Requirements.bat # Setup script for desktop mode
├── 2. Play Game.bat           # Launch script for desktop mode
└── README.md                  # This file
```

## 🛠️ Technologies Used

- **HTML5** - Structure and canvas element for game board
- **CSS3** - Modern styling, animations, gradients, responsive design
- **JavaScript** - Game logic, AI algorithms, and canvas rendering
- **Python + pywebview** - Optional desktop window wrapper

## 🎨 Customization

### Change Board Sizes
Edit `index.html`:
```html
<select id="boardSize">
    <option value="30">30 x 30</option>
    <option value="40">40 x 40</option>
    <option value="50">50 x 50</option>
    <option value="60">60 x 60</option> <!-- Add custom sizes -->
</select>
```

### Modify AI Difficulty
Edit `game.js` - adjust scoring weights in the `evaluateMoveAI` function:
```javascript
// In evaluateMoveAI function
score += completedBoxes.length * 1000;  // Box completion reward
score -= opponentBoxesPossible * 500;   // Opponent prevention penalty
```

### Change Player Colors
Edit `game.js`:
```javascript
const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
// Add more colors or change existing ones
```

## 🐛 Troubleshooting

### Desktop Application Issues

**❌ Desktop version won't start**
- Ensure Python is installed: `python --version`
- Install pywebview: Run `1. Install Requirements.bat` or `pip install pywebview`
- Try running directly: `python app.py` in terminal to see error messages

**❌ "pywebview is not installed" error**
- Run `1. Install Requirements.bat`
- Or manually: `python -m pip install pywebview`

### Browser Version Issues

**❌ Game not loading in browser**
- Use a modern browser (Chrome, Firefox, Edge, Safari)
- Check browser console for errors (press F12)
- Ensure all files (index.html, game.js, style.css) are in the same folder
- Try opening directly: Right-click index.html → Open with → Chrome/Firefox

**❌ Lines are hard to click**
- The click detection adapts to board size automatically
- Try clicking closer to the center of lines
- Larger board sizes have bigger click areas
- Make sure your browser zoom is at 100%

**❌ AI is too slow on large boards**
- Use smaller board sizes (30x30) for faster AI
- The AI evaluates moves 3 steps ahead, which takes time on 50x50 boards
- Consider reducing look-ahead depth in game.js (change `depth < 3` to `depth < 2`)

## 💡 Tips for Best Experience

### Gameplay Strategy
- **Complete Chains**: When you complete one box, look for more connected boxes!
- **Avoid Giving Boxes**: Don't create 3-sided boxes for opponents
- **Control the Center**: Center positions offer more strategic opportunities
- **Count Remaining Boxes**: Know when to make sacrificial moves
- **Block Opponents**: Strategic defensive play wins games
- **Think Ahead**: Plan 2-3 moves in advance

### Against AI
- **AI Difficulty**: The AI is quite strong! It looks 3 moves ahead
- **Early Game**: Focus on controlling the center
- **Mid Game**: Avoid creating 3-sided boxes
- **End Game**: Count boxes carefully for optimal strategy

### Pass-and-Play
- **Honor System**: Players take turns at the screen
- **No Peeking**: Look away when it's not your turn (AI games only)
- **Time Limits**: Set optional time limits for faster games
- **Discuss Moves**: Great for learning and teaching strategies

## 🎯 Game Modes

### Pass-and-Play (Multiple Humans)
Perfect for:
- 🏠 Family game nights
- ✈️ Travel without internet
- 👨‍👩‍👧‍👦 Quick games with friends
- 🎮 Casual local gaming
- 🏢 Office break time

### Human vs AI
Perfect for:
- 🧠 Practice and skill improvement
- 🤖 Playing solo
- 📚 Learning strategies
- 🎯 Testing new tactics
- 🏆 Challenge yourself

### Mixed Mode (Humans + AI)
Perfect for:
- 👥 Uneven number of players
- 🎓 Teaching new players (AI as example)
- 🎪 Adding variety to games
- 🤹 Practicing against AI while playing with friends

## 🤖 AI Strategy Details

The AI uses an advanced decision-making system:

1. **Box Completion Priority** - Always completes available boxes first (1000 points)
2. **Opponent Prevention** - Avoids giving opponent boxes (-500 points)
3. **Positional Control** - Prefers center board positions
4. **Look-Ahead Analysis** - Evaluates consequences up to 3 moves ahead
5. **Risk Assessment** - Carefully analyzes 3-sided box creation
6. **Strategic Setup** - Creates 2-sided boxes for future captures

The AI becomes more strategic on larger boards but also takes longer to calculate moves.

## 🏆 Winning Tips

- **Complete chains** - When you complete one box, carefully scan for additional connected boxes you can complete
- **Don't give free boxes** - Avoid creating 3-sided boxes unless you plan to complete them yourself immediately
- **Control the center** - Center positions give you more flexibility and control
- **Count ahead** - Know how many boxes remain and plan your endgame
- **Force sacrifices** - Sometimes giving away a few boxes to gain more later is worth it
- **Watch the opponent** - Especially important against human players who might make mistakes

## 📜 License

Free to use and modify for personal and educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve! Some ideas:
- Add online multiplayer functionality
- Implement multiple AI difficulty levels
- Add sound effects and background music
- Create tournament mode with brackets
- Add game statistics and move history
- Implement undo/redo functionality
- Mobile app version
- Add themes and color schemes

## 🎮 Play Now!

**Clone and play in 3 simple steps:**

```bash
# 1. Clone the repository
git clone https://github.com/Q-MR13/Line-and-Boxes.git
cd Line-and-Boxes

# 2. Open in browser
# Just open index.html in your browser!

# OR for desktop app:
# 3a. Install requirements (Windows)
# Double-click: 1. Install Requirements.bat

# 3b. Play game (Windows)  
# Double-click: 2. Play Game.bat
```

---

**Made with ❤️ for game lovers everywhere**

**Good Game, Have Fun! 🎮🎉**
