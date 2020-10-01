const Constants = {
    helpInputs : ['help', 'h', '-h', '?'],
    configName: "feature-build-config.json",
    moduleLocation: "node_modules\\feature-builder\\lib\\cli.js",
    configLocation : "../../",
    defaultEnviroment : "build"
}

let HelpText: string = "----------------------------------<<\n";
            HelpText += "....Thank you for using Feature-Builder....\n";;
            HelpText += `For help add one of the following: '${Constants.helpInputs.join(' | ')}'\n`;
            HelpText += "<Summary> The Feature-Builder CLI allows any node project to turn on or off custom features\n";
            HelpText += "Avilable CLI options [logger], [settings], and [environment]\n";
            HelpText += "There are no particular order for these options\n";

            HelpText += "\n    Options/arguments:\n";
            HelpText += "1) logger: false by default, add this option for the logger option to be true\n"
            HelpText += "example -> feature-builder logger\n\n";

            HelpText += "2) settings: these values do not exisit by default, to enable them, open the configuration file,\n"
            HelpText += `'./${Constants.configName}' is the file added when the Feature-Builder CLI was installed, add a new\n`
            HelpText += "property, give it a name and set it to false/true (they will trun to false by defaut if not called)\n";
            HelpText += `example -> property on the config { "style2" = false }; and then on the CLI: feature-builder style2\n\n`;
            
            HelpText += "3) environment: build by default if available as one of the script on ./package.json\n";
            HelpText += `Unlike the other 2 options, this is not configured on './${Constants.configName}'\n`; // TODO: add a default object so the user has more control
            HelpText += "example -> feature-builder start\n";
            HelpText += "----------------------------------<<";

export {Constants, HelpText};