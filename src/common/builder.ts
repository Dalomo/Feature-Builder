import * as fs from 'fs';
import { exec } from 'child_process';
import { Constants, HelpText } from './constants';
import { getFile, getFileLocation } from './helpers';

export default class Builder {
    args: string[] = [];
    userConfig: any = null;

    constructor(_args: string[]){
        this.args = _args.slice(2);
        this.userConfig = getFile(Constants.configName); // TODO: test with a diffrent machine

        this.onInit();
    }

    async onInit(){
        await this.help().then(canHelp => {
            if(!canHelp){
                this.configureLogger();
                this.configureSettings();
                this.updateJSONFile(getFileLocation(Constants.configName), this.userConfig);
                this.excuteBuild();
            }
        });
    }

    async help(){
        let canHelp = false;

        for(let help of Constants.helpInputs){
            if(this.args.find(arg => arg.toLowerCase() == help)){
                canHelp = true;

                console.log(HelpText)

                break;
            }
        }

        return canHelp;
    }

    configureLogger(): void {

        this.userConfig.logger = false;

        if(this.args.includes("logger")){
            this.userConfig.logger =  true;
        }

        console.log(`logger enabled = ${this.userConfig.logger}`);
    }

    configureSettings(){
        let settings = Object.entries(this.userConfig)
                                .filter(s => s[0] != "logger")
                                .filter(s => !Constants.helpInputs.find(help => help == s[0]));

        settings.forEach((element, i) => {
            this.userConfig[element[0]] = false;
        });

        if(settings.filter(s => this.args.find(arg => arg == s[0])).length <= 0){
            return;
        }

        for(let setting of settings){
            if(this.args.find(s => s.toLowerCase() == setting[0])){
                this.userConfig[setting[0]] = true;
            }
        }
    }

    updateJSONFile(fileName: string, file: any){
        let jsonObject = JSON.stringify(file, null, 2);

        fs.writeFile(fileName, jsonObject, err => {
            if(!!err){
                return console.log(`error ${err}`);
            }
        });
    }

    excuteBuild(){
        let userConfigFile = getFile("package.json");
        let env = !!userConfigFile.scripts[Constants.defaultEnviroment] ? Constants.defaultEnviroment : '';

        for(let enviroment of Object.keys(userConfigFile.scripts)){
            if(this.args.includes(enviroment)){
                env = enviroment;
                break;
            }
        }

        if(!env){
            console.log("---->>> No enviromen provided and the Constants.defaultEnviroment script is missing");
        } else {
            let buildString = `npm run ${env}`;

            console.log(buildString);
            console.log("build in progress...");

        exec(buildString, 
            (err, stdout, stderr) => {
                if(!!err){
                    console.log(`error: ${err.message}`);
                }

                if(!!stderr){
                    console.log(`stderr: ${stderr}`);
                }

                console.log(stdout);
            });
        }

    }
}
