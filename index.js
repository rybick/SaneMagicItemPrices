var index = {};

fetch('items.json')
    .then((response) => response.json())
    .then((json) => index = convertToIndex(json));

//const json = JSON.parse(
//  await readFile(
//    new URL('./items.json', import.meta.url)
//  )
//);
//console.log(json);

const ItemType = {
    "CONSUMABLE": "CONSUMABLE",
    "COMBAT_ITEM": "COMBAT_ITEM",
    "NON_COMBAT_ITEM": "NON_COMBAT_ITEM",
    "SUMMONING_ITEM": "SUMMONING_ITEM",
    "GAME_CHANGING_ITEM": "GAME_CHANGING_ITEM"
}

function convertToIndex(json) {
    console.log(json);
    let consumables = Object.entries(json.consumables).map(it => convertToItem(it, ItemType.CONSUMABLE));
    let combatItems = Object.entries(json.combatItems).map(it => convertToItem(it, ItemType.COMBAT_ITEM));
    let nonCombatItems = Object.entries(json.nonCombatItems).map(it => convertToItem(it, ItemType.NON_COMBAT_ITEM));
    let summoningItems = Object.entries(json.summoningItems).map(it => convertToItem(it, ItemType.SUMMONING_ITEM));
    let gamechangingItems = Object.entries(json.gamechangingItems).map(it => convertToItem(it, ItemType.GAME_CHANGING_ITEM));
    return consumables.concat(combatItems).concat(nonCombatItems).concat(summoningItems).concat(gamechangingItems);
}

function convertToItem(it, itemType) {
    return { 
        normalizedName: it[0].toLowerCase(),
        name: it[0],
        price: it[1], 
        type: itemType
    };
}

function find(query) {
    return index.filter(it => it.normalizedName.includes(query));
}