export function store(alt, name) {
    return (target, __, descriptor) => {
        return alt.createStore(target, name, target.listeners);
    };
}

export function actions(alt) {
    return (target, name, descriptor) => {
        return alt.createActions(target);
    };
}

export function handles(constant) {
    return (target, name, descriptor) => {
        if (!target.constructor.listeners) target.constructor.listeners = {};
        if (!target.constructor.listeners[name]) target.constructor.listeners[name] = [];
        target.constructor.listeners[name].push(constant);
    };
}

export function async(target, name, descriptor) {
    const init = name;
    const success = name + 'Success';
    const error = name + 'Error';
    var fn = descriptor.value;
    if (!target.__actions__) target.__actions__ = [];
    target.__actions__.push(success, error);
    descriptor.value = function () {
        fn.apply(this, arguments).then(
            data => this.actions[success](data),
            err => this.actions[error](err)
        );
    };
    return descriptor;
}