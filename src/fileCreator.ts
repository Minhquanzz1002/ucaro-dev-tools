import {paths} from "./config";
import fs from "fs-extra";
import path from "path";
import {controllerTemplate, requestTemplate, responseTemplate, serviceTemplate} from "./templates";
import {HttpMethod} from "./common/Constant";

type FileInfo = {
    dir: string,
    name: string,
    content: string,
}

export async function createJavaFiles(taskName: string, endpoint: string, jpName: string, method: HttpMethod, requestType: string): Promise<void> {
    const files : FileInfo[] = [
        {
            dir: paths.request,
            name: `${taskName}Request.java`,
            content: await requestTemplate(taskName),
        },
        {
            dir: paths.response,
            name: `${taskName}Response.java`,
            content: await responseTemplate(taskName),
        },
        {
            dir: paths.service,
            name: `${taskName}Service.java`,
            content: await serviceTemplate(taskName),
        },
        {
            dir: paths.controller,
            name: `${taskName}Controller.java`,
            content: await controllerTemplate(taskName, endpoint, jpName, method, requestType),
        }
    ];

    for (const file of files) {
        const filePath = path.join(file.dir, file.name);
        if (!(await fs.pathExists(filePath))) {
            await fs.writeFile(filePath, file.content, "utf8");
            console.log(`Created file: ${filePath}`);
        } else {
            console.log(`File already exists: ${filePath}`);
        }
    }
}