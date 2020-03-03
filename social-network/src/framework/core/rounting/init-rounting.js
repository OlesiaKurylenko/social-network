import { isUndefined } from "../../tools/util";
import { RountingModule } from "./rounting.module";

export function initRounting(routes, dispatcher,modules) {
    if (isUndefined(routes)) return;
    let rounting = new RountingModule(routes, dispatcher,modules)
    rounting.initRoutes();
}