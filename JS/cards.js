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
        if (this.cards.length === 0) { /* カード54枚を使い切ったら */
            this.initializeDeck();
            this.shuffle();
        }
        return this.cards.pop(); /* pop:スタックの「後入れ先出し（LIFO: Last In, First Out）」*/
    }
}

/* カードをHTML要素として生成する関数*/
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card.toString();

    /* ハートとダイヤを赤色にする */
    if (card.suit === '♥' || card.suit === '♦') {
        cardElement.classList.add('heart-diamond')
    }
    
    return cardElement;
}

/* プレイヤー手札からカードを選択する関数 */
function selectCardFromPlayerHand(cardElement) {
    const selectedCard = document.querySelector('.selected-card');
    if (selectedCard) {
        selectedCard.classList.remove('selected-card');
    }
    cardElement.classList.add('selected-card');
}

/* プレイヤーに手札を追加する関数 */
function addCardToPlayerHand(card) {
    const playerHand = document.querySelector('#player-hand #cards'); /* #player-hand 内の #cardsを取得する */
    // console.log('Player hand:', card.toString()); /* デバック */
    const cardElement = createCardElement(card);
    cardElement.addEventListener('click', () => selectCardFromPlayerHand(cardElement));
    playerHand.appendChild(cardElement);
}

/* 相手のに手札を追加する関数 */
function addCardToOpponentHand(card) {
    const opponentHand = document.querySelector('#opponent-hand #cards');
    // console.log('Opponent hand:', card.toString()); /* デバック */
    const cardElement = createCardElement(card);
    opponentHand.appendChild(cardElement);
}

/* 各プレイヤーにカードを５枚ずつ最初に配る */
function dealInitialCards () {
    for (let i = 0; i < 5; i++) {
        addCardToPlayerHand(deck.draw());
        addCardToOpponentHand(deck.draw());
    }
}

/* プレイエリアにカードを出せるようにする関数 */
function playCard() {
    const selectedCard = document.querySelector('.selected-card');
    if (!selectedCard) {
        alert('カードを選択してください！');
        return;
    }

    const playArea = document.querySelector('#play-area #played-cards');
    
    /* カードをプレイエリアに移動させる */
    selectedCard.style.position = 'absolute';
    selectedCard.style.top = `${playArea.offsetTop}px`
    selectedCard.style.left = `${playArea.offsetLeft}px`

    /* 少し経ったらプレイエリアにカードを移動させる */
    setTimeout(() => {
        playArea.appendChild(selectedCard);
        selectedCard.classList.remove('selected-card');
        selectedCard.style.position = '';
        selectedCard.style.top = '';
        selectedCard.style.left = '';
    }, 500); /* アニメーションの時間と同じに設定する */
}

/* カードを出すボタンのイベントリスナーを追加する */
document.getElementById('play-card').addEventListener('click', playCard);