const yaml = require('js-yaml');
const fs = require('fs');

module.exports = {
    parseSettings: () => {
        const settingsPath = process.env.SETTINGS_PATH ? process.env.SETTINGS_PATH : './settings.yaml'
        const settingsYaml = fs.readFileSync(settingsPath, 'utf8');
        const settings = yaml.load(settingsYaml);

        const secretsPath = process.env.SECRET_PATH ? process.env.SECRET_PATH : settings.SECRET_PATH
        const secretsYaml = fs.readFileSync(secretsPath, 'utf8');
        const secrets = yaml.load(secretsYaml);

        return [settings, secrets[settings.TARGET_ENV]]
    }
}
