
import { initComponents } from "./component/init-components";
import { initRounting } from "./rounting/init-rounting";
import { EventEmitter } from "../tools/event-emmitter";


export class Module {
    constructor(config) {
        this.components = config.components;
        this.bootstrapComponent = config.bootstrap;
        this.routes = config.routes;
        this.modules = config.modules;
        this.dispatcher = new EventEmitter()
    }
    start() {
        initComponents(this.bootstrapComponent, this.components);
        initRounting(this.routes, this.dispatcher,this.modules);
        this.dispatcher.on('routing', (obj) => {
            console.log('dis',obj)
        })
    }
}
