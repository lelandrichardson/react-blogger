export function autobind(target, key, descriptor) {
    return {
        get: function () {
            return descriptor.value.bind(this);
        }
    };
}