import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import config from "../scaffold.json" assert { type: 'json' };
import searchCheckBox from "inquirer-search-checkbox";
inquirer.registerPrompt('search-checkbox', searchCheckBox);
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const kebabCase = (str) => {
    return str.split(/(?=[A-Z])/).join('-').toLowerCase();
}

inquirer.prompt([
    {
        type: "input",
        name: "domain",
        message: "Which domain?"
    },
    {
        type: 'search-checkbox',
        name: 'fileTypes',
        message: 'Which file type you need ?',
        choices: [
            'Repository',
            "Request",
            "Response",
            'UseCase',
            "Validator",
            "Entity",
            "dto",
            "ViewModel",
            "View",
            "Component"
        ],
    },
    {
        type: "input",
        name: "name",
        message: "Which name?"
    }
]).then((answers) => {
    const {domain, fileTypes, name} = answers;
    const templates = {
        Repository: `${config.templateDir}/domain/repository.hbs`,
        UseCase: `${config.templateDir}/domain/use-case.hbs`,
        Validator: `${config.templateDir}/domain/validator.hbs`,
        Entity: `${config.templateDir}/domain/entity.hbs`,
        dto: `${config.templateDir}/domain/dto.hbs`,
        Request: `${config.templateDir}/domain/request.hbs`,
        Response: `${config.templateDir}/domain/response.hbs`,
        ViewModel: `${config.templateDir}/presentation/view-model.hbs`,
        View: `${config.templateDir}/presentation/view.hbs`,
        Component: `${config.templateDir}/presentation/component.hbs`,
    };
    const directories = {
        Repository: `${config.outputDir}/domain/${domain}/repositories`,
        UseCase: `${config.outputDir}/domain/${domain}/use-cases`,
        Validator: `${config.outputDir}/domain/${domain}/validator`,
        Entity: `${config.outputDir}/domain/${domain}/entities`,
        dto: `${config.outputDir}/domain/${domain}/dto`,
        Request: `${config.outputDir}/domain/${domain}/dto`,
        Response: `${config.outputDir}/domain/${domain}/dto`,
        ViewModel: `${config.outputDir}/infrastructure/presentation/${domain}/view-models`,
        View: `${config.outputDir}/infrastructure/presentation/${domain}/views`,
        Component: `${config.outputDir}/infrastructure/presentation/${domain}/components`,
    };
    for (const fileType of fileTypes) {
        const extension = `${config.extension}${['View', 'Component'].includes(fileType) ? "x" : ""}`
        const template = templates[fileType];
        const content = fs.readFileSync(path.resolve(template), "utf8");
        const result = content
            .replaceAll(/{{name}}/g, capitalize(name))
            .replaceAll(/{{domain}}/g, capitalize(domain))
            .replaceAll(/{{domainfile}}/g, domain)
            .replaceAll(/{{namefile}}/g, name);
        const filepath = `${directories[fileType]}/${name}.${kebabCase(fileType)}.${extension}`;

        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        if (fs.existsSync(filepath)) {
            console.error(`${fileType} file already exists at ${filepath}`);
        }else{
            fs.writeFileSync(filepath, result);
            console.log(`${fileType} file created at ${filepath}`);
        }
    }
});