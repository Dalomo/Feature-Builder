import * as fs from 'fs';

console.log("uninstalling**************************************");
console.log("very sad to see you leave!");
console.log("cleaning up");

fs.unlink("../../feature-build-config.json", () => {
    console.log("-- removed config files.");
});

console.log("all done, please visit https://github.com/Dalomo/Feature-Builder if you require anything else.");
