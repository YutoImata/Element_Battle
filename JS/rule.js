/*
 *
 * rule.js
 * 
 */

/* プレイヤーと敵のエレメントポイントの変数 */
let playerElementPoints = 0;
let opponentElementPoints = 0;

/* カードを出したときのエレメントポイントの計算 */
function applyCardEffect(card, isPlayer) {
    if (card.suit === '♥') {
        if (isPlayer) {
            playerElementPoints += 10;
        } else {
            opponentElementPoints += 2;
        }
    } else if (card.suit === '♦') {
        if (isPlayer) {
            playerElementPoints += 10;
        } else {
            opponentElementPoints += 1;
        }
    } else if (card.suit === '♣') {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 1);
        } else {
            playerElementPoints = Math.max(0, playerElementPoints - 1);
        }
    } else if (card.suit === '♠') {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 2);
        } else {
            playerElementPoints = Math.max(0, playerElementPoints - 2);
        }
    } else if (card.suit === 'Joker') {
        if (isPlayer) {
            playerElementPoints += 3;
        } else {
            opponentElementPoints += 3;
        }
    }
    console.log('自分：', playerElementPoints);
    console.log('敵：', opponentElementPoints);
}

/* エレメントポイントを表示する関数 */
function updateElementPointsDisplay() {
    document.getElementById('player-points').textContent = playerElementPoints;
    document.getElementById('opponent-points').textContent = opponentElementPoints;
}

/* 勝利かどうかを判定する関数 */
function checkForWin() {
    if (playerElementPoints >= 10) {
        /* ターンの進行を停止する */
        currentPlayer = null;
        setTimeout(() => {
            endGame();
            showVictoryMessage();
        }, 1500); // 1.5秒間待機

    } else if (opponentElementPoints >= 10) {
        /* ターンの進行を停止する */
        currentPlayer = null;
        setTimeout(() => {
            endGame();
            showLoseMessage(); 
        }, 1000); // 1秒間待機
    }
}

/* 勝利メッセージを表示する関数 */
function showVictoryMessage() {
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'block';
    showEndGameButtons();
}

function showLoseMessage() {
    const loseMessage = document.getElementById('lose-message');
    loseMessage.style.display = 'block';
    showEndGameButtons();
}

/* ゲーム終了時にボタンを２つ用意する */
function showEndGameButtons() {
    const endGameButtons = document.getElementById('end-game-buttons');
    endGameButtons.style.display = 'block';

    /* タイトルへ戻る */
    document.getElementById('return-title').onclick = () => {
        window.location.href = '../index.html';
    };

    /* もう一度プレイする */
    document.getElementById('replay-game').onclick = () => {
        window.location.reload(); /* リロードしてもう一度プレイできるようにする */
    };
}