export var isObject = function (x) {
    return typeof x === 'object' && x !== null && x.constructor === Object;
};
