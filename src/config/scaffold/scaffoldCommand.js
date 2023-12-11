import fs from "node:fs";
import path from "node:path";
import inquirer from "inquirer";
import config from "../scaffold.json" assert { type: "json" };
import searchCheckBox from "inquirer-search-checkbox";
inquirer.registerPrompt("search-checkbox", searchCheckBox);
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const kebabCase = (str) => {
  return str
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

inquirer
  .prompt([
    {
      type: "input",
      name: "domain",
      message: "Which domain?",
    },
    {
      type: "search-checkbox",
      name: "fileTypes",
      message: "Which file type you need ?",
      choices: [
        "Repository",
        "UseCase",
        "Entity",
        "dto",
        "ViewModel",
        "View",
        "Component",
      ],
    },
    {
      type: "input",
      name: "name",
      message: "Which name?",
    },
  ])
  .then((answers) => {
    const { domain, fileTypes, name } = answers;
    const fileTypesToCreate = fileTypes.includes("UseCase")
      ? [...fileTypes, "Request", "Response", "Validator"]
      : [...fileTypes];
    const templates = {
      Repository: path.resolve(config.templateDir, "domain", "repository.hbs"),
      UseCase: path.resolve(config.templateDir, "domain", "use-case.hbs"),
      Validator: path.resolve(config.templateDir, "domain", "validator.hbs"),
      Entity: path.resolve(config.templateDir, "domain", "entity.hbs"),
      dto: path.resolve(config.templateDir, "domain", "dto.hbs"),
      Request: path.resolve(config.templateDir, "domain", "request.hbs"),
      Response: path.resolve(config.templateDir, "domain", "response.hbs"),
      ViewModel: path.resolve(
        config.templateDir,
        "presentation",
        "view-model.hbs",
      ),
      View: path.resolve(config.templateDir, "presentation", "view.hbs"),
      Component: path.resolve(
        config.templateDir,
        "presentation",
        "component.hbs",
      ),
    };
    const directories = {
      Repository: path.resolve(
        config.baseDir,
        config.domainDir,
        domain,
        "repositories",
      ),
      UseCase: path.resolve(
        config.baseDir,
        config.domainDir,
        domain,
        "use-cases",
      ),
      Validator: path.resolve(
        config.baseDir,
        config.domainDir,
        domain,
        "validator",
      ),
      Entity: path.resolve(
        config.baseDir,
        config.domainDir,
        domain,
        "entities",
      ),
      dto: path.resolve(config.baseDir, config.domainDir, domain, "dto"),
      Request: path.resolve(config.baseDir, config.domainDir, domain, "dto"),
      Response: path.resolve(config.baseDir, config.domainDir, domain, "dto"),
      ViewModel: path.resolve(
        config.baseDir,
        config.presentationDir,
        domain,
        "view-models",
      ),
      View: path.resolve(
        config.baseDir,
        config.presentationDir,
        domain,
        "views",
      ),
      Component: path.resolve(
        config.baseDir,
        config.presentationDir,
        domain,
        "components",
      ),
    };
    for (const fileType of fileTypesToCreate) {
      const extension = `${config.extension}${
        ["View", "Component"].includes(fileType) ? "x" : ""
      }`;
      const template = templates[fileType];
      const content = fs.readFileSync(path.resolve(template), "utf8");
      const result = content
        .replaceAll(/{{name}}/g, capitalize(name))
        .replaceAll(/{{domain}}/g, capitalize(domain))
        .replaceAll(/{{domainfile}}/g, domain)
        .replaceAll(/{{namefile}}/g, name);
      const filepath = `${directories[fileType]}/${name}.${kebabCase(
        fileType,
      )}.${extension}`;

      fs.mkdirSync(path.dirname(filepath), { recursive: true });
      if (fs.existsSync(filepath)) {
        console.error(`${fileType} file already exists at ${filepath}`);
      } else {
        fs.writeFileSync(filepath, result);
        console.log(`${fileType} file created at ${filepath}`);
      }
    }
  });
