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
function twinSuit(card, isPlayer) {
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
        showParticleEffect(isPlayer);
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

function showParticleEffect(isPlayer) {
    console.log('通過');

    let targetArea = document.getElementById('played-cards');
    let particleContainer = document.createElement("div");
    particleContainer.classList.add("particle-container");

    for (let i = 0; i < 10; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particleContainer.appendChild(particle);
    }

    targetArea.appendChild(particleContainer);

    setTimeout(() => {
        particleContainer.remove();
    }, 1000);
}
