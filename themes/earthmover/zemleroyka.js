window.onload = function () {
    document.querySelector(".svin").setAttribute('style', 'transform: translateX(0px);');
    document.querySelector(".theme-button").setAttribute('style', 'transform: translateX(-25%);');
    setInterval(() => {document.querySelector(".title").setAttribute('style', 'transform: translateY(0px);')}, 200);
    setInterval(() => {document.querySelector("#number").setAttribute('style', 'transform: translateX(0px);')}, 400);
    setInterval(() => {document.querySelector(".bottom").setAttribute('style', 'transform: translateY(0px);')}, 600);

    document.querySelector(".svin").onclick = krik;
}

let count = 1;
let anim_run = false;

function krik() {
    if (count % 2 == 0 && anim_run == false) {
        count++;
        anim_run = true;
        document.querySelector(".svin").setAttribute('id', 'pressed2');
        document.querySelector(".svin").addEventListener("animationend", function () {this.removeAttribute('id'); anim_run = false;});

        let Audio = document.getElementById('audio2');
        Audio.play();
    } else if (count % 2 != 0 && anim_run == false) {
        count++;
        anim_run = true;
        document.querySelector(".svin").setAttribute('id', 'pressed');
        document.querySelector(".svin").addEventListener("animationend", function () {this.removeAttribute('id'); anim_run = false;});

        let Audio = document.getElementById('audio');
        Audio.play();
    }
}