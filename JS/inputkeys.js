/*
 *
 * inputkeys.js
 * 
 */

//* Hキーを押したらヘルプ画面 */
document.addEventListener('keydown', function(event) {
    const overlay = document.getElementById('overlay');
    if (event.key === 'H' || event.key === 'h') {
        if (overlay.classList.contains('show')) {
            overlay.classList.remove('show'); /* 画像を非表示にする */
        } else {
            overlay.style.opacity = 0; /* 初期透明度を設定 */
            overlay.classList.add('show'); /* 画像を表示する */
            setTimeout(() => {
                overlay.style.transition = 'opacity 0.5s'; 
                overlay.style.opacity = 1; 
            }, 100); // 0.1秒後にトランジションを適用
        }
    } else if (event.key === 'Escape') {
        overlay.classList.remove('show'); /* 画像を非表示にする */
    }
});