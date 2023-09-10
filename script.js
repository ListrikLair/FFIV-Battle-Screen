// model
let app = document.getElementById('app')
const characters = [
    kain = { 'MaxHp': 350, 'Hp': 350, 'MaxMp': 0, 'Mp': 0, 'atk': 20, 'def': 7, 'originalDef': 7, 'speed': 1, 'ATB': Math.floor((Math.random() * 18) + 1), 'status': 'alive' },
    rosa = { 'MaxHp': 280, 'Hp': 280, 'MaxMp': 120, 'Mp': 120, 'atk': 10, 'def': 5, 'originalDef': 5, 'speed': 0.8, 'ATB': Math.floor((Math.random() * 13) + 1), 'status': 'alive' },
    cecil = { 'MaxHp': 400, 'Hp': 400, 'MaxMp': 0, 'Mp': 0, 'atk': 25, 'def': 10, 'originalDef': 10, 'speed': 0.5, 'ATB': Math.floor((Math.random() * 15) + 1), 'status': 'alive' },
    rydia = { 'MaxHp': 250, 'Hp': 250, 'MaxMp': 120, 'Mp': 120, 'atk': 12, 'def': 2, 'originalDef': 2, 'speed': 0.6, 'ATB': Math.floor((Math.random() * 8) + 1), 'status': 'alive' },
    goblin = { 'MaxHp': 100, 'atk': 20, 'def': 0, 'speed': 1, 'ATB': 0 },
    goblinA = { 'Hp': 100, 'status': 'alive' },
    goblinB = { 'Hp': 100, 'status': 'alive' },
    goblinC = { 'Hp': 100, 'status': 'alive' },
]
let potions = 3;
let actionVisibility = 'hidden';
let actionHtml = '';
let atbInterval;
let goblinNameA = 'Goblin';
let goblinNameB = 'Goblin';
let goblinNameC = 'Goblin';
let goblinImgA = './img/goblin.png';
let goblinImgB = './img/goblin.png';
let goblinImgC = './img/goblin.png';

// view
startAtb();
updateView();
function updateView() {
    app.innerHTML = /*HTML*/`
    <div id="battlefield">
        <div id="enemies">
            <div></div>
            <div></div>
            <div id="goblinA"><img src="${goblinImgA}" alt="" /></div>
            <div id="goblinB"><img src="${goblinImgB}" alt="" /></div>
            <div></div>
            <div></div>
            <div><audio id="victory" class="sound" src="./audio/victoryFanfare.mp3"></audio></div>
            <div id="goblinC"><img src="${goblinImgC}" alt="" /></div>
        </div>
        <div id="party">
            <div><img src="./img/kain.png" alt="" /></div>
            <div></div>
            <div></div>
            <div><img src="./img/rosa.png" alt="" /></div>
            <div><img src="./img/cecil.png" alt="" /></div>
            <div></div>
            <div></div>
            <div><img src="./img/rydia.png" alt="" /></div>
        </div>
        <div id="battleMenu">
            <div id="actions" style="visibility: ${actionVisibility}">${actionHtml}</div>
            <div id="enemyList">
                <div id="goblinAList">${goblinNameA}</div>
                <div id="goblinBList">${goblinNameB}</div>
                <div id="goblinCList">${goblinNameC}</div>
            </div>
            <div id="statScreen">
                <div id="names">
                    <div>Kain</div>
                    <div>Rosa</div>
                    <div>Cecil</div>
                    <div>Rydia</div>
                </div>
                <div id="HpPools">
                    <div>${kain['Hp']}/${kain['MaxHp']}</div>
                    <div>${rosa['Hp']}/${rosa['MaxHp']}</div>
                    <div>${cecil['Hp']}/${cecil['MaxHp']}</div>
                    <div>${rydia['Hp']}/${rydia['MaxHp']}</div>
                </div>
                <div id= "MpPools">
                    <div>${kain['Mp']}/${kain['MaxMp']}</div>
                    <div>${rosa['Mp']}/${rosa['MaxMp']}</div>
                    <div>${cecil['Mp']}/${cecil['MaxMp']}</div>
                    <div>${rydia['Mp']}/${rydia['MaxMp']}</div>
                </div>
                <div id="AtbGauge">
                    <div style=
                    "background-image: linear-gradient(to right, green ${kain['ATB']}%, rgba(0,0,0,0) 0%)"></div>
                    <div style=
                    "background-image: linear-gradient(to right, green ${rosa['ATB']}%, rgba(0,0,0,0) 0%)"></div>
                    <div style=
                    "background-image: linear-gradient(to right, green ${cecil['ATB']}%, rgba(0,0,0,0) 0%)"></div>
                    <div style=
                    "background-image: linear-gradient(to right, green ${rydia['ATB']}%, rgba(0,0,0,0) 0%)"></div>
                </div>
            </div>
        </div>
    </div>
`;
}

