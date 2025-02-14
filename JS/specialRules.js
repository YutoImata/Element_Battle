/*
 *
 * specialRules.js
 * 
 */

/*
 * 特殊ルールを適用する関数
 * card: プレイされたカード
 * isPlayer: trueならプレイヤー、falseなら相手
 */

/* プレイヤーと相手の連続したスートの履歴を管理する */
let playerPreviousSuit = null; /* 前回出したスート（プレイヤー）*/
let opponentPreviousSuit = null; /* 前回出したスート（相手）*/

let playerPreviousRank = null; /* 前回出した数字（プレイヤー）*/
let opponentPreviousRank = null; /* 前回出した数字（相手）*/
let opponentTwinRank = null; /* 相手がTwinRankかどうかのフラグ */


/* 同じスートを2回連続で出したかを確認する関数 */
function twinSuit(card, isPlayer) {
    let previousSuit;

    if (currentPlayer === 'opponent') {
        console.log('相手が同じスートを2回連続で出したかを確認する関数が呼ばれた：５');
    }

    if (isPlayer) {
        previousSuit = playerPreviousSuit;
    } else {
        previousSuit = opponentPreviousSuit;
    }

    /* Jokerの場合はリセット */
    if (card.suit === 'J' && card.rank === 'oker') {
        if (isPlayer) {
            console.log('Jokerリセットできてる');
            playerPreviousSuit = null;
        } else {
            opponentPreviousSuit = null;
        }
        return;
    }

    /* 同じスートが２回連続で出た場合の処理 */
    if (card.suit === previousSuit) {
        showParticleEffect();
        setTimeout(() => {
            let newCard = deck.draw();
            if (isPlayer) {
                addCardToPlayerHand(newCard);
                console.log('プレイヤーがもう１枚引く');
            } else {
                addCardToOpponentHand(newCard);
                console.log('相手が同じスートを2回連続で出したので、もう１枚カードを引く関数が呼ばれた：５.５');
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

function showParticleEffect() {
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

/* 同じ数字を2回連続出したかどうかを判別する処理 */
function twinRank(card, isPlayer) {
    let previousRank;

    if (currentPlayer === 'opponent') {
        console.log('相手が同じ数字を2回連続で出したかを確認する関数が呼ばれた：６');
    }

    console.log('ここは呼ばれる？：01');

    
    if (isPlayer) {
        previousRank = playerPreviousRank;
    } else {
        previousRank = opponentPreviousRank;
        document.getElementById('draw-card').disabled = false; /* 次にカードを引けないようにする */
        document.getElementById('play-card').disabled = true; /* そしてカードを出せるようにする */        
    }
    

    console.log('ここは呼ばれる？：02');

    /* Jokerの場合はリセット */
    if (card.suit === 'J' && card.rank === 'oker') {
        if (isPlayer) {
            playerPreviousRank = null;
        } else {
            opponentPreviousRank = null;
        }
        return;
    }

    console.log('ここは呼ばれる？：03');


    /* 同じ数字が２回連続で出た場合の処理 */
    if (card.rank === previousRank) {
        console.log('ここは呼ばれる？：04');

        isPlayerTurn = false;
        showBlueParticleEffectRank();
        console.log('ここは呼ばれる？：05');
        setTimeout(() => {
            if (isPlayer) {
                console.log('ここは呼ばれる？：06');
                console.log('自分が2連続で同じ数字出した');
                playerTurn();
                console.log('プレイヤーがもう一回ターン');
            } else {
                console.log('ここは呼ばれる？：06');
                console.log(isPlayerTurn);
                isPlayerTurn = false;
                opponentTwinRank = true;
                console.log('相手が2連続で同じ数字出した');
                opponentTurn();
                console.log('相手が同じ数字を2回連続で出したので、もう１ターン行動できる関数が呼ばれた：６.５');

                console.log('相手がもう一回ターン');
            }

            if (isPlayer) {
                playerPreviousRank = null;
                console.log('自分の数字カウントをリセット');
            } else {
                opponentPreviousRank = null;
                console.log('ここは呼ばれる？：07');
                console.log('相手の数字カウントをリセット');
            }

        }, 500)
    } else {
        if (isPlayer) {
            playerPreviousRank = card.rank;
        } else {
            opponentPreviousRank = card.rank;
            console.log('ここは呼ばれる？：08');
        }
    }
}

function showBlueParticleEffectRank() {
    let targetArea = document.getElementById('played-cards');
    let blueParticleContainer = document.createElement("div");
    blueParticleContainer.classList.add("blue-particle-container");

    for (let i = 0; i < 10; i++) {
        let blueParticle = document.createElement("div");
        blueParticle.classList.add("blue-particle");
        blueParticle.style.left = `${Math.random() * 100}%`;
        blueParticle.style.top = `${Math.random() * 100}%`;
        blueParticleContainer.appendChild(blueParticle);
    }

    targetArea.appendChild(blueParticleContainer);

    setTimeout(() => {
        blueParticleContainer.remove();
    }, 1000);
}