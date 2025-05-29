async function addSvin() {
    let response = await fetch('/add.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        if (confirm("Возникла ошибка на сервере. Перезагрузить страницу?")) {
            location.reload();
        }
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
        if (confirm("Возникла ошибка на сервере. Перезагрузить страницу?")) {
            location.reload();
        }
    }
}

async function viewSvin() {
    let response = await fetch('/view.php');

    if (response.ok) {
    let text = await response.text();

    if (text.includes("Maximum call stack size of")) {
        if (confirm("Возникла ошибка на сервере. Перезагрузить страницу?")) {
            location.reload();
        }
    } else {
        let number = document.getElementById("number");
        number.innerHTML = text;
    }

    } else {
    if (confirm("Возникла ошибка на сервере. Перезагрузить страницу?")) {
        location.reload();
    }
    }
}

viewSvin();
setInterval(() => viewSvin(), 1000);

window.onload = function () {
    document.querySelector(".svin").setAttribute('style', 'transform: translateX(0px);');
    document.querySelector(".theme-button").setAttribute('style', 'transform: translateX(-25%);');
    setInterval(() => {document.querySelector(".title").setAttribute('style', 'transform: translateY(0px);')}, 200);
    setInterval(() => {document.querySelector("#number").setAttribute('style', 'transform: translateX(0px);')}, 400);
    setInterval(() => {document.querySelector(".button").setAttribute('style', 'transform: translateY(0px);')}, 600);

    document.querySelector(".svin").onclick = function () {
        this.setAttribute('id', 'pressed');
        this.addEventListener("animationend", function () {this.removeAttribute('id')});
    }
}

async function showThemes() {
    let response = await fetch('/viewThemes.php');

    let themes = await response.json();

    let backdrop = document.createElement('div');
    backdrop.className = 'theme-choose-backdrop';
    backdrop.setAttribute('onclick', 'hideThemes()');
    document.body.prepend(backdrop);

    let theme_choose = document.createElement('div');
    theme_choose.className = 'theme-choose';
    theme_choose.innerHTML = `
        <div class="theme-box" onclick="setTheme('default')">
            <div class="theme-icon">
                <img src="/res/svin.png">
            </div>
            <div class="theme-body">
                Стандартный
            </div>
        </div>
    `;
    themes.forEach(theme => {
        theme_choose.innerHTML += `
        <div class="theme-box" onclick="setTheme('${theme.name}')">
            <div class="theme-icon">
                <img src="/themes/${theme.name}/res/${theme.icon}.png">
            </div>
            <div class="theme-body">
                ${theme.title}
            </div>
        </div>
        `;
    });
    document.body.prepend(theme_choose);
}

function hideThemes() {
    document.querySelector(".theme-choose-backdrop").remove();
    document.querySelector(".theme-choose").remove();
}

async function setTheme($name) {
    let themeName = {
        name: $name
    }

    let response = await fetch('/setTheme.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(themeName)
      });

    location.reload();
}