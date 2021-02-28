import * as fs from "fs";
import Zip from "adm-zip";
import * as path from "path";

const DIRS = [
	"ui",
	"compat"
];

const FILES = [
	"dark-mode.css" ,
	"dnd5edark.css" ,
	"dnd5edark.js",
	"module.json",
];

const zip = new Zip();
DIRS.forEach(dir => {
	fs.readdirSync(dir)
		.forEach(f => {
			const pth = path.join(dir, f);
			zip.addLocalFile(pth, dir, f);
		})
});

FILES.forEach(f => {
	zip.addLocalFile(f, ".", f);
});

zip.writeZip("./dnd5e-dark-mode.zip");
