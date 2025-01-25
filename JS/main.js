/*
 *
 * main.js
 * 
 */

/* グローバル変数からクラスを使用 */
const deck = new Deck();
deck.shuffle(); /* 'draw-card'の関数内に入れたら毎度シャッフルされ同じカードが出てきてしまうためここに書く */

/* 追跡する変数 */
let playerDrawnCard = false; /*プレイヤーがカードを引いたかどうか */
let playerPlayedCard = false /* プレイヤーがカードを出したかどうか */


/* update関数は、イベントリスナーを設定するために使用される */
    /* カードを引くボタンを押したらカードを引く */
    document.getElementById('draw-card').addEventListener('click', () => {
        const drawCard = deck.draw();
        playerTurn();

        addCardToPlayerHand(drawCard)
            playerDrawnCard = true;
            console.log('カードを引いたよ');
            
            document.getElementById('draw-card').disabled = true; /* 次にカードを引けないようにする */
            document.getElementById('play-card').disabled = false; /* そしてカードを出せるようにする */
            console.log('カードを出せるようになっているはず');

    });

    /* カードを出すボタンを押したとき */
    document.getElementById('play-card').addEventListener('click', () => {
        playCard();
        playerPlayedCard = true;

        const selectedCard = document.querySelector('.selected-card');
        if (selectedCard) {
            const card = new Card(selectedCard.textContent[0],selectedCard.textContent.slice(1));
            applyCardEffect(card, true);
            updateElementPointsDisplay(); /* エレメントポイントを更新 */
            checkForWin(); /* 勝利しているかをチェック */
            endTurn();
        }
    });
    

/* ページが読み込まれたときに呼び出す関数を入れる(1度だけ呼び出せれば大丈夫なのを入れる) */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', () => {
        document.getElementById('game-board').classList.remove('transparent-background');
        document.getElementById('start-game').style.display = 'none';
        dealInitialCards(); /* カードを５枚配るのと、背景の透明化を解除する */
        startTurn(); /* ターンが開始する */
    });
});

