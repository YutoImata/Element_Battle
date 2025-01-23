/*
 *
 * main.js
 * 
 */

/* グローバル変数からクラスを使用 */
const deck = new Deck();
deck.shuffle(); /* 'draw-card'の関数内に入れたら毎度シャッフルされ同じカードが出てきてしまうためここに書く */

/* update関数は、イベントリスナーを設定するために使用される */

function update() {
    /* カードを引くボタンを押したらカードを引く */
    document.getElementById('draw-card').addEventListener('click', () => {
        const drawCard = deck.draw();
        addCardToPlayerHand(drawCard);
    });

    /* エレメントポイントをHTML上に反映させる方法 */
    document.getElementById('play-card').addEventListener('click', () => {
        playCard();
        const selectedCard = document.querySelector('.selected-card');
        if (selectedCard) {
            const card = new Card(selectedCard.textContent[0],selectedCard.textContent.slice(1));
            applyCardEffect(card, true);

            updateElementPointsDisplay(); /* エレメントポイントを更新 */
            checkForWin(); /* 勝利しているかをチェック */
        }
    });
}
    

/* ページが読み込まれたときに呼び出す関数を入れる(1度だけ呼び出せれば大丈夫なのを入れる) */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('game-board').classList.remove('transparent-background');
        document.getElementById('start-game').style.display = 'none';
        dealInitialCards(); /* カードを５枚配るのと、背景の透明化を解除する */
        startTurn(); /* ターンが開始する */
    });
});


/* ここでUpdate関数を読み込んでおく */
update();
