let words = [];
let testWords = [];
let currentIndex = 0;
let timer = 15;
let interval = null;
let correctChars = 0;
let totalChars = 0;
let testDuration = 15;
let history = JSON.parse(localStorage.getItem("typingHistory") || "[]");

// Load dictionary wordlist
fetch("wordlist.txt")
  .then(res => res.text())
  .then(text => {
      words = text.split("\n").filter(w => w.length > 0).filter(w => w.length < 6);
  });

function updateHistoryDisplay() {
    let div = document.getElementById("history");
    div.innerHTML = history
        .map(h => `<div>WPM: ${h.wpm} | Accuracy: ${h.acc}% | Time: ${h.time}s</div>`)
        .join("");
}
updateHistoryDisplay();

function getRandomWords(count = 60) {
    return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]);
}

function loadWords() {
    testWords = getRandomWords();
    const display = document.getElementById("word-display");
    display.innerHTML = "";

    testWords.forEach((word, i) => {
        const wordSpan = document.createElement("span");
        wordSpan.id = "word-" + i;

        // Break into letters for highlighting
        [...word].forEach(letter => {
            const span = document.createElement("span");
            span.className = "letter";
            span.textContent = letter;
            wordSpan.appendChild(span);
        });

        display.appendChild(wordSpan);
        display.appendChild(document.createTextNode(" "));
    });

    document.getElementById("word-" + currentIndex).classList.add("current-word");
}

function startTest() {
    currentIndex = 0;
    timer = testDuration;
    correctChars = 0;
    totalChars = 0;

    document.getElementById("time").textContent = timer;
    document.getElementById("wpm").textContent = 0;
    document.getElementById("accuracy").textContent = 100;
    document.getElementById("repeat-btn").style.display = "none";

    loadWords();

    const input = document.getElementById("typing-input");
    input.value = "";
    input.disabled = false;
    input.focus();

    interval = setInterval(() => {
        timer--;
        document.getElementById("time").textContent = timer;

        if (timer <= 0) finishTest();
    }, 1000);
}

function finishTest() {
    clearInterval(interval);

    document.getElementById("typing-input").disabled = true;
    document.getElementById("repeat-btn").style.display = "inline-block";

    let wpm = Math.round((correctChars / 5) / (testDuration / 60));
    let accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);

    document.getElementById("wpm").textContent = wpm;
    document.getElementById("accuracy").textContent = accuracy;

    // Save to history
    history.push({ wpm, acc: accuracy, time: testDuration });
    localStorage.setItem("typingHistory", JSON.stringify(history));

    updateHistoryDisplay();
}

document.getElementById("typing-input").addEventListener("input", (e) => {
    let input = e.target.value;
    let target = testWords[currentIndex];
    let wordSpan = document.getElementById("word-" + currentIndex);

    totalChars++;

    // Remove previous highlighting
    [...wordSpan.children].forEach(l => {
        l.className = "letter";
    });

    // Per-letter correctness
    [...input].forEach((ch, i) => {
        if (i < target.length) {
            let letter = wordSpan.children[i];
            if (ch === target[i]) {
                letter.className = "letter correct-letter";
            } else {
                letter.className = "letter incorrect-letter";
            }
        }
    });

    // When the whole word matches
    if (input.trim() === target) {
        correctChars += target.length;
        wordSpan.classList.remove("current-word");

        currentIndex++;
        document.getElementById("word-" + currentIndex)?.classList.add("current-word");

        e.target.value = "";
    }
});

// Timer selection buttons
document.querySelectorAll(".timer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".timer-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        testDuration = parseInt(btn.dataset.time);
        document.getElementById("time").textContent = testDuration;
    });
});

// Start + Repeat buttons
document.getElementById("start-btn").addEventListener("click", startTest);
document.getElementById("repeat-btn").addEventListener("click", startTest);