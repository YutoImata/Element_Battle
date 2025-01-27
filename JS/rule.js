/*
 *
 * rule.js
 * 
 */

/* プレイヤーと敵のエレメントポイントの変数 */
let playerElementPoints = 0;
let opponentElementPoints = 0;

/* Jokerが今選択されているかどうか */
let isSelectingJoker = true;

/* カードを出したときのエレメントポイントの計算 */
function applyCardEffect(card, isPlayer) {
    console.log('現在のカード:', card); /* 出したカードのsuitとrankが出力される */

    applySpecialCardRules(card, isPlayer);

    if (specialCard) {
        return; /* スートの計算を省くためにreturn */
    }
    
    else if (card.suit === '♥') {
        if (isPlayer) {
            playerElementPoints += 2;
        } else {
            opponentElementPoints += 2;
        }
    } else if (card.suit === '♦') {
        if (isPlayer) {
            playerElementPoints += 1;
        } else {
            opponentElementPoints += 1;
        }
    } else if (card.suit === '♣') {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 1);
            console.log('クローバーでマイナスされてる');
        } else {
            playerElementPoints = Math.max(0, playerElementPoints - 1);
            console.log('クローバーでマイナスされてる');
        }
    } else if (card.suit === '♠') {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 2);
            console.log('スペードでマイナスされてる');
        } else {
            playerElementPoints = Math.max(0, playerElementPoints - 2);
            console.log('スペードでマイナスされてる');
        }
    } else if (card.suit === 'J' && card.rank === 'oker') { /* console.logで確認したらこのように区別されていた */
        if (isPlayer) {
            isSelectingJoker = true;
        showJokerOptions(isPlayer);
        } else {
            if (playerElementPoints >= 10) {
                playerElementPoints -= 5; /* これは絶対に負の数に行かないからこれでいい */
            } else {
                opponentElementPoints += 5;
            }
        }
    }
    console.log('自分：', playerElementPoints);
    console.log('敵：', opponentElementPoints);
}

/* Jokerを出した際に選択肢を画面上に出す */
function showJokerOptions(isPlayer) {
    const jokerMessage = document.getElementById('joker-message');
    const jokerSelectButtons = document.getElementById('joker-select-buttons');
    /* 背景を薄くする */
    const body = document.querySelector('body'); /* bodyタグを取得 */
    body.classList.add('transparent-background');

    jokerMessage.style.display = 'block';
    jokerSelectButtons.style.display = 'block';
    

    document.getElementById('increase-points').onclick = () => {
        if (isPlayer) {
            playerElementPoints += 5;
        }
        hideJokerOptions();
        updateElementPointsDisplay(); /* エレメントポイントを更新 */
        checkForWin(); /* 勝利しているかをチェック */
    };

    document.getElementById('decrease-points').onclick = () => {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 5);
        }
        hideJokerOptions();
        updateElementPointsDisplay(); /* エレメントポイントを更新 */
        checkForWin(); /* 勝利しているかをチェック */
    };
}

/* 選択肢を非表示にする関数 */
function hideJokerOptions() {
    const jokerMessage = document.getElementById('joker-message');
    const jokerSelectButtons = document.getElementById('joker-select-buttons');
    jokerMessage.style.display = 'none';
    jokerSelectButtons.style.display = 'none';

    /* 背景を元に戻す */
    const body = document.querySelector('body'); /* bodyタグを取得 */
    body.classList.remove('transparent-background');

    isSelectingJoker = false; /* ここでJokerのフラグを解除する */
    opponentTurn(); /* 敵のターンを開始する */
}


/* エレメントポイントを表示する関数 */
function updateElementPointsDisplay() {
    document.getElementById('player-points').textContent = playerElementPoints;
    document.getElementById('opponent-points').textContent = opponentElementPoints;
}

/* 勝利かどうかを判定する関数 */
function checkForWin() {
    if (playerElementPoints >= 20) {
        /* ターンの進行を停止する */
        currentPlayer = null;
        setTimeout(() => {
            endGame();
            showVictoryMessage();
        }, 1500); // 1.5秒間待機

    } else if (opponentElementPoints >= 20) {
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