/*
 *
 * index.js
 * 
 */

window.addEventListener("load", function() {
    const particleContainer = document.getElementById("particleContainer");
    const twinSuit = document.getElementById("twinSuit");

    /* twinSuitの位置を取得 */
    const twinSuitRect = twinSuit.getBoundingClientRect();
    
    /* スクロール位置を考慮して、正しい位置を計算 */
    const scrollOffset = window.scrollY;
    const correctedTop = twinSuitRect.top + scrollOffset; /* スクロール位置を加算 */

    /* twinSuitの位置をログに出力 */
    console.log("Twin Element位置:", twinSuitRect);
    console.log("修正後の位置:", correctedTop);

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
});

/* タイトル画面からゲーム画面の移動 */
document.getElementById('gama-page-button').addEventListener('click', function () {
    window.location.href = 'HTML/game.html';
})
