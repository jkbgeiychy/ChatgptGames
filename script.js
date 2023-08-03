<!DOCTYPE html>
<html>
<head>
  <title>Wordle Game</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }
    canvas {
      border: 1px solid #000;
    }
  </style>
</head>
<body>
  <script>
    // Word bank containing the five-letter words, prepositions, pronouns, and new words
    const words = [
           "above", "acute", "alive", "alone", "angry", "aware", "awful", "basic", "black", "blind",
      "brave", "brief", "broad", "brown", "cheap", "chief", "civil", "clean", "clear", "close",
      "crazy", "daily", "dirty", "early", "empty", "equal", "exact", "extra", "faint", "false",
      "fifth", "final", "first", "fresh", "front", "funny", "giant", "grand", "great", "green",
      "gross", "happy", "harsh", "heavy", "human", "ideal", "inner", "joint", "large", "legal",
      "level", "light", "local", "loose", "lucky", "magic", "major", "minor", "moral", "naked",
      "nasty", "naval", "other", "outer", "plain", "prime", "prior", "proud", "quick", "quiet",
      "rapid", "ready", "right", "roman", "rough", "round", "royal", "rural", "sharp", "sheer",
      "short", "silly", "sixth", "small", "smart", "solid", "sorry", "spare", "steep", "still",
      "super", "sweet", "thick", "third", "tight", "total", "tough", "upper", "upset", "urban",
      "usual", "vague", "valid", "vital", "white", "whole", "wrong", "young",
      "abuse", "adult", "agent", "anger", "apple", "award", "basis", "beach", "birth", "block",
      "blood", "board", "brain", "bread", "break", "brown", "buyer", "cause", "chain", "chair",
      "chest", "chief", "child", "china", "claim", "class", "clock", "coach", "coast", "court",
      "cover", "cream", "crime", "cross", "crowd", "crown", "cycle", "dance", "death", "depth",
      "doubt", "draft", "drama", "dream", "dress", "drink", "drive", "earth", "enemy", "entry",
      "error", "event", "faith", "fault", "field", "fight", "final", "floor", "focus", "force",
      "frame", "frank", "front", "fruit", "glass", "grant", "grass", "green", "group", "guide",
      "heart", "henry", "horse", "hotel", "house", "image", "index", "input", "issue", "japan",
      "jones", "judge", "knife", "laura", "layer", "level", "lewis", "light", "limit", "lunch",
      "major", "march", "match", "metal", "model", "money", "month", "motor", "mouth", "music",
      "night", "noise", "north", "novel", "nurse", "offer", "order", "other", "owner", "panel",
      "paper", "party", "peace", "peter", "phase", "phone", "piece", "pilot", "pitch", "place",
      "plane", "plant", "plate", "point", "pound", "power", "press", "price", "pride", "prize",
      "proof", "queen", "radio", "range", "ratio", "reply", "right", "river", "round", "route",
      "rugby", "scale", "scene", "scope", "score", "sense", "shape", "share", "sheep", "sheet",
      "shift", "shirt", "shock", "sight", "simon", "skill", "sleep", "smile", "smith", "smoke",
      "sound", "south", "space", "speed", "spite", "sport", "squad", "staff", "stage", "start",
      "state", "steam", "steel", "stock", "stone", "store", "study", "stuff", "style", "sugar",
      "table", "taste", "terry", "theme", "thing", "title", "total", "touch", "tower", "track",
      "trade", "train", "trend", "trial", "trust", "truth", "uncle", "union", "unity", "value",
      "video", "visit", "voice", "waste", "watch", "water", "while", "white", "whole", "woman",
      "world", "youth", "one’s", "there", "where", "which", "whose", "whoso", "yours",
      "aback", "abaft", "aboon", "about", "above", "adown", "afore", "after", "along", "among",
      "below", "circa", "cross", "minus", "neath", "round", "since", "under", "until",
      "aargh", "adios", "alack", "aloha", "basta", "begad", "bless", "bravo", "damme", "frick",
      "golly", "gratz", "hallo", "havoc", "hella", "howay", "howdy", "hullo", "huzza", "jesus",
      "kapow", "loose", "lordy", "marry", "plonk", "skoal", "sniff", "sooey", "thiam", "thwap",
      "viola", "vivat", "wacko", "wahey", "wilma", "wirra", "woops", "wowie", "yecch", "yeeha",
      "yeesh", "yowch", "zowie"
    ];

    // Define the secret word and initialize attempts
    let secretWord = generateSecretWord();
    let attempts = 0;
    const maxAttempts = 6;

    // Function to generate a random five-letter word for the game
    function generateSecretWord() {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    }

    // Function to check the player's guess and provide feedback
    function checkGuess() {
      if (attempts >= maxAttempts) {
        alert("Out of attempts. The secret word was: " + secretWord);
        return;
      }

      const guess = document.getElementById("guessInput").value.toLowerCase();

      if (guess.length !== 5) {
        alert("Please enter a five-letter word.");
        return;
      }

      if (!words.includes(guess)) {
        alert("Please enter a word from the word bank.");
        return;
      }

      let feedback = "";

      for (let i = 0; i < 5; i++) {
        if (guess[i] === secretWord[i]) {
          feedback += "<span style='color: green;'>" + guess[i] + "</span>";
        } else if (secretWord.includes(guess[i])) {
          feedback += "<span style='color: yellow;'>" + guess[i] + "</span>";
        } else {
          feedback += guess[i];
        }
      }

      document.getElementById("feedback").innerHTML = feedback;

      // Clear the canvas
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw colored boxes for each letter of the last guessed word
      const boxWidth = 30;
      const boxHeight = 30;
      const startX = 10;
      const startY = 10;

      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const color = secretWord.includes(letter) ? "yellow" : "gray";
        ctx.fillStyle = color;
        ctx.fillRect(startX + i * (boxWidth + 5), startY, boxWidth, boxHeight);

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, startX + i * (boxWidth + 5) + boxWidth / 2, startY + boxHeight / 2);
      }

      if (guess === secretWord) {
        alert("Congratulations! You guessed the word!");
      } else {
        attempts++;
      }
    }

    // Function to handle Enter key press
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        checkGuess();
      }
    }
  </script>

  <div style="text-align: center;">
    <h1>Wordle Game</h1>
    <canvas id="gameCanvas" width="200" height="50"></canvas>
    <p>Guess the five-letter word:</p>
    <input type="text" id="guessInput" onkeypress="handleKeyPress(event)">
    <button onclick="checkGuess()">Guess</button>
    <p id="feedback"></p>
  </div>
</body>
</html>
