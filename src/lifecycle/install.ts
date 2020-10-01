import * as readLine from 'readline';
import * as fs from 'fs';
import { Constants,  } from '../common/constants';
import * as deaultConfig from '../common/default-config.json';

console.log("installing**************************************");

let data = JSON.stringify(deaultConfig, null, 2);

if(!!fs.existsSync('../../feature-build-config.json')){
    console.log("Found file with name 'feature-build-config.json'");

    let rl: readLine.Interface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout    
    });
    
    rl.question("Would you like to reset it? (y) or (n)", (response: string) => {
        let answered: boolean = false;

        while(!answered){
            if(!!response && !!response.trim()){
                if(response.toLowerCase() === "y" || response.toLowerCase() === "yes"){
                    fs.unlink("../../feature-build-config.json", () => {
                        console.log("-- removed old config file.");
                    });

                    fs.writeFileSync("../../feature-build-config.json", data);
                    console.log("++ added a new config file.");

                    answered = true;
                } else if(response.toLowerCase() === "n" || response.toLowerCase() === "no"){
                    answered = true;
                }
            }
        }

        rl.close();
    });
} else {
    fs.writeFileSync("../../feature-build-config.json", data);
}

