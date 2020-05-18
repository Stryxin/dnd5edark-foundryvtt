import  ActorSheet5eCharacter from "../../systems/dnd5e/module/actor/sheets/character.js";
import  ActorSheet5eNPC from "../../systems/dnd5e/module/actor/sheets/npc.js";
import  ItemSheet5e from "../../systems/dnd5e/module/item/sheet.js";


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

async function registerBetterNpcDark() {
    const module = game.modules.get("betternpcsheet5e");
    // only continue if the module is existent and activated
    if (!module || !module.active)
        return;
    

    // dynamically import the js file and get the needed class
    const BetterNPCActor5eSheet = (await import('../../modules/betternpcsheet5e/betternpcsheet.js')).BetterNPCActor5eSheet;
    
    // Define your custom class
    class BetterNPCActor5eSheetDark extends BetterNPCActor5eSheet {
        static get defaultOptions() {
            const options = super.defaultOptions;
            options.classes.push('betternpcsheet-dark'); // this is the css class selector to apply the dark theme to
            return options;
        }    
    }

    // Register the sheet
    Actors.registerSheet("dnd5e", BetterNPCActor5eSheetDark, {
        types: ["npc"],
        makeDefault: true 
    });
    
}

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

Hooks.on('init', () => {
    registerBetterNpcDark();

    const cssClassName = 'dark-mode'; // The css class used
    game.settings.register("dnd5e-dark-mode", game.userId, {
        name: "Activate Foundry wide Dark Mode?", // Change for description
        // hint: "Hint?" // uncomment this line for a small description text/hint
        config: true,
        default: false,
        type: Boolean,
        scope: 'user',
        onChange: data => {
            if (data === true)
                document.body.classList.add(cssClassName)
            else
                document.body.classList.remove(cssClassName)
        }
    });

    const setDarkMode = game.settings.get('dnd5e-dark-mode', game.userId);
    console.log("ASDASD", setDarkMode)
    if (setDarkMode === true) 
        document.body.classList.add(cssClassName)
});