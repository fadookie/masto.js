import { isObject } from './is-object';
export var flattenObject = function (object, parent) {
    var _a;
    if (parent === void 0) { parent = ''; }
    if (Array.isArray(object)) {
        return object
            .map(function (value, i) {
            return flattenObject(value, parent !== '' ? "".concat(parent, "[").concat(i, "]") : i.toString());
        })
            .reduce(function (prev, curr) { return Object.assign(prev, curr); }, {});
    }
    if (isObject(object)) {
        return Object.entries(object)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return flattenObject(value, parent !== '' ? "".concat(parent, "[").concat(key, "]") : key);
        })
            .reduce(function (prev, curr) { return Object.assign(prev, curr); }, {});
    }
    // Unit of the monoid is always an object
    return parent !== ''
        ? (_a = {}, _a[parent] = object, _a) : object;
};
