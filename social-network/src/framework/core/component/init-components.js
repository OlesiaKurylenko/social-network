import { isUndefined } from "../../tools/util";
import { renderComponent } from "./render-component";

export function initComponents(bootstrapComponent, components) {
    if (isUndefined(bootstrap)) {
        throw new Error('bootstrap component is not defined')
    }
    [bootstrapComponent, ...components].forEach(renderComponent);
    // bootstrapComponent.render();
    // components.forEach(renderComponent);
}