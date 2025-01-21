// グローバル変数からクラスを使用
const deck = new Deck();
deck.shuffle(); /* 'draw-card'の関数内に入れたら毎度シャッフルされ同じカードが出てきてしまうためここに書く */

/* スタートボタンが押されたらカードをお互いに５枚ずつ配布する */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', () => {
        dealInitialCards();
    })
})

/*カードを引くボタンを押したらカードを引く */
document.getElementById('draw-card').addEventListener('click', () => {
const drawCard = deck.draw();
addCardToPlayerHand(drawCard);
})
