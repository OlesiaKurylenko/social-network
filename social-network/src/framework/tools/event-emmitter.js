import { isUndefined } from "./util"

export class EventEmitter {
    constructor() {
        this.listeners = {}
    }
    on(eventName, func) {
        if (isUndefined(this.listeners[eventName])) this.listeners[eventName] = [];

        this.listeners[eventName].push(func)
    }
    emit(eventName, data) {
        if (isUndefined(this.listeners[eventName])) return;

        this.listeners[eventName].forEach(func => {
            func(data)
        });
    }
}