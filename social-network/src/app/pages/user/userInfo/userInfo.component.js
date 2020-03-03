import { SNComponent, http, snu, router } from "@socialNetwork";
import { ENV } from "../../../../const/const"


class UserInfoComponent extends SNComponent {
    constructor(config) {
        super(config);
        this.data = {
            first_name: '',
            last_name: '',
            avatar: ''
        }
    }
    afterInit() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.data.first_name = user.first_name;
            this.data.last_name = user.last_name;
            this.data.avatar = user.avatar;

            this.render();
        }

    }

}
export const userInfoComponent = new UserInfoComponent({
    selector: 'app-user-info',
    template: `
  <img class="ml-3 rounded-circle"  width="64" hight="64" alt="64x64" src="${ENV.API_URL}{{avatar}}"/>
  <h5 class="mt-0 mb-1">{{first_name}} {{last_name}}</h5>


    `,
    styles: `
    
    `

})