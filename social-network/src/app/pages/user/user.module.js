import { SNModule } from "@socialNetwork";
import { userComponent } from "./user.component";
import { appRoutes } from "../../app.routes";
import { tabsComponent } from "./tabs/tabs.component";
import appModule from "../../add.module";
import { userRoutes } from "./user.routes";
import { userInfoComponent } from "./userInfo/userInfo.component"

class UserModule extends SNModule {
    constructor(config) {
        super(config);
    }
}
const userModule = new UserModule({
    components: [userComponent, tabsComponent, userInfoComponent],
    bootstrap: userComponent,
    routes: userRoutes,
    modules: { parentRouters: appRoutes, parrentModule: appModule }
});

export default userModule;
