import { isUndefined } from "../../tools/util";
import { initComponents } from "./init-components";


export class Component {
    constructor(config) {
        this.template = config.template;
        this.selector = config.selector;
        this.el = null;
        this.styles = config.styles;
        this.children = config.children;
    }
    render() {
        initStyles(this.styles)
        this.el = document.querySelector(this.selector);
        if (!this.el)
            throw new Error(`Component with selector ${this.selector} wasn't found`);
        this.el.innerHTML = compileTemplate(this.template, this.data);

        initEvents.call(this);
    }

}
function initEvents() {

    if (isUndefined(this.events))
        return;
    let event = this.events();
    Object.keys(event).forEach(key => {
        let listener = key.split(' ');
        if (this.el.querySelectorAll(listener[1]))
            this.el.querySelectorAll(listener[1]).forEach(el => {
                el.addEventListener(listener[0], this[event[key]].bind(this))
            })
    })
}
function compileTemplate(template, data) {
    if (isUndefined(data)) return template;

    let reqex = /\{{(.*?)}}/g
    template = template.replace(reqex, (str, d) => {
        let key = d.trim();
        return data[key];
    })
    return template;
}

function initStyles(styles) {
    if (isUndefined(styles)) return;

    let style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
}
