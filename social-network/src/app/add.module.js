import { SNModule } from "@socialNetwork";
import { appComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { userRoutes } from "./pages/user/user.routes";
import  userModule  from "./pages/user/user.module";

class AppModule extends SNModule {
    constructor(config) {
        super(config);
    }
}
const appModule = new AppModule({
    components: [appComponent],
    bootstrap: appComponent,
    routes: appRoutes,
    modules: { parentRouters: userRoutes, parrentModule: userModule }
});
export default appModule;
