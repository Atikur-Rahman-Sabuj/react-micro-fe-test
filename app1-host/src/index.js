import { app2Module } from "../../appConfig";
window[app2Module.urlGlobalVariable] = app2Module.url;

import("./bootstrap");