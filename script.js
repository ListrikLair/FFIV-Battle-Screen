// model
let app = document.getElementById('app')
const characters = [
    kain = {'MaxHp': 350, 'Hp': 350, 'MaxMp': 0, 'Mp': 0, 'atk': 25, 'def': 7, 'speed': 10, 'ATB': Math.floor((Math.random()*18)+1)},
    rosa = {'MaxHp': 280, 'Hp': 280, 'MaxMp': 120, 'Mp': 120, 'atk': 10, 'def': 5, 'speed': 8, 'ATB': Math.floor((Math.random()*13)+1)},
    cecil = {'MaxHp': 400, 'Hp': 400, 'MaxMp': 50, 'Mp': 50, 'atk': 15, 'def': 10, 'speed': 6, 'ATB': Math.floor((Math.random()*15)+1)},
    rydia = {'MaxHp': 250, 'Hp': 250, 'MaxMp': 120, 'Mp': 120, 'atk': 20, 'def': 2, 'speed': 5, 'ATB': Math.floor((Math.random()*8)+1)},
    goblin = {'MaxHp': 100, 'Hp': 100, 'MaxMp': 0, 'Mp': 0, 'atk': 20, 'def': 0, 'speed': 4, 'ATB': 0}
]
let actionVisibility = 'hidden';
let actionHtml = '';
const atbInterval = setInterval(atbIncrease, 800) 

// view
// startAtb();
updateView();
function updateView(){
app.innerHTML = /*HTML*/`
    <div id="battlefield">
        <div id="enemies">
            <div></div>
            <div></div>
            <div id="goblinA"><img src="./img/goblin.png" alt="" /></div>
            <div id="goblinB"><img src="./img/goblin.png" alt="" /></div>
            <div></div>
            <div></div>
            <div></div>
            <div id="goblinC"><img src="./img/goblin.png" alt="" /></div>
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
                <div id="goblinAList">Goblin A</div>
                <div id="goblinBList">Goblin B</div>
                <div id="goblinCList">Goblin C</div>
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
function startAtb(){
    setInterval(atbIncrease, 800)
}

function stopAtb(){
    clearInterval(atbIncrease);
}

function atbIncrease(){
    if (kain.ATB < 100){
        kain.ATB += kain.speed;
    } else {
        kainTurn();
    }
    if (rosa.ATB < 100){
        rosa.ATB += rosa.speed;
    } else {
        rosaTurn();
    }
    if (cecil.ATB < 100){
        cecil.ATB += cecil.speed;
    } else {
        cecilTurn();
    }
    if (rydia.ATB < 100){
        rydia.ATB += rydia.speed;
    } else {
        rydiaTurn();
    } 
    if (goblin.ATB < 100){
        goblin.ATB += goblin.speed;
    } else {
        monsterAttack();
    }
    updateView();
}

function kainTurn(){
    stopAtb();
    kain.ATB = 0;
    actionVisibility = 'visible';
    actionHtml = `
        <button onclick="attack()">Attack</button> <br />
        <button>Jump</button> <br />
        <button>Defend</button> <br />
        <button>Item</button>
    `;
    updateView();
}
function rosaTurn(){
    stopAtb();
    rosa.ATB = 0;
    actionVisibility = 'visible';
    actionHtml = `
        <button onclick="attack()">Attack</button> <br />
        <button>Pray</button> <br />
        <button>Defend</button> <br />
        <button>Item</button>
    `;
    updateView();
}
function cecilTurn(){
    stopAtb();
    cecil.ATB = 0;
    actionVisibility = 'visible';
    actionHtml = `
        <button onclick="attack()">Attack</button> <br />
        <button>Shadow</button> <br />
        <button>Defend</button> <br />
        <button>Item</button>
    `;
    updateView();
}
function rydiaTurn(){
    stopAtb();
    rydia.ATB = 0;
    actionVisibility = 'visible';
    actionHtml = `
        <button onclick="attack()">Attack</button> <br />
        <button>Black Magic</button> <br />
        <button>Defend</button> <br />
        <button>Item</button>
    `;
    updateView();
}

function attack(){

}

function monsterAttack(){
    atbPercentageG = 0;
    Math.random
}