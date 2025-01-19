// カードをHTML要素として生成する関数
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card.toString();
    return cardElement;
}

// プレイヤーの手札にカードを追加する関数
function addCardToPlayerHand(card) {
    const playerHand = document.querySelector('#player-hand #cards');
    const cardElement = createCardElement(card);
    playerHand.appendChild(cardElement);
}

// 相手の手札にカードを追加する関数
function addCardToOpponentHand(card) {
    const opponentHand = document.querySelector('#opponent-hand #cards');
    const cardElement = createCardElement(card);
    opponentHand.appendChild(cardElement);
}