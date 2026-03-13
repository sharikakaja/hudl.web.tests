import { IConfig } from "./config";

let config:IConfig={
    TESTUSER: "",
    TESTPASSWORD: ""
}
// environment variables set in CI/CD pipeline will be used if available, otherwise local config file will be used
const needsLocalConfig = !process.env.TESTUSER || !process.env.TESTPASSWORD;
if (needsLocalConfig) {
config = require("./local.config.json");
}
export const loginInfo = {
    get username() {
        return process.env.TESTUSER || config.TESTUSER;
    },
    get password(){
        return process.env.TESTPASSWORD || config.TESTPASSWORD;
    }
}