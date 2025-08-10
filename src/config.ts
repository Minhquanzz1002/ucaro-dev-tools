import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const BASE_PATH = process.env.BASE_PATH || "./src";

export const paths = {
    controller: path.join(BASE_PATH, process.env.CONTROLLER_PATH || "controllers"),
    service: path.join(BASE_PATH, process.env.SERVICE_PATH || "service"),
    request: path.join(BASE_PATH, process.env.REQUEST_PATH || "request"),
    response: path.join(BASE_PATH, process.env.RESPONSE_PATH || "response"),
};