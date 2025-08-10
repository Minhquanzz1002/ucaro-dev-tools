#!/usr/bin/env node

import inquirer from "inquirer";
import {createJavaFiles} from "./fileCreator";

async function main() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "taskName",
            message: "What is the task name:",
            validate: (input) => input.trim() !== "" || "The task name is required",
        },
        {
            type: "input",
            name: "jpName",
            message: "What is the JP name:",
            validate: (input) => input.trim() !== "" || "The JP name is required",
        },
        {
            type: "input",
            name: "endpoint",
            message: "What is the endpoint path (e.g. /get-password-list):",
            validate: (input) => input.trim() !== "" || "The endpoint is required",
        },
        {
            type: "list",
            name: "httpMethod",
            message: "Choose HTTP method:",
            choices: ["GET", "POST", "PUT", "DELETE"],
        },
        {
            type: "list",
            name: "requestType",
            message: "Choose request annotation type:",
            choices: ["@ModelAttribute", "@RequestBody"],
        }
    ]);

    const taskName = answers.taskName.trim();
    const endpoint = answers.endpoint.trim();
    const jpName = answers.jpName.trim();
    const method = answers.httpMethod.trim();
    const requestType = answers.requestType.trim();
    console.log(`Task name: ${taskName}`);
    console.log(`Request type: ${requestType}`);
    console.log(`Endpoint path: ${endpoint}`);
    console.log(`method: ${method}`);

    await createJavaFiles(taskName, endpoint, jpName, method, requestType);
}

main();