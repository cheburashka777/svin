function krik() {
    document.querySelector(".svin").setAttribute('id', 'pressed');
    document.querySelector(".svin").addEventListener("animationend", function () {this.removeAttribute('id')});
    let Audio = document.getElementById('audio');
    Audio.play();
}

async function addSvin() {
    let response = await fetch('/add.php');

    if (response.ok) {
        let text = await response.text();
        let number = document.getElementById("number");
        number.innerHTML = text;
        if (text % 100 == 0) krik();
    } else {
        if (confirm("Не удалось добавить поросяток :( Попробовать ещё раз?")) {
            addSvin();
        }
    }
}

async function viewSvin(att = 0, time = 5) {
    let response = await fetch('/view.php');

    if (response.ok) {
        let text = await response.text();
        let number = document.getElementById("number");
        number.innerHTML = text;
        return true;
    } else {
        if (att >= 5) {
            let error = document.createElement('div');
            error.className = 'error showed';
            error.innerHTML = `Не получилось <:( <br> Попробуйте обновить страницу или зайти позже.`;
            document.body.prepend(error);

            setTimeout(() => {
                document.querySelector(".error").classList.add('removed');
                    document.querySelector(".error").addEventListener("animationend", function () {
                        this.remove();
                    });
            }, 10000);
            return false;
        }

        let initialTime = time;

        let error = document.createElement('div');
        error.className = 'error showed';
        error.innerHTML = `Не удалось узнать кол-во поросяток :( <br> Пробуем ещё раз через <span id="time">${formWord(time)}</span>.`;
        document.body.prepend(error);

        let timer = setInterval(() => {
            document.getElementById("time").innerHTML = formWord(time);
            if (time <= 0) {
                clearInterval(timer);
                document.querySelector(".error").classList.add('removed');
                document.querySelector(".error").addEventListener("animationend", function () {
                    this.remove();
                    viewSvin((att + 1), (initialTime + 5));
                });
            } else {
                time--;
            }
        }, 1000);

        // if (confirm("Возникла ошибка на сервере. Перезагрузить страницу?")) {
        //     location.reload();
        // }
    }
}

function formWord(num) {
    if (num == 1) {
        return "1 секунду";
    } else if (num >= 2 && num <= 4) {
        return `${num} секунды`;
    } else if (num >= 5) {
        return `${num} секунд`;
    } else {
        return `${num} секунд`;
    }
}

if (viewSvin() == true) {
    setInterval(() => viewSvin(), 1000);
}

window.onload = function () {
    document.querySelector(".svin").setAttribute('style', 'transform: translateX(0px);');
    document.querySelector(".theme-button").setAttribute('style', 'transform: translateX(-25%);');
    setTimeout(() => {document.querySelector(".title").setAttribute('style', 'transform: translateY(0px);')}, 200);
    setTimeout(() => {document.querySelector("#number").setAttribute('style', 'transform: translateX(0px);')}, 400);
    setTimeout(() => {document.querySelector(".bottom").setAttribute('style', 'transform: translateY(0px);')}, 600);

    document.querySelector(".svin").onclick = krik;
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

    let theme_box_container = document.createElement('div');
    theme_box_container.className = 'theme-box-container';
    theme_box_container.innerHTML = `
        <div class="theme-box" onclick="setTheme('default')">
            <div class="theme-icon">
                <img src="/res/svin.png">
            </div>
            <div class="theme-body">
                Стандартный
            </div>
        </div>
    `;
    
    if (themes.length != 0) {
    theme_box_container.innerHTML += "<hr>";
    
    themes.forEach((theme, index) => {
        theme_box_container.innerHTML += `
        <div class="theme-box" onclick="setTheme('${theme.name}')">
                <div class="theme-icon">
                    <img src="/themes/${theme.name}/res/${theme.icon}.png">
                </div>
                <div class="theme-body">
                    ${theme.title}
                </div>
        </div>
        `;
        if (index < (themes.length - 1)) {
            theme_box_container.innerHTML += "<hr>"
        }
    });
    }
    
    theme_choose.innerHTML += `
        <hr>
        <div class="theme-choose-footer">
            Кстати, у нас есть <a href="https://t.me/svinclicker">Телеграм-канал</a>
        </div>
    `;
    
    document.body.prepend(theme_choose);
    theme_choose.prepend(theme_box_container);

    setTimeout(() => {document.querySelector('.theme-choose').setAttribute('style', 'transform: translate(-50%, -50%);')}, 10);
}

function hideThemes() {
    document.querySelector('.theme-choose').setAttribute('style', 'transform: translate(-50%, -200%); transition-duration: 1s;')
    setTimeout(function () {
        document.querySelector(".theme-choose-backdrop").remove();
        document.querySelector(".theme-choose").remove();
    }, 80);
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

