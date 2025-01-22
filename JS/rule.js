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
                opponentElementPoints += Math.max(0, opponentElementPoints - 1);
            }else{
                playerElementPoints += Math.max(0, playerElementPoints - 1);
            }

            /* 
            Math.max(0, opponentElementPoints - 1);
            これは敵のエレメントポイントが負の数に行かないようにしている 
            */
        }
        console.log('自分：',playerElementPoints);
        console.log('敵：',opponentElementPoints);

        updateElementPointsDisplay();
    }

    /* エレメントポイントを表示する関数 */
    function updateElementPointsDisplay() {
        document.getElementById('player-points').textContent = playerElementPoints;
        document.getElementById('opponent-points').textContent = opponentElementPoints;
    }
