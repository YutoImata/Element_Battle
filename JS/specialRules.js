/*
 *
 * specialRules.js
 * 
 */

/* プレイヤーと相手の連続したスートの履歴を管理する */
let playerPreviousSuit = null; /* 前回出したスート（プレイヤー）*/
let opponentPreviousSuit = null; /*  前回出したスート（相手） */

/*
 * 特殊ルールを適用する関数
 * card: プレイされたカード
 * isPlayer: trueならプレイヤー、falseなら相手
 */

/* 同じスートを2回連続で出したかを確認する関数 */
function triggerSuitComboEffect(card, isPlayer) {
    console.log('通過');
    let previousSuit;
    if (isPlayer) {
        previousSuit = playerPreviousSuit;
    } else {
        previousSuit = opponentPreviousSuit;
    }

    /* Jokerの場合はリセット */
    if (card.suit === 'J' && card.rank === 'oker') {
        if (isPlayer) {
            playerPreviousSuit = null;
        } else {
            opponentPreviousSuit = null;
        }
        return;
    }

    /* 同じスートが２回連続で出た場合の処理 */
    if (card.suit === previousSuit) {
        setTimeout(() => {
            let newCard = deck.draw();
            if (isPlayer) {
                addCardToPlayerHand(newCard);
                console.log('プレイヤーがもう１枚引く');
            } else {
                addCardToOpponentHand(newCard);
                console.log('相手がもう１枚引く');
            }

            if (isPlayer) {
                playerPreviousSuit = null;
                console.log('自分のスートカウントをリセット');
            } else {
                opponentPreviousSuit = null;
                console.log('相手のスートカウントをリセット');
            }

        }, 500)
    } else {
        if (isPlayer) {
            playerPreviousSuit = card.suit;
        } else {
            opponentPreviousSuit = card.suit;
        }
    }
}
