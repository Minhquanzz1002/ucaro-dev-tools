import path from "path";
import fs from "fs/promises";
import {convertToNormal} from "./common/StringUtils";
import {EMPTY_STRING, HttpMethod} from "./common/Constant";

export async function serviceTemplate(taskName: string): Promise<string> {
    let template = await loadTemplate("ServiceTemplate.txt");
    template = template.replace(/{taskName}/g, taskName);

    const comment : string = convertToNormal(taskName);
    template = template.replace(/{comment}/g, comment);

    return template;
}

export async function controllerTemplate(taskName: string, endpoint: string, jpName: string, method: HttpMethod, requestType: string): Promise<string> {
    let template = await loadTemplate("ControllerTemplate.txt");
    template = template.replace(/{taskName}/g, taskName);
    template = template.replace(/{jpName}/g, jpName);

    let mappingAnnotation: string;
    switch (method) {
        case HttpMethod.GET:
            mappingAnnotation = `@GetMapping("${endpoint}")`;
            break;
        case HttpMethod.POST:
            mappingAnnotation = `@PostMapping("${endpoint}")`;
            break;
        case HttpMethod.PUT:
            mappingAnnotation = `@PutMapping("${endpoint}")`;
            break;
        case HttpMethod.DELETE:
            mappingAnnotation = `@DeleteMapping("${endpoint}")`;
            break;
        default:
            mappingAnnotation = `@RequestMapping("${endpoint}")`;
    }
    template = template.replace(/{mappingAnnotation}/g, mappingAnnotation);
    template = template.replace(/{requestType}/g, requestType);

    return template;
}

export async function requestTemplate(taskName: string) : Promise<string> {
    let template = await loadTemplate("RequestTemplate.txt");
    template = template.replace(/{taskName}/g, taskName);

    return template;
}

export async function responseTemplate(taskName: string) : Promise<string> {
    let template = await loadTemplate("ResponseTemplate.txt");
    template = template.replace(/{taskName}/g, taskName);

    return template;
}

async function loadTemplate(templateFileName: string): Promise<string> {
    const templatePath = path.resolve(__dirname, "assets/templates", templateFileName);
    return await fs.readFile(templatePath, "utf-8");
}