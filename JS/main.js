// グローバル変数からクラスを使用
const deck = new Deck();
deck.shuffle(); /* 'draw-card'に入れたら毎度シャッフルされ同じカードが出てきてしまうためここに書く */

document.getElementById('draw-card').addEventListener('click', () => {
const drawCard = deck.draw();
addCardToPlayerHand(drawCard);
})
