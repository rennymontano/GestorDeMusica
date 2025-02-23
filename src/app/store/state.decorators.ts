import { environment } from "src/environments/environment";

export function logDispatcher(target: any) {
    if(!environment.production) {
        return new Proxy(target, {
            construct(clz, args) {
                console.groupCollapsed(`action ${target.type} @ Dispatcher`);
                console.trace();
                console.groupEnd()
                return Reflect.construct(clz, args);
            }
        });
    } else {
        return null;
    }
}