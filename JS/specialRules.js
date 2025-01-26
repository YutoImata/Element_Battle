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
    }
}
