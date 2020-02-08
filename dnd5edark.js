import { BetterNPCActor5eSheet } from "../../modules/betternpcsheet5e/betternpcsheet.js";
import { ActorSheet5eCharacter } from "../../systems/dnd5e/module/actor/sheets/character.js";
import { ActorSheet5eNPC } from "../../systems/dnd5e/module/actor/sheets/npc.js";
import { ItemSheet5e } from "../../systems/dnd5e/module/item/sheet.js";

class BetterNPCActor5eSheetDark extends BetterNPCActor5eSheet {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('betternpcsheet-dark'); // this is the css class selector to apply the dark theme to
        return options;
    }    
}

class ActorSheet5eCharacterDark extends ActorSheet5eCharacter {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
        return options;
    }
}

class ActorSheet5eNPCDark extends ActorSheet5eNPC {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
        return options;
    }
}

class ItemSheet5eDark extends ItemSheet5e {
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
        return options;
    }
}

Actors.registerSheet("dnd5e", BetterNPCActor5eSheetDark, {
    types: ["npc"],
    makeDefault: true
});

Actors.registerSheet("dnd5e", ActorSheet5eCharacterDark, {
    types: ["character"],
	makeDefault: true
});

Actors.registerSheet("dnd5e", ActorSheet5eNPCDark, {
    types: ["npc"]
});

Items.registerSheet("dnd5e", ItemSheet5eDark, {
    types: ["spell","weapon","equipment","loot","tool","backpack","consumable","class","feat"],
	makeDefault: true
});