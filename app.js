const players = [];
const playerContainer = document.querySelector('#PlayerContainer');
const playerNumSelect = document.querySelector('#PlayerNum');
const scoreDisplay = document.querySelector('#ScoreDisplay');
const winningScoreSelect = document.querySelector('#WinningScore');
const resetButton = document.querySelector('#reset');
const initialPlayerNum = 4;
const buttonColors = ['is-primary', 'is-info', 'is-success', 'is-link'];

let isGameOver = false;
let winningScore = parseInt(winningScoreSelect.value);

// プレイヤーのボタンと表示を動的に生成する関数
function generatePlayers(num) {
    // 既存のプレイヤーとスコア表示を削除
    players.length = 0;
    scoreDisplay.innerHTML = ''
    const existingButtons = document.querySelectorAll('.player-button');
    existingButtons.forEach(btn => btn.remove());

    // 新しいプレイヤーとスコア表示を生成
    for (let i = 0; i < num; i++) {
        const player = {
            score: 0,
            button: document.createElement('button'),
            display: document.createElement('span')
        };
        player.display.id = `p${i + 1}Display`;
        player.display.textContent = "0";
        scoreDisplay.appendChild(player.display);
        if (i < num - 1) {
            scoreDisplay.appendChild(document.createTextNode(" 対 "));
        }
        player.button.textContent = `+1 player${i + 1}`;
        player.button.classList.add('button', 'is-large', 'player-button', buttonColors[i]);
        player.button.addEventListener('click', function () {
            updateScores(player);
        });
        players.push(player);
        playerContainer.appendChild(player.button);
    }
}

// スコア更新関数
function updateScores(player) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            players.forEach(p => {
                if (p !== player) {
                    p.display.classList.add('has-text-danger');
                    p.button.disabled = true;
                }
            });
            player.button.disabled = true;
        }
    }
}

// スコアリセット関数
function reset() {
    isGameOver = false;
    for (let p of players) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

playerNumSelect.addEventListener('change', function () {
    generatePlayers(parseInt(this.value));
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);

// 初期化時にプレイヤーを生成
generatePlayers(initialPlayerNum);