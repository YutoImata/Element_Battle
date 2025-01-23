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
                playerElementPoints += 2;
            }else{
                opponentElementPoints += 2;
            }
        }else if (card.suit === '♦') {
            if (isPlayer) {
                playerElementPoints += 1;
            }else{
                opponentElementPoints += 1;
            }
        }else if (card.suit === '♣') {
            if (isPlayer) {
                opponentElementPoints += Math.max(0, opponentElementPoints - 1);
            }else{
                playerElementPoints += Math.max(0, playerElementPoints - 1);
            }
        }else if (card.suit === '♠') {
            if (isPlayer) {
                opponentElementPoints += Math.max(0, opponentElementPoints - 2);
            }else{
                playerElementPoints += Math.max(0, playerElementPoints - 2);
            }
        } else if (card.suit === 'Joker') { /* デバック用です/なぜかできない */
            if (isPlayer) {
                opponentElementPoints += 10;
            } else {
                playerElementPoints += 10;
            }
        }
        console.log('自分：',playerElementPoints);
        console.log('敵：',opponentElementPoints);

         /* 
            Math.max(0, opponentElementPoints - 1);
            これは敵のエレメントポイントが負の数に行かないようにしている 
            */

    }

    /* エレメントポイントを表示する関数 */
    function updateElementPointsDisplay() {
        document.getElementById('player-points').textContent = playerElementPoints;
        document.getElementById('opponent-points').textContent = opponentElementPoints;
    }

    /* 勝利かどうかを判定する関数 */
    function checkForWin() {
        if (playerElementPoints >= 10) {
            showVictoryMessage();
            // resetGame();
        }else if (opponentElementPoints >= 10) {
            showLoseMessage(); 
            // resetGame();
        }
    }

    /* 勝利メッセージを表示する関数 */
    function showVictoryMessage() {
    const victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'block';
    }

    function showLoseMessage() {
    const loseMessage = document.getElementById('lose-message');
    loseMessage.style.display = 'block';
    }


    