// controller
function startAtb() {
    atbInterval = setInterval(atbIncrease, 80)
}

function stopAtb() {
    clearInterval(atbInterval);
}

function atbIncrease() {
    if (kain.ATB < 100) {
        kain.ATB += kain.speed;
    } else {
        kainTurn();
    }
    if (rosa.ATB < 100) {
        rosa.ATB += rosa.speed;
    } else {
        rosaTurn();
    }
    if (cecil.ATB < 100) {
        cecil.ATB += cecil.speed;
    } else {
        cecilTurn();
    }
    if (rydia.ATB < 100) {
        rydia.ATB += rydia.speed;
    } else {
        rydiaTurn();
    }
    if (goblin.ATB < 100) {
        goblin.ATB += goblin.speed;
    } else {
        goblin.ATB = 0;
        if (goblinA.status == 'alive') {
            monsterAttack();
        } if (goblinB.status == 'alive') {
            setTimeout(monsterAttack, 500);
        } if (goblinB.status == 'alive') {
            setTimeout(monsterAttack, 1000);
        }
    }
    updateView();
}

function kainTurn() {
    stopAtb();
    kain.ATB = 0;
    kain.def = kain.originalDef;
    actionVisibility = 'visible';
    actionHtml = `
        <div onclick="attack(kain)">Attack</div> <br />
        <div onclick="setUpJump()">Jump</div> <br />
        <div onclick="defend(kain)">Defend</div> <br />
        <div onclick="potion(kain)">Potion: ${potions}</div>
    `;
    updateView();
}
function rosaTurn() {
    stopAtb();
    rosa.ATB = 0;
    rosa.def = rosa.originalDef;
    actionVisibility = 'visible';
    actionHtml = `
        <div onclick="attack(rosa)">Attack</div> <br />
        <div onclick="cura()">Cura</div> <br />
        <div onclick="defend(rosa)">Defend</div> <br />
        <div onclick="potion(rosa)">Potion: ${potions}</div>
    `;
    updateView();
}
function cecilTurn() {
    stopAtb();
    cecil.ATB = 0;
    cecil.def = cecil.originalDef;
    actionVisibility = 'visible';
    actionHtml = `
        <div onclick="attack(cecil)">Attack</div> <br />
        <div onclick="shadow()">Shadow</div> <br />
        <div onclick="defend(cecil)">Defend</div> <br />
        <div onclick="potion(cecil)">Potion: ${potions}</div>
    `;
    updateView();
}
function rydiaTurn() {
    stopAtb();
    rydia.ATB = 0;
    rydia.def = rydia.originalDef;
    actionVisibility = 'visible';
    actionHtml = `
        <div onclick="attack(rydia)">Attack</div> <br />
        <div onclick="blackMagic()">Black Magic</div> <br />
        <div onclick="defend(rydia)">Defend</div> <br />
        <div onclick="potion(rydia)">Potion: ${potions}</div>
    `;
    updateView();
}

