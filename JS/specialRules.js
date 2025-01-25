/*
 *
 * specialRules.js
 * 
 */

/* 特殊カードがあったかどうか */
specialCard = false;

/* カードを出したときのエレメントポイントの計算 */
function applySpecialCardRules(card) {
    if (card.rank === '7' || card.rank === '8') {
    playerElementPoints += 20;
    specialCard = true;
    }
}