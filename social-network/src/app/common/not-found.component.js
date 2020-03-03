import { SNComponent } from "@socialNetwork";

class NotFoundComponent extends SNComponent {
    constructor(config) {
        super(config);
    }
}
export const notFoundComponent = new NotFoundComponent({
    selector: "app-not-found",
    template: `<h1>not found</h1>`
});