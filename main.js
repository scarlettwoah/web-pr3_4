const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logs = document.getElementById('logs');

const character = {
    name: 'Pikachu',
    type: 'electric',
    hp: {
        current: 100,
        total: 100,
    },
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    type: 'fire',
    hp: {
        current: 100,
        total: 100,
    },
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const countBtn = (count = 6, el) => {
    const text = el.innerText;
    el.innerText = `${text} (${count})`;

    return () => {
        count--;
        el.innerText = `${text} (${count})`;
        console.log(`Залишилось кліків для ${text}: ${count}`);

        if (count === 0) {
            el.disabled = true;
            console.log(`Кнопку "${text}" заблоковано!`);
        }
    };
};

const kickCounter = countBtn(6, $btnKick);
const specialCounter = countBtn(4, $btnSpecial);

$btnKick.addEventListener('click', () => {
    kickCounter();
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

$btnSpecial.addEventListener('click', () => {
    specialCounter();
    character.changeHP(random(30));
    enemy.changeHP(random(25));
});

const init = () => {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
};

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    const { elHP, hp: { current, total } } = this;
    elHP.innerText = current + ' / ' + total;
}

function renderProgressbarHP() {
    const { elProgressbar, hp: { current, total } } = this;
    elProgressbar.style.width = Math.ceil((current / total) * 100) + '%';
}

function changeHP(count) {
    this.hp.current -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);

    const $p = document.createElement('p');
    $p.innerText = log;
    $logs.insertBefore($p, $logs.children[0]);

    const { name, hp: { current } } = this;

    if (current <= 0) {
        this.hp.current = 0;
        alert('Бідний ' + name + ' програв бій!');
        $btnKick.disabled = true;
        $btnSpecial.disabled = true;
    }

    this.renderHP();
}

const generateLog = (firstPerson, secondPerson, count) => {
    const { name: firstName, hp: { current, total } } = firstPerson;
    const { name: secondName } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${current}/${total}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${current}/${total}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${current}/${total}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}, [${current}/${total}]`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${current}/${total}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}, [${current}/${total}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}, [${current}/${total}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}, [${current}/${total}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}, [${current}/${total}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}, [${current}/${total}]`
    ];

    return logs[random(logs.length) - 1];
};

const random = (num) => Math.ceil(Math.random() * num);

init();
