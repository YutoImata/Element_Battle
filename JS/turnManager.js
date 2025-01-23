/*
 *
 * turnManager.js
 * 
 */

let currentPlayer = 'player'; /* 現在のプレイヤーを追跡する変数 */
 
function startTurn() {
    if (currentPlayer === 'player') {
        playerTurn();
    }else {
        opponentTurn();
    }
 }

 /* プレイヤーのターン */
 function playerTurn() {
    document.getElementById('draw-card').disabled = false;
    document.getElementById('play-card').disabled = false;
 }

 /* 相手のターン */
 function opponentTurn() {
    document.getElementById('draw-card').disabled = true;
    document.getElementById('play-card').disabled = true;

    setTimeout(() => {
        addCardToOpponentHand(deck.draw());
        /* 相手がカードを出す */
        setTimeout(() => {
            const card = selectCardForOpponent();
            playOpponentCard(card);
            endTurn();
        }, 1000);
    }, 1000);
 }

 /* ターン終了時の処理 */
 function endTurn() {
    updateElementPointsDisplay();
    checkForWin();
    if (currentPlayer === 'player') {
        currentPlayer = 'opponent';
    } else {
        currentPlayer = 'player';
    }
    startTurn();
 }

 /* 相手がランダムに手札を出す処理 */
 function selectCardForOpponent() {
    const opponentHand = document.querySelector('#opponent-hand #cards').children;
    const randomIndex = Math.floor(Math.random() * opponentHand.length);
    return opponentHand[randomIndex];
 }

 /* 相手がカードをプレイエリアに出す処理 */
 function playOpponentCard(cardElement) {
    const playArea = document.querySelector('#play-area #played-cards');
    playArea.appendChild(cardElement);
    const card = new Card(cardElement.textContent[0], cardElement.textContent.slice(1));
    applyCardEffect(card, false);
    updateElementPointsDisplay();  /* エレメントポイントを更新 */
    checkForWin(); /* 勝利しているかをチェック */
}

 

