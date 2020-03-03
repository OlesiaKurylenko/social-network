import { SNComponent } from "@socialNetwork";
import { friendsService } from "./friends.service"
import { http } from "../../../../framework";

class FriendsComponent extends SNComponent {
    constructor(config) {
        super(config);
        this.incomingList = [];
        this.outgoingList = [];
        this.friendList = [];

        this.loading = {
            incoming: false,
            outgoing: false,
            friend: false
        }
        this.user = null;
        this.data = {
            html_templ_incom: '',
            html_templ_out: '',
            html_templ_friend: '',
        }

    }
    afterInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getResources();
    }
    events() {
        return {
            'click .addEventToButtonClick': 'onClickButton',
        }
    }
    renderComponent() {
        if (!!this.loading.incoming && !!this.loading.outgoing && !!this.loading.friend) {
            this.data.html_templ_incom = friendsService.renderComponent(this.incomingList, this.user, 'incoming');
            this.data.html_templ_out = friendsService.renderComponent(this.outgoingList, this.user, 'outgoing');
            this.data.html_templ_friend = friendsService.renderComponent(this.friendList, this.user, 'friends');

            this.render();
        }
    }
    getResources() {
        this.getIncomingList(this.user.id);
        this.getOutgoingList(this.user.id);
        this.getFriendList(this.user.id);
    }
    getIncomingList(user_id) {
        http.get(`api/requests/incoming/${user_id}`, {}, true, {}).then(res => {
            if (res.message === "Success") {
                this.loading.incoming = true;
                this.incomingList = res.data;
                this.renderComponent();
            }
        }
        );
    }
    getOutgoingList(user_id) {
        http.get(`api/requests/pending/${user_id}`, {}, true, {}).then(res => {
            if (res.message === "Success") {
                this.loading.outgoing = true;
                this.outgoingList = res.data;
                this.renderComponent();
            }
        }
        );
    }
    getFriendList(user_id) {
        http.get(`api/friends/${user_id}`, {}, true, {}).then(res => {
            if (res.message === "Success") {
                this.loading.friend = true;
                this.friendList = res.data;
                this.renderComponent();
            }
        }
        );
    }
    onClickButton({ target }) {
        let res = target.id.split('_');

        friendsService.processButtonClick(res[0], res[1], res[2]).then(res => {
        })
        event.stopPropagation();
        event.preventDefault();
    }
}
export const friendComponent = new FriendsComponent({
    selector: 'app-friends',
    template: `<h2>Pending requests</h2>
  
    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow ">
    <h6 class="border-bottom border-gray pb-2 mb-0">Incoming</h6>
    {{html_templ_incom}}
    </div>

    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow ">
    <h6 class="border-bottom border-gray pb-2 mb-0">Outgoing</h6>
    {{html_templ_out}}
    </div>

    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow ">
    <h6 class="border-bottom border-gray pb-2 mb-0">Friends</h6>
    {{html_templ_friend}}
    </div>
    `


})