/*
 *
 * specialRules.js
 * 
 */

/* 特殊カードがあったかどうか */
specialCard = false;

/* カードを出したときのエレメントポイントの計算 */
function applySpecialCardRules(card, isPlayer) {
    if (card.rank === '7') {
        playerElementPoints += 7;
        specialCard = true;
    }
}