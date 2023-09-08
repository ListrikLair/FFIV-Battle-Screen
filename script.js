// model
let app = document.getElementById('app')
const characters = [
    kain = {'MaxHp': 350, 'Hp': 350, 'MaxMp': 0, 'Mp': 0, 'atk': 25, 'def': 7, 'speed': 20},
    rosa = {'MaxHp': 280, 'Hp': 280, 'MaxMp': 120, 'Mp': 120, 'atk': 10, 'def': 5, 'speed': 15},
    cecil = {'MaxHp': 400, 'Hp': 400, 'MaxMp': 50, 'Mp': 50, 'atk': 15, 'def': 10, 'speed': 12},
    rydia = {'MaxHp': 250, 'Hp': 250, 'MaxMp': 120, 'Mp': 120, 'atk': 20, 'def': 2, 'speed': 10}
]
let atbPercentageK = 0;
let atbPercentageRo = 0;
let atbPercentageC = 0;
let atbPercentageRy = 0;
let actionVisibility = 'hidden';

// view
// startAtb();
updateView();
function updateView(){
app.innerHTML = /*HTML*/`
    <div id="battlefield">
        <div id="enemies">
            <div id="goblinA"><img src="./img/goblin.png" alt="" /></div>
            <div></div>
            <div id="goblinB"><img src="./img/goblin.png" alt="" /></div>
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
            <div id="actions" style="visibility: ${actionVisibility}">Actions</div>
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
                    "background-color: linear-gradient(to right, green ${atbPercentageK}%, rgba(0,0,0,0) 0%)"></div>
                    <div>Rosa ATB</div>
                    <div>Cecil ATB</div>
                    <div>Rydia ATB</div>
                </div>
            </div>
        </div>
    </div>
`;
}

// controller
function monsterAttack(){

}
function startAtb(){
    setInterval(atbIncrease, 1000)
}

function atbIncrease(){
    if (atbPercentageK < 100){
        atbPercentageK += kain.speed;
    } else {
        kainTurn();
    }
    if (atbPercentageRo < 100){
        atbPercentageRo += rosa.speed;
    } else {
        rosaTurn();
    }
    if (atbPercentageC < 100){
        atbPercentageC += cecil.speed;
    } else {
        cecilTurn();
    }
    if (atbPercentageRy < 100){
        atbPercentageRy += rydia.speed;
    } else {
        rydiaTurn();
    } 
    updateView();
}

function kainTurn(){
    atbPercentageK = 0;
    actionVisibility = 'visible';
    actionHtml = `
        <div></div>
    `;
}