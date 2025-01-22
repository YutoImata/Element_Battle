/*
 *
 * debug.js
 * 
 */


function logDeck(cards) {
    console.log(cards.map(card => card.toString())); /* デッキの内容を確認 */
}

/* エレメントポイントを表示する関数 */
function updateElementPointsDisplay() {
    console.log('Updating element points display...');
    console.log('Player points:', playerElementPoints);
    console.log('Opponent points:', opponentElementPoints);
    document.getElementById('player-points').textContent = playerElementPoints;
    document.getElementById('opponent-points').textContent = opponentElementPoints;
}


