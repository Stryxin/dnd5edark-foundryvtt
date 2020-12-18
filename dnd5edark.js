import ActorSheet5eCharacter from "../../systems/dnd5e/module/actor/sheets/character.js";
import ActorSheet5eNPC from "../../systems/dnd5e/module/actor/sheets/npc.js";
import ItemSheet5e from "../../systems/dnd5e/module/item/sheet.js";

class Dnd5eDark {
	static init () {
		this._initSheets();
		this._initModule();
		this._initWhetstone();
	}

	static _initModule () {
		Hooks.on('init', () => {
			this._initModuleCompat();

			// If Whetstone is active, stop here
			if (!!game.modules.get('Whetstone')?.active) return;

			$(`<link href="modules/dnd5e-dark-mode/dark-mode.css" rel="stylesheet" type="text/css" media="all">`).appendTo(document.head);

			game.settings.register("dnd5e-dark-mode", game.userId, {
				name: "Activate Foundry wide Dark Mode?", // Change for description
				// hint: "Hint?" // uncomment this line for a small description text/hint
				config: true,
				default: false,
				type: Boolean,
				scope: 'user',
				onChange: data => {
					if (data === true) document.body.classList.add(Dnd5eDark._CSS_CLASS_NAME);
					else document.body.classList.remove(Dnd5eDark._CSS_CLASS_NAME);
				}
			});

			const setDarkMode = game.settings.get('dnd5e-dark-mode', game.userId);
			if (setDarkMode === true) document.body.classList.add(Dnd5eDark._CSS_CLASS_NAME);
		});
	}

	static _initWhetstone () {
		let isInit = false;
		let isWhetstoneReady = false;

		const doWhetstoneInit = () => {
			const moduleJson = game.modules.get("dnd5e-dark-mode").data;

			Hooks.on('onThemeActivate', (themeData) => {
				if (themeData.id === moduleJson.name) {
					document.body.classList.add(Dnd5eDark._CSS_CLASS_NAME);
				}

				return true
			});

			Hooks.on('onThemeDeactivate', (themeData) => {
				if (themeData.id === moduleJson.name && document.body.classList.contains(Dnd5eDark._CSS_CLASS_NAME)) {
					document.body.classList.remove(Dnd5eDark._CSS_CLASS_NAME);
				}
			});

			game.Whetstone.themes.register('dnd5e-dark-mode', {
				id: moduleJson.name,
				name: moduleJson.name,
				title: moduleJson.title,
				description: moduleJson.description,
				version: moduleJson.version,
				authors: [
					{
						name: `Stryxin`,
						contact: 'Github',
						url: 'https://github.com/Stryxin'
					}
				],
				variables: [],
				styles: [
					"modules/dnd5e-dark-mode/dark-mode.css"
				],
				presets: {},
				dialog: '',
				config: '',
				dependencies: {},
				systems: {core: moduleJson.minimumCoreVersion},
				compatible: {dnd5e: '0.9.8'},
				conflicts: {}
			});

			game.Whetstone.settings.registerMenu(moduleJson.name, moduleJson.name, {
				name: game.i18n.localize('WHETSTONE.Config'),
				label: game.i18n.localize('WHETSTONE.ConfigTitle'),
				hint: game.i18n.localize('WHETSTONE.ConfigHint'),
				icon: 'fas fa-paint-brush',
				restricted: false
			});
		};

		Hooks.once("init", () => {
			isInit = true;
			if (!isWhetstoneReady) return;
			doWhetstoneInit();
		})

		Hooks.once('WhetstoneReady', () => {
			isWhetstoneReady = true;
			if (!isInit) return;
			doWhetstoneInit();
		});
	}

	static _initSheets () {
		class ActorSheet5eCharacterDark extends ActorSheet5eCharacter {
			static get defaultOptions () {
				const options = super.defaultOptions;
				options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
				return options;
			}
		}

		class ActorSheet5eNPCDark extends ActorSheet5eNPC {
			static get defaultOptions () {
				const options = super.defaultOptions;
				options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
				return options;
			}
		}

		class ItemSheet5eDark extends ItemSheet5e {
			static get defaultOptions () {
				const options = super.defaultOptions;
				options.classes.push('dnd5edark'); // this is the css class selector to apply the dark theme to
				return options;
			}
		}

		Actors.registerSheet("dnd5e", ActorSheet5eCharacterDark, {
			types: ["character"],
			makeDefault: true
		});

		Actors.registerSheet("dnd5e", ActorSheet5eNPCDark, {
			types: ["npc"]
		});

		Items.registerSheet("dnd5e", ItemSheet5eDark, {
			types: ["spell", "weapon", "equipment", "loot", "tool", "backpack", "consumable", "class", "feat"],
			makeDefault: true
		});
	}

	static _initModuleCompat () {
		this._initCompat_betterNpcSheets();
		this._initCompat_plutonium();
		this._initCompat_beyond20();
		this._initCompat_tokenHealth();
	}

	static async _initCompat_betterNpcSheets () {
		if (!game.modules.get("betternpcsheet5e")?.active) return;

		$(`<link href="modules/dnd5e-dark-mode/compat/betternpcsheet-dark.css" rel="stylesheet" type="text/css" media="all">`).appendTo(document.head);

		// dynamically import the js file and get the needed class
		const BetterNPCActor5eSheet = (await import('../../modules/betternpcsheet5e/betternpcsheet.js')).BetterNPCActor5eSheet;

		// Define your custom class
		class BetterNPCActor5eSheetDark extends BetterNPCActor5eSheet {
			static get defaultOptions () {
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

	static _initCompat_plutonium () {
		if (!game.modules.get("plutonium")?.active) return;

		$(`<link href="modules/dnd5e-dark-mode/compat/plutonium-dark.css" rel="stylesheet" type="text/css" media="all">`).appendTo(document.head);
	}

	static _initCompat_beyond20 () {
		if (!game.modules.get("beyond20")?.active) return;

		$(`<link href="modules/dnd5e-dark-mode/compat/beyond20-dark.css" rel="stylesheet" type="text/css" media="all">`).appendTo(document.head);
	}

	static _initCompat_tokenHealth () {
		if (!game.modules.get("token-health")?.active) return;

		$(`<link href="modules/dnd5e-dark-mode/compat/token-health-dark.css" rel="stylesheet" type="text/css" media="all">`).appendTo(document.head);
	}
}

Dnd5eDark._CSS_CLASS_NAME = "dark-mode";

Dnd5eDark.init();
