const listComponents = require("./listComponents");

/**
 * Generate React component for an app
 */

module.exports = {
  description: "Generate a new React component",
  prompts: [
    {
      type: "list",
      name: "action",
      message: "Select action",
      choices: () => [
        {
          name:
            "Create (Create component folder with Component.js and index.js files)",
          value: "create"
        },
        {
          name:
            "Add (Add new Component.js file inside of existing component folder)",
          value: "add"
        }
      ]
    },
    {
      type: "list",
      name: "component",
      message: "Select component",
      when: answer => answer.action === "add",
      choices: () => listComponents(),
      filter: val => val.toLowerCase()
    },
    {
      type: "input",
      name: "name",
      message: "Component name:",
      validate: value => {
        if (!value) {
          return "Component name is required";
        }
        return true;
      }
    },
    {
      type: "list",
      name: "type",
      message: "Select component type",
      default: "Stateless Function",
      choices: () => ["Stateless Function", "Component", "PureComponent"]
    }
  ],
  actions: data => {
    let template = "./templates/class.js.hbs";
    let path = "../..//components/{{properCase name}}/{{properCase name}}.js";

    if (data.type === "Stateless Function") {
      template = "./templates/functional.js.hbs";
    }

    if (data.action === "add") {
      path = `../../components/{{properCase component}}/{{properCase name}}.js`;
    }

    let actions = [
      {
        type: "add",
        path: path,
        templateFile: template
      }
    ];
    if (data.action === "create") {
      actions = [
        ...actions,
        {
          type: "add",
          path: "../../components/{{properCase name}}/index.js",
          templateFile: "./templates/index.js.hbs"
        }
      ];
    }

    return actions;
  }
};
