# feature-builder ``turn features on or off``

To install:

```bash
npm i feature-builder 
```

``npx`` is generaly used to run the CLI

For more help:

```bash
npx feature-builder help    
```
---
The following json file was created  on install -> feature-build-config.json
```json
{
  "logger": false
}
```

The logger feature can be turned like this:

```bash
npx feature-builder logger
```

It is also possible to add as many options to the feature-build-config.json file\
for example:
```json
{
  "logger": true,
  "SnowAnimationOnStart": false,
  "darkMode": false,
}
```
If we just want to enable darkMode, we will run the following:
```bash
npx feature-builder dark mode
```
```json
{
  "logger": false,
  "SnowAnimationOnStart": false,
  "darkMode": true,
}
```
Everything else that was not called will be set to false (like what has happened with the logger above).
___
The Environment on the other hand does not require any changes on the feature-build-config.json file, instead it looks at package.json file. It does this specifically at the scripts object.\
For example, the following is a part of a package.json file:
```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```
The following can be used to call the test script (there is no argument order):
```bash
npx feature-builder test
```

As this is a CLI it is possible to call it directly from within a script, like this:

```json
{
  "scripts": {
    "builer": "feature-builder logger SnowAnimationOnStart builder2 darkMode",
    "builder2": "node index.js"
  },
}
```
Using ``npm run builder`` will enable logger, SnowAnimationOnStart, darkMode, and then will execute the builder2 script.