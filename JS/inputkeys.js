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
            overlay.classList.add('show'); /* 画像を表示する */
        }
    } else if (event.key === 'Escape') {
        overlay.classList.remove('show'); /* 画像を非表示にする */
    }
});