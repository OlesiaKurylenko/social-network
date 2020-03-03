import { router } from "./router";
import { renderComponent } from "../component/render-component";
import { bootstrap } from "../bootstrap";


export class RountingModule {
    constructor(routes, dispatcher,modules) {
        this.routes = routes;
        this.dispatcher = dispatcher;
        this.modules = modules;
    }
    initRoutes() {
        window.addEventListener('hashchange', renderRoute.bind(this));
        renderRoute.call(this);
    }


}
function renderRoute() {
    let url = router.getUrl();

    let route = this.routes.find(r => r.path === url);
    
    if (!route){
        route = this.modules.parentRouters.find(r => r.path === url);
        if (route){
            bootstrap(this.modules.parrentModule);
            return;
        }
        else{
            route = this.parent.find(r => r.path === '**');
        }
    }
        
    let selector = document.querySelector('router-outlet');

    selector.innerHTML = `<${route.component.selector}></${route.component.selector}>`;
    renderComponent(route.component);
    this.dispatcher.emit('routing',route.component);
}