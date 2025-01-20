/* デッキの定義 */
/*別のJSファイルで呼び出すためグローバル変数にする */
window.Card = class {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    /* カードの情報を文字列として返すメソッドを追加 */
    toString() {
        return `${this.suit}${this.rank}`;
    }
};

window.Deck = class {
    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    /* デッキを初期化するメソッドの定義 */
    initializeDeck() {
        const suits = ['♥', '♦', '♣', '♠']; /* スート（マーク）の定義 */
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; /* 数字の定義 */

        /* 52枚(13 * 4)のカード生成 */
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank)); /* cardsに格納する */
            }
        }

        /* Jokerを追加 */
        this.cards.push(new Card('Joker', ''));
        this.cards.push(new Card('Joker', ''));

                // console.log(this.cards.map(card => card.toString())); /* デッキの内容を確認 */
    }

    /* カードを混ぜる処理 */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        console.log(this.cards.map(card => card.toString())); /* デッキの内容を確認 */
    }

    /* カードを1枚引くメソッド */
    draw() {
        return this.cards.pop(); /* pop:スタックの「後入れ先出し（LIFO: Last In, First Out）」*/
    }
}

/* カードをHTML要素として生成する関数*/
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card.toString();
    return cardElement;
}

/* プレイヤーに手札を追加する関数 */
function addCardToPlayerHand(card) {
    const playerHand = document.querySelector('#player-hand #cards'); /* #player-hand 内の #cardsを取得する */
    const cardElement = createCardElement(card);
    playerHand.appendChild(cardElement);
}

/* 相手のに手札を追加する関数 */
function addCardToOpponentHand(card) {
    const opponentHand = document.querySelector('#opponent-hand #cards');
    const cardElement = createCardElement(card);
    opponentHand.appendChild(cardElement);
}

