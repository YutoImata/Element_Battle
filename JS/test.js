/*
 *
 * cards.js
 * 
 */

/* デッキの定義 */

/* グローバル変数の定義 */
window.suits = ['♥', '♦', '♣', '♠']; /* スート（マーク）の定義 */
window.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; /* 数字の定義 */
/*別のJSファイルで呼び出すためグローバル変数にする */
window.Card = class {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    /* カードの情報を文字列として返すメソッドを追加 */
    toString() {
        if (this.suit === 'Joker') {
            return 'Joker';
        }
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
        /* 52枚(13 * 4)のカード生成 */
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank)); /* cardsに格納する */
            }
        }

        /* Jokerを追加 */
        this.cards.push(new Card('Joker', ''));
        this.cards.push(new Card('Joker', ''));
    }

    /* カードを混ぜる処理 */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        logDeck(this.cards); // debug.jsの関数を呼び出す
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
    const cardElement = createCardElement(card);
    cardElement.addEventListener('click', () => selectCardFromPlayerHand(cardElement));
    playerHand.appendChild(cardElement);

    logPlayerCards(playerHand.children); /* デバック */
}

/* 相手のに手札を追加する関数 */
function addCardToOpponentHand(card) {
    const opponentHand = document.querySelector('#opponent-hand #cards');
    const cardElement = createCardElement(card);
    opponentHand.appendChild(cardElement);

    logOpponentCards(opponentHand.children); /* デバック */
}



/* 各プレイヤーにカードを５枚ずつ最初に配る */
function dealInitialCards () {
    for (let i = 0; i < 5; i++) {
        addCardToPlayerHand(deck.draw());
        addCardToOpponentHand(deck.draw());
    }
}

/* プレイエリアにカードを出せるようにする関数 */
let zIndexCounter = 1;
let offset = 0; // カードの位置をずらすためのオフセット


function playCard() {
    const selectedCard = document.querySelector('.selected-card');
    if (!selectedCard) {
        alert('カードを選択してください！');
        return;
    }

    // プレイエリアの座標を取得
    const playArea = document.getElementById('play-area');
    const playAreaRect = playArea.getBoundingClientRect();
    console.log('プレイエリアの座標:', playAreaRect.top, playAreaRect.left);

     // カードの位置エリアの座標を取得
     const playAreaCardsPosition = document.getElementById('played-area-cards-position');
     const playAreaCardsPositionRect = playAreaCardsPosition.getBoundingClientRect();
     console.log('カードの位置エリアの座標:', playAreaCardsPositionRect.top, playAreaCardsPositionRect.left);


    /* カードをプレイエリアに移動させる */
    const initialRect = selectedCard.getBoundingClientRect();
    selectedCard.style.position = 'absolute';
    selectedCard.style.top = `${initialRect.top}px`;
    selectedCard.style.left = `${initialRect.left}px`;
    selectedCard.style.zIndex = zIndexCounter++; /* カードの重ね順を設定 */


    /* 少し経ったらプレイエリアにカードを移動させる */

    setTimeout(() => {
        selectedCard.style.top = `${playAreaRect.top}px`;
        selectedCard.style.left = `${playAreaRect.left - 30}px`;
        selectedCard.style.transition = 'top 2s ease-in-out, left 2s ease-in-out';
        selectedCard.style.pointerEvents = 'none'; /* カードの操作を無効にする */
    }, 0);
}

/* カードを出すボタンのイベントリスナーを追加する */
document.getElementById('play-card').addEventListener('click', playCard);
