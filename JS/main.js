document.getElementById('draw-card').addEventListener('click', () => {
// グローバル変数からクラスを使用
const deck = new Deck();
deck.shuffle();
const drawCard = deck.draw();
addCardToPlayerHand(drawCard);
})
