# Lines and Boxes Game 🎮

A modern, interactive implementation of the classic Lines and Boxes (Dots and Boxes) game with beautiful UI, intelligent AI opponents, and customizable gameplay.

## 🎯 Game Description

Lines and Boxes is a strategic pencil-and-paper game where players take turns drawing lines between dots on a grid. When a player completes the fourth side of a box, they claim it and earn another turn. The player with the most boxes at the end wins!

## ✨ Features

### Core Gameplay
- **2-4 Players** - Play with friends or against AI
- **Human vs AI** - Choose human or AI opponents for each player
- **Multiple Board Sizes** - Select from 30x30, 40x40, or 50x50 grids
- **Custom Player Colors** - Each player chooses their own color
- **Bonus Turn System** - Complete a box to earn another turn
- **Smart AI** - Advanced AI with minimax algorithm and strategic evaluation

### Visual & Interface
- **Beautiful UI** - Modern, colorful gradient design
- **Responsive Design** - Adapts to any screen size
- **Color-Coded Gameplay** - Lines and boxes show in player colors
- **Real-Time Scores** - Live scoreboard with player standings
- **Clear Turn Indicators** - Always know whose turn it is
- **Smooth Animations** - Winner celebration effects

### Technical Features
- **Pure JavaScript** - No external dependencies for gameplay
- **Canvas-Based Graphics** - Smooth, scalable rendering
- **Smart Click Detection** - Easy line selection on any board size
- **Desktop Window Support** - Play in a native Windows window (optional)

## 🎮 How to Play

### Game Rules
1. Players take turns drawing lines between adjacent dots
2. When you complete the 4th side of a box:
   - The box is filled with your color
   - Your player number appears in the box
   - You get another turn immediately
3. Game ends when all boxes are completed
4. Player with the most boxes wins!

### Playing Locally (Desktop)

#### Requirements
- Python 3.6 or higher
- Windows operating system

#### Setup
1. **Install Requirements** (First time only)
   - Double-click `1. Install Requirements.bat`
   - Wait for pywebview to install

2. **Play the Game**
   - Double-click `2. Play Game.bat`
   - Game opens in a native window

### Playing Online (Browser)

Simply open `index.html` in any modern web browser:
- Chrome
- Firefox
- Edge
- Safari

Or deploy to free hosting services like:
- Netlify (drag & drop)
- GitHub Pages
- Vercel
- Firebase Hosting

## 🚀 Quick Start

### Option 1: Browser Version
```bash
# Just open the file
start index.html
```

### Option 2: Desktop Application
```bash
# Install requirements (first time only)
python -m pip install pywebview

# Run the game
python app.py
```

### Option 3: Online Deployment
1. Upload `index.html`, `style.css`, and `game.js` to:
   - Netlify
   - GitHub Pages
   - Vercel
2. Share the link with friends!

## 📁 Project Structure

```
Lines-and-Boxes/
├── index.html              # Main game HTML
├── style.css              # Game styling and animations
├── game.js                # Game logic and AI
├── app.py                 # Desktop window launcher (Python)
├── 1. Install Requirements.bat  # Setup script
├── 2. Play Game.bat       # Launch script
└── README.md              # This file
```

## 🎨 Customization

### Change Board Sizes
Edit `index.html`:
```html
<select id="boardSize">
    <option value="30">30 x 30</option>
    <option value="40">40 x 40</option>
    <option value="50">50 x 50</option>
    <!-- Add custom sizes -->
</select>
```

### Modify AI Difficulty
Edit `game.js` - adjust scoring weights:
```javascript
// In evaluateMoveAI function
score += completedBoxes.length * 1000;  // Box completion reward
score -= opponentBoxesPossible * 500;   // Opponent prevention penalty
```

### Change Default Colors
Edit `game.js`:
```javascript
const defaultColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
```

## 🤖 AI Strategy

The AI uses an advanced decision-making system:

1. **Box Completion Priority** - Always completes available boxes (1000 points)
2. **Opponent Prevention** - Avoids giving opponent boxes (-500 points)
3. **Positional Control** - Prefers center board positions
4. **Look-Ahead** - Evaluates consequences up to 3 moves ahead
5. **Risk Assessment** - Analyzes 3-sided box creation
6. **Strategic Setup** - Creates 2-sided boxes for future captures

## 🛠️ Technologies Used

- **HTML5** - Structure and canvas element
- **CSS3** - Styling, animations, responsive design
- **JavaScript** - Game logic, AI, and rendering
- **Python + pywebview** - Desktop window (optional)

## 📝 Game Setup Options

When starting a new game, configure:

1. **Board Size**: 30x30, 40x40, or 50x50
2. **Number of Players**: 2-4 players
3. **For Each Player**:
   - Player name
   - Type (Human or AI)
   - Color selection

## 🏆 Winning Tips

- **Complete chains** - When you complete one box, look for more!
- **Avoid giving boxes** - Don't create 3-sided boxes for opponents
- **Control the center** - Center positions offer more opportunities
- **Count remaining boxes** - Know when to make sacrificial moves
- **Block opponents** - Strategic defensive play wins games

## 🐛 Troubleshooting

### Desktop version won't start
- Make sure Python is installed: `python --version`
- Install pywebview: `python -m pip install pywebview`
- Try running directly: `python app.py`

### Game not loading in browser
- Use a modern browser (Chrome, Firefox, Edge)
- Check browser console for errors (F12)
- Make sure all files are in the same folder

### Lines hard to click on small boards
- The click detection adapts to board size
- Try clicking closer to the center of lines
- Larger board sizes have bigger click areas

## 📄 License

Free to use and modify for personal and educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve the game! Some ideas:
- Add more board size options
- Implement difficulty levels for AI
- Add sound effects
- Create themes/skins
- Add game statistics
- Implement online multiplayer

## 📧 Support

For issues or questions:
- Check the troubleshooting section above
- Review the game files and comments
- Test in different browsers

---

**Enjoy playing Lines and Boxes!** 🎉

Made with ❤️ for strategy game enthusiasts
