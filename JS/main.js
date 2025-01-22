// グローバル変数からクラスを使用
const deck = new Deck();
deck.shuffle(); /* 'draw-card'の関数内に入れたら毎度シャッフルされ同じカードが出てきてしまうためここに書く */

/* スタートボタンが押されたらカードをお互いに５枚ずつ配布する */
document.addEventListener('DOMContentLoaded', () => {
    /* カードを５枚配るのと、背景の透明化を解除する */
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('game-board').classList.remove('transparent-background');
        document.getElementById('start-game').style.display = 'none';
        dealInitialCards();
    });

    /* カードを引くボタンを押したらカードを引く */
    document.getElementById('draw-card').addEventListener('click', () => {
        const drawCard = deck.draw();
        addCardToPlayerHand(drawCard);
    });
});