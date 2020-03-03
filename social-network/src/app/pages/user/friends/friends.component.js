import { SNComponent } from "@socialNetwork";
import { friendsService } from "./friends.service"

class FriendsComponent extends SNComponent {
    constructor(config) {
        super(config);
        this.incomingList = [];
        this.outgoingList = [];
        this.friendList = [];
        this.user = null;
        this.data = {
            html_templ_incom: '',
            html_templ_out: '',
            html_templ_friend: '',
        }

    }
}
export const friendComponent = new FriendsComponent({
    selector: 'app-friends',
    template: `<h2>Pending requests</h2>
  
    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow addEventToButtonClick">
    <h6 class="border-bottom border-gray pb-2 mb-0">Incoming</h6>
    {{html_templ_incom}}
    </div>

    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow addEventToButtonClick">
    <h6 class="border-bottom border-gray pb-2 mb-0">Outgoing</h6>
    {{html_templ_out}}
    </div>

    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow addEventToButtonClick">
    <h6 class="border-bottom border-gray pb-2 mb-0">Friends</h6>
    {{html_templ_friend}}
    </div>
    `


})