function attack(character) {
    if (goblinA.status == 'alive') {
        goblinA.Hp -= character.atk;
        if (goblinA.Hp <= 0) {
            goblinA.Hp = 0;
            goblinA.status = 'dead';
            goblinImgA = '';
            goblinNameA = '';
        }
    } else if (goblinB.status == 'alive') {
        goblinB.Hp -= character.atk;
        if (goblinB.Hp <= 0) {
            goblinB.Hp = 0;
            goblinB.status = 'dead';
            goblinImgB = '';
            goblinNameB = '';
        }
    } else if (goblinC.status == 'alive') {
        goblinC.Hp -= character.atk;
        if (goblinC.Hp <= 0) {
            goblinC.Hp = 0;
            goblinC.status = 'dead';
            goblinImgC = '';
            goblinNameC = '';
            actionVisibility = 'hidden';
            updateView();
            playFanfare();
            stopAtb();
            return;
        }
    }
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function setUpJump() {
    setTimeout(jump, 3000)
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function jump() {
    if (goblinA.status == 'alive') {
        goblinA.Hp -= kain.atk * 2;
        kain.ATB = 0;
        if (goblinA.Hp <= 0) {
            goblinA.Hp = 0;
            goblinA.status = 'dead';
            goblinImgA = '';
            goblinNameA = '';
        }
    } else if (goblinB.status == 'alive') {
        goblinB.Hp -= kain.atk * 2;
        kain.ATB = 0;
        if (goblinB.Hp <= 0) {
            goblinB.Hp = 0;
            goblinB.status = 'dead';
            goblinImgB = '';
            goblinNameB = '';
        }
    } else if (goblinC.status == 'alive') {
        goblinC.Hp -= kain.atk * 2;
        kain.ATB = 0;
        if (goblinC.Hp <= 0) {
            goblinC.Hp = 0;
            goblinC.status = 'dead';
            goblinImgC = '';
            goblinNameC = '';
            actionVisibility = 'hidden';
            updateView();
            playFanfare();
            stopAtb();
            return;
        }
    }
    updateView();
}

function cura() {
    if (rosa.Mp < 9) { return; }
    else {
        rosa.Mp -= 9;
        kain.Hp += 25;
        rosa.Hp += 25;
        cecil.Hp += 25;
        rydia.Hp += 25;
    } if (kain.Hp > kain.MaxHp) {
        kain.Hp = kain.MaxHp;
    } if (rosa.Hp > rosa.MaxHp) {
        rosa.Hp = rosa.MaxHp;
    } if (cecil.Hp > cecil.MaxHp) {
        cecil.Hp = cecil.MaxHp;
    } if (rydia.Hp > rydia.MaxHp) {
        rydia.Hp = rydia.MaxHp;
    }
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function shadow() {
    if (cecil.Hp <= 50) { return; }
    else {
        cecil.Hp -= 50;
        goblinA.Hp -= cecil.atk * 1.2;
        goblinB.Hp -= cecil.atk * 1.2;
        goblinC.Hp -= cecil.atk * 1.2;
    } if (goblinA.Hp <= 0) {
        goblinA.Hp = 0;
        goblinA.status = 'dead';
        goblinImgA = '';
        goblinNameA = '';
    } if (goblinB.Hp <= 0) {
        goblinB.Hp = 0;
        goblinB.status = 'dead';
        goblinImgB = '';
        goblinNameB = '';
    } if (goblinC.Hp <= 0) {
        goblinC.Hp = 0;
        goblinC.status = 'dead';
        goblinImgC = '';
        goblinNameC = '';
        actionVisibility = 'hidden';
        updateView();
        playFanfare();
        stopAtb();
        return;
    }
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function blackMagic() {
    if (rydia.Mp < 15) { return; }
    else {
        rydia.Mp -= 15;
        goblinA.Hp -= rydia.atk * 2;
        goblinB.Hp -= rydia.atk * 2;
        goblinC.Hp -= rydia.atk * 2;
    } if (goblinA.Hp <= 0) {
        goblinA.Hp = 0;
        goblinA.status = 'dead';
        goblinImgA = '';
        goblinNameA = '';
    } if (goblinB.Hp <= 0) {
        goblinB.Hp = 0;
        goblinB.status = 'dead';
        goblinImgB = '';
        goblinNameB = '';
    } if (goblinC.Hp <= 0) {
        goblinC.Hp = 0;
        goblinC.status = 'dead';
        goblinImgC = '';
        goblinNameC = '';
        actionVisibility = 'hidden';
        updateView();
        playFanfare();
        stopAtb();
        return;
    }
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function defend(character){
    character.def *= 2;
    actionVisibility = 'hidden';
    startAtb();
    updateView();
}

function potion(character){
    if (potions > 0){
        potions--;
        character.Hp += 50;
        if (character.Hp > character.MaxHp){
            character.Hp = character.MaxHp;
        }
    } else {return;}
    actionVisibility = 'hidden';
    startAtb();
    updateView();   
}

function monsterAttack() {
    attackedCharacterIndex = Math.floor((Math.random() * 4));
    characters[attackedCharacterIndex].Hp -= goblin.atk - characters[attackedCharacterIndex].def;
    if (characters[attackedCharacterIndex].Hp <= 0) {
        characters[attackedCharacterIndex].Hp = 0;
        characters[attackedCharacterIndex].status = 'dead';
    }
}

function playFanfare() {
    document.getElementById('victory').play();
}