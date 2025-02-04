/*
 *
 * index.js
 * 
 */

/* HTMLページを起動した際に行う処理 */
window.addEventListener("load", function() {
    /* 背景をトランプ柄にする関数の呼び出し */
    generateCardsBackground();
    goldParticle();
    blueParticle();

});

/* 金色のパーティクル */
function goldParticle() {
    /* 特殊ルールのエフェクトの生成 */
    const particleContainer = document.getElementById("particleContainer");
    const twinSuit = document.getElementById("twinSuit");

    /* twinSuitの位置を取得 */
    const twinSuitRect = twinSuit.getBoundingClientRect();
    
    /* スクロール位置を考慮して、正しい位置を計算 */
    const scrollOffset = window.scrollY;
    const correctedTop = twinSuitRect.top + scrollOffset; /* スクロール位置を加算 */

    /* twinSuitの位置をログに出力 */
    // console.log("Twin Element位置:", twinSuitRect);
    // console.log("修正後の位置:", correctedTop);

    /* particleContainerの位置を調整 */
    particleContainer.style.position = "absolute";
    particleContainer.style.left = `${twinSuitRect.left + 150}px`;
    particleContainer.style.top = `${correctedTop + twinSuitRect.height + 50}px`; /* 少し下に配置 */

    /* パーティクルを生成する関数 */
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        /* ランダムな位置を計算 */
        const randomX = Math.random() * 300 - 200; 
        const randomY = Math.random() * 80 - 50; 
        particle.style.transform = `translate(${randomX}px, ${randomY}px)`; /* ランダム位置を設定 */

        particleContainer.appendChild(particle);

        /* パーティクルを1秒後に削除 */
        setTimeout(() => {
            particleContainer.removeChild(particle);
        }, 1000);
    }

    /* 100msごとにパーティクルを生成 */
    setInterval(createParticle, 100);
}

/* 青色のパーティクル */
function blueParticle() {
    /* 特殊ルールのエフェクトの生成 */
    const blueParticleContainer = document.getElementById("blueParticleContainer");
    const twinRank = document.getElementById("twinRank");

    /* twinRankの位置を取得 */
    const twinRankRect = twinRank.getBoundingClientRect();
    
    /* スクロール位置を考慮して、正しい位置を計算 */
    const scrollOffset = window.scrollY;
    const correctedTop = twinRankRect.top + scrollOffset; /* スクロール位置を加算 */

    /* twinRankの位置をログに出力 */
    // console.log("Twin Element位置:", twinRankRect);
    // console.log("修正後の位置:", correctedTop);

    /* blueParticleContainerの位置を調整 */
    blueParticleContainer.style.position = "absolute";
    blueParticleContainer.style.left = `${twinRankRect.left + 150}px`;
    blueParticleContainer.style.top = `${correctedTop + twinRankRect.height + 50}px`; /* 少し下に配置 */

    /* パーティクルを生成する関数 */
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("blue-particle");

        /* ランダムな位置を計算 */
        const randomX = Math.random() * 300 - 200; 
        const randomY = Math.random() * 80 - 50; 
        particle.style.transform = `translate(${randomX}px, ${randomY}px)`; /* ランダム位置を設定 */

        blueParticleContainer.appendChild(particle);

        /* パーティクルを1秒後に削除 */
        setTimeout(() => {
            blueParticleContainer.removeChild(particle);
        }, 1000);
    }

    /* 100msごとにパーティクルを生成 */
    setInterval(createParticle, 100);
}

/* 背景をトランプにする */
function generateCardsBackground() {
    const suits = ['♠', '♥', '♦', '♣']; 
    const body = document.body;
    
    const backgroundDiv = document.createElement('div');
    backgroundDiv.id = 'background';
    body.appendChild(backgroundDiv);

    /* 柄を生成する数 */
    const totalCards = Math.floor((window.innerWidth * window.innerHeight) / 10000); 

    let xPos = 0; 
    let yPos = 0; 
    const cardSize = 100; 

    
    for (let i = 0; i < totalCards; i++) {
        
        const card = document.createElement('div');
        const suit = suits[i % suits.length]; 
        card.innerHTML = suit;

        /* レイアウトの調整 */
        card.style.position = 'absolute';
        card.style.fontSize = `${cardSize}px`;
        card.style.color = 'rgba(128, 128, 128, 0.5)'; 
        card.style.opacity = '0.15'; 

        card.style.left = `${xPos}px`;
        card.style.top = `${yPos}px`;
        
        backgroundDiv.appendChild(card);

        xPos += cardSize; 
        if (xPos + cardSize > window.innerWidth) {
            xPos = 0; 
            yPos += cardSize; 
        }
    }

    /* 背景がスクロールに影響されないように、固定配置 */
    backgroundDiv.style.position = 'fixed';
    backgroundDiv.style.top = '0';
    backgroundDiv.style.left = '0';
    backgroundDiv.style.width = '100%';
    backgroundDiv.style.height = '100%';
    backgroundDiv.style.zIndex = '-1'; 
}

/* タイトル画面からゲーム画面の移動 */
document.getElementById('gama-page-button').addEventListener('click', function () {
    window.location.href = 'HTML/game.html';
});
