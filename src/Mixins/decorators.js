var _debounce = require('lodash/function/debounce');

export function autobind(target, key, descriptor) {
    return {
        get: function () {
            return descriptor.value.bind(this);
        }
    };
}

export function debounce(delay) {
    return function (target, key, descriptor) {
        descriptor.value = _debounce(descriptor.value, delay);
        return descriptor;
    };
}