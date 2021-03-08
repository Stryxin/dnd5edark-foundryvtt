import * as fs from "fs";

if (process.argv.length !== 3) {
	console.error(`Usage: node set-version.js <major.minor.patch>`);
	process.exit(1);
}

const ver = process.argv[2].trim();
if (!/^\d+\.\d+\.\d+$/.test(ver)) {
	console.error(`Usage: node set-version.js <major.minor.patch>`);
	process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const moduleJson = JSON.parse(fs.readFileSync("./module.json", "utf-8"));

packageJson.version = moduleJson.version = ver;


fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, "\t"), "utf-8");
fs.writeFileSync("./module.json", JSON.stringify(moduleJson, null, "\t"), "utf-8");
