import { isUndefined } from "../../tools/util";

export function renderComponent(c) {
    if (!isUndefined(c.onInit))
        c.onInit();
    c.render()
    if (!isUndefined(c.afterInit))
        c.afterInit();
}