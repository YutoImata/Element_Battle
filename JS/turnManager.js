/*
 *
 * turnManager.js
 * 
 */

let currentPlayer = 'player'; /* 現在のプレイヤーを追跡する変数 */
let isPlayerTurn;
 
function startTurn() {
    if (currentPlayer === 'player') {
        playerTurn();
    }else {
        opponentTurn();
    }
 }

 /* プレイヤーのターン */
 function playerTurn() {
    console.log('今はどっちのターン？', currentPlayer);
    isPlayerTurn = true;
    console.log('自分のターンが開始isPlayerTurn:', isPlayerTurn);
    document.getElementById('draw-card').disabled = false; 
    document.getElementById('play-card').disabled = true; /* まずはカードを引くことしかできないようにする */
    specialCard = false; /* 特殊カードのフラグをリセット */
 }

 /* 相手のターン */
function opponentTurn() {
    console.log('今はどっちのターン？', currentPlayer);
    console.log('相手のターンが開始できるかを確認する', isSelectingJoker, isPlayerTurn);

    if (opponentTwinRank) {
        isPlayerTurn = true;
    }
    if (!isSelectingJoker && !isPlayerTurn) {
        console.log('相手のターンが開始');
        /* ここでプレイヤーの追跡の変数をどちらもリセットする */
        playerDrawnCard = false;
        playerPlayedCard = false;
        specialCard = false; /* 特殊カードのフラグをリセット */
        
        opponentTwinRank = false;

        document.getElementById('draw-card').disabled = true;
        document.getElementById('play-card').disabled = true;

        setTimeout(() => {
            addCardToOpponentHand(deck.draw());
            
            /* 相手がカードを出す */
            setTimeout(() => {
                const card = selectCardForOpponent();
                playOpponentCard(card);
                console.log('敵のTwinRank：', opponentTwinRank);
                if (!opponentTwinRank) {
                    endTurn();
                }
            }, 1000);
        }, 1000);
    }
}


 /* ターン終了時の処理 */
 function endTurn() {
    console.log('endTurn関数が呼ばれた：last');
    updateElementPointsDisplay();
    checkForWin();
    if (currentPlayer === 'player') {
        console.log('ここで自分のターンが終了します。現在currentPlayer:', currentPlayer);
    } else {
        console.log('ここで敵のターンが終了します。現在currentPlayer:', currentPlayer);
    }
    changePlayer();
    console.log('今現在のcurrentPlayerを変更しました。：', currentPlayer);
    startTurn();
 }

 /* プレイヤーを切り替える */
 function changePlayer() {
    if (currentPlayer === 'player') {
        currentPlayer = 'opponent';
    } else {
        currentPlayer = 'player';
    }
 }


 /* 相手がランダムに手札を出す処理 */
 function selectCardForOpponent() {
    console.log('相手がランダムにカードを出す関数が呼ばれた：２');
    const opponentHand = document.querySelector('#opponent-hand #cards').children;
    const randomIndex = Math.floor(Math.random() * opponentHand.length);
    return opponentHand[randomIndex];
 }

 /* 相手がカードをプレイエリアに出す処理 */
 function playOpponentCard(cardElement) {
    console.log('相手にカードをプレイエリアに出す関数が呼ばれた：３');
    const playArea = document.querySelector('#play-area #played-cards');
    playArea.appendChild(cardElement);
    const card = new Card(cardElement.textContent[0], cardElement.textContent.slice(1));
    applyCardEffect(card, false);
    updateElementPointsDisplay();  /* エレメントポイントを更新 */
    checkForWin(); /* 勝利しているかをチェック */
}

/* ゲームが終了した際にする処理 */
function endGame() {
    document.getElementById("game-board").classList.add("transparent-background");
    document.getElementById("start-button").style.display = "block";
}

 

