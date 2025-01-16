/* デッキの定義 */
class Deck {
    constructor(){
        this.cards = []; /* カードを格納 */
        this.initializeDeck(); /* デッキの初期化 */
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
    }

    /* カードを混ぜる処理 */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        console.log(this.cards); /* デッキの内容を確認 */
    }

    /* カードを1枚引くメソッド */
    draw() {
        return this.cards.pop(); /* pop:スタックの「後入れ先出し（LIFO: Last In, First Out）」*/
    }
}

/* ほかのファイルでもメソッドが使用できるようにする */
// export default Deck;