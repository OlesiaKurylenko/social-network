import { SNComponent } from "@socialNetwork";

class FriendsComponent extends SNComponent {
    constructor(config) {
        super(config);
    }
}
export const friendComponent = new FriendsComponent({
    selector: 'app-friends',
    template: `<h1>Friends</h1>`

})