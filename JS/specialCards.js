/*
 *
 * specialRules.js
 * 
 */

/* 特殊カードがあったかどうか */
let specialCard = false;

/* カードを出したときのエレメントポイントの計算 */
function applySpecialCardRules(card, isPlayer) {
    if (card.suit === '♠' && card.rank === 'A') {
        /* 自分と敵のポイントを入れ替える */
        const tempOpponentElementPoints = opponentElementPoints;
        opponentElementPoints = playerElementPoints;
        playerElementPoints = tempOpponentElementPoints;
        specialCard = true; /* フラグをtrueにする */

    } else if (card.suit === '♥' && card.rank === '7') {
        /* 得点が2倍になる */
        if (isPlayer) {
            playerElementPoints *= 3;
        } else {
            opponentElementPoints *= 3;
        }
        specialCard = true; /* フラグをtrueにする */

    } else if (card.suit === '♦' && card.rank === '7') {
        /* 得点が2倍になる */
        if (isPlayer) {
            playerElementPoints *= 2;
        } else {
            opponentElementPoints *= 2;
        }
        specialCard = true; /* フラグをtrueにする */

    } else if ((card.suit === '♠' && card.rank === 'K') || ( card.suit === '♣' && card.rank === 'K')) {
        if (isPlayer) {
            opponentElementPoints = Math.max(0, opponentElementPoints - 3);
            showScoreEffect(-3, !isPlayer);
            console.log('特殊カードでマイナスされている');
        }else {
            playerElementPoints = Math.max(0, playerElementPoints - 3);
            showScoreEffect(-3, !isPlayer);
            console.log('特殊カードでマイナスされている');
        }
        specialCard = true;

    } else if ((card.suit === '♥' && card.rank === 'K') || ( card.suit === '♦' && card.rank === 'K')) {
        if (isPlayer) {
            playerElementPoints += 3;
            showScoreEffect(+3, isPlayer);
        }else {
            opponentElementPoints += 3;
            showScoreEffect(+3, !isPlayer);
        }
        specialCard = true;
    }

    console.log('自分：', playerElementPoints);
    console.log('敵：', opponentElementPoints);

}

/* コピー用 */
// ['♥', '♦', '♣', '♠'] */

