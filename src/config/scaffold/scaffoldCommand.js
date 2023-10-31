import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import config from "../scaffold.json" assert { type: 'json' };

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const deCapitalize = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

inquirer.prompt([
    {
        type: "input",
        name: "domaine",
        message: "Which domaine?"
    },
    {
        type: 'checkbox',
        name: 'fileTypes',
        message: 'Which file type you need ?',
        choices: [
            'Repository',
            "Request",
            "Response",
            'UseCase',
            "Validator",
            "Entity",
            "DTO",
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
    const {domaine, fileTypes, name} = answers;
    const templates = {
        Repository: `${config.templateDir}/domaine/repository.hbs`,
        UseCase: `${config.templateDir}/domaine/use-case.hbs`,
        Validator: `${config.templateDir}/domaine/validator.hbs`,
        Entity: `${config.templateDir}/domaine/entity.hbs`,
        DTO: `${config.templateDir}/domaine/dto.hbs`,
        Request: `${config.templateDir}/domaine/request.hbs`,
        Response: `${config.templateDir}/domaine/response.hbs`,
        ViewModel: `${config.templateDir}/presentation/view-model.hbs`,
        View: `${config.templateDir}/presentation/view.hbs`,
        Component: `${config.templateDir}/presentation/component.hbs`,
    };
    const directories = {
        Repository: `${config.outputDir}/domaine/${domaine}/repositories`,
        UseCase: `${config.outputDir}/domaine/${domaine}/use-cases`,
        Validator: `${config.outputDir}/domaine/${domaine}/validator`,
        Entity: `${config.outputDir}/domaine/${domaine}/entities`,
        DTO: `${config.outputDir}/domaine/${domaine}/dto`,
        Request: `${config.outputDir}/domaine/${domaine}/dto`,
        Response: `${config.outputDir}/domaine/${domaine}/dto`,
        ViewModel: `${config.outputDir}/infrastructure/presentation/${domaine}/view-models`,
        View: `${config.outputDir}/infrastructure/presentation/${domaine}/views`,
        Component: `${config.outputDir}/infrastructure/presentation/${domaine}/components`,
    };
    for (const fileType of fileTypes) {
        const extension = `${config.extension}${['View', 'Component'].includes(fileType) ? "x" : ""}`
        const template = templates[fileType];
        const content = fs.readFileSync(path.resolve(template), "utf8");
        const result = content
            .replaceAll(/{{name}}/g, capitalize(name))
            .replaceAll(/{{domaine}}/g, capitalize(domaine))
            .replaceAll(/{{domainefile}}/g, domaine)
            .replaceAll(/{{namefile}}/g, name);
        const filepath = `${directories[fileType]}/${name}.${deCapitalize(fileType)}.${extension}`;

        fs.mkdirSync(path.dirname(filepath), { recursive: true });
        fs.writeFileSync(filepath, result);

        console.log(`${fileType} file created at ${filepath}`);
    }
});