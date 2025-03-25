async function addSvin() {
    let response = await fetch('/add.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
        location.reload();
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
    alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    location.reload();
    }
}

async function viewSvin() {
    let response = await fetch('/view.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
        location.reload();
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
    alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    location.reload();
    }
}

viewSvin();
setInterval(() => viewSvin(), 1000);

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".svin").setAttribute('style', 'transform: translateX(0px);');
    setInterval(() => {document.querySelector(".title").setAttribute('style', 'transform: translateY(0px);')}, 200);
    setInterval(() => {document.querySelector("#number").setAttribute('style', 'transform: translateX(0px);')}, 400);
    setInterval(() => {document.querySelector(".button").setAttribute('style', 'transform: translateY(0px);')}, 600);
});