async function addSvin() {
    let response = await fetch('/add.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
    alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    }
}

async function viewSvin() {
    let response = await fetch('/view.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
    alert("Возникла ошибка на сервере. Попробуйте ещё раз!");
    }
}

viewSvin();