// Household data
let household = {
    cosiness: 0,
    inventory: [],
    upgrades: []
};

// Fox items
const foxItems = ["Potatoes", "Carrots", "Onions", "Butter", "Flour", "Milk", "Cabbage", "Beef", "Pork", "Eggs"];
// Seal recipes
const recipes = [
    { name: "Irish Stew", ingredients: ["Beef","Potatoes","Carrots","Onions"], cosy: 4 },
    { name: "Soda Bread", ingredients: ["Flour","Milk"], cosy: 4 },
    { name: "Boxty", ingredients: ["Potatoes","Flour","Eggs"], cosy: 4 }
];
// Raccoon actions
const raccoonActions = ["plants wildflowers 🌼","cares for the bees 🐝","restores a patch of bog 🌿","builds a tiny stone wall 🧱","clears litter by the coast 🐚"];
const raccoonUpgrades = ["Fairy lights","Bookshelf","Beehive","Herb Planter","Window Box"];

// Update UI
function refreshUI(message) {
    document.getElementById("cosiness").innerText = "Cosiness: " + household.cosiness;
    document.getElementById("inventory").innerText = "Inventory: " + (household.inventory.length ? household.inventory.join(", ") : "(empty)");
    document.getElementById("upgrades").innerText = "Upgrades: " + (household.upgrades.length ? household.upgrades.join(", ") : "(none yet)");
    document.getElementById("output").innerText = message;
}

// Fox shopping
function foxTask() {
    let item = foxItems[Math.floor(Math.random()*foxItems.length)];
    let coupon = Math.random() < 0.5;
    household.inventory.push(item);
    let cosyGain = coupon ? 3 : 2;
    household.cosiness += cosyGain;
    refreshUI(`🦊 Fox bought ${item} ${coupon ? "with a coupon!" : "at full price!"} (+${cosyGain} cosiness)`);
}

// Seal cooking
function sealTask() {
    for(let recipe of recipes){
        if(recipe.ingredients.every(i => household.inventory.includes(i))){
            recipe.ingredients.forEach(i => household.inventory.splice(household.inventory.indexOf(i),1));
            household.cosiness += recipe.cosy;
            refreshUI(`🦭 Seal cooks ${recipe.name}! (+${recipe.cosy} cosiness)`);
            return;
        }
    }
    household.cosiness +=2;
    refreshUI("🦭 Seal preps the kitchen. (+2 cosiness)");
}

// Raccoon gardening
function raccoonTask() {
    let action = raccoonActions[Math.floor(Math.random()*raccoonActions.length)];
    household.cosiness +=4;

    // Chance to get an upgrade
    if(household.upgrades.length < 5 && Math.random()<0.25){
        let upgrade = raccoonUpgrades.find(u => !household.upgrades.includes(u));
        if(upgrade){
            household.upgrades.push(upgrade);
            refreshUI(`🦝 Raccoon ${action} and adds ${upgrade}! (+4 cosiness)`);
            return;
        }
    }
    refreshUI(`🦝 Raccoon ${action} (+4 cosiness)`);
}

// Puffin Shop Quiz
const quizzes = [
    {prompt:"What is the Irish for 'Hello'?", options:["Dia dhuit","Slán","Le do thoil","Fáilte"], answer:0},
    {prompt:"What is the Irish for 'Thank you'?", options:["Gabh mo leithscéal","Go raibh maith agat","Tá fáilte romhat","Craic"], answer:1},
    {prompt:"What is the Irish for 'Goodbye'?", options:["Slán","Oíche mhaith","Maidin mhaith","Le do thoil"], answer:0},
    {prompt:"What is the Irish for 'Welcome'?", options:["Fáilte","Ceol","Gaeilge","Leabhar"], answer:0},
    {prompt:"What is the Irish for 'Please'?", options:["Le do thoil","Conas atá tú?","Anois","Sláinte"], answer:0}
];

function puffinShop() {
    let quiz = quizzes[Math.floor(Math.random()*quizzes.length)];
    let choice = prompt(`${quiz.prompt}\n1:${quiz.options[0]}\n2:${quiz.options[1]}\n3:${quiz.options[2]}\n4:${quiz.options[3]}`);
    let selected = parseInt(choice)-1;
    if(selected===quiz.answer){
        household.cosiness+=5;
        household.inventory.push("Special Tea");
        refreshUI("Correct! Puffin gives you Special Tea (+5 cosiness)");
    } else {
        household.cosiness+=2;
        household.inventory.push("Tea");
        refreshUI(`Close! Correct answer: ${quiz.options[quiz.answer]}. You still get Tea (+2 cosiness)`);
    }
}
