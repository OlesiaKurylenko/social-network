import { SNComponent } from "@socialNetwork";

class AppComponent extends SNComponent {
    constructor(config) {
        super(config);
    }
}
export const appComponent = new AppComponent({
    selector: "app-root",
    template: `<router-outlet></router-outlet>`
});
