/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from './is-object';
var fromEntries = function (entries) {
    var object = {};
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], key = _a[0], value = _a[1];
        object[key] = value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return object;
};
// prettier-ignore
export var transformKeys = function (data, transform) {
    if (Array.isArray(data)) {
        return data.map(function (value) { return transformKeys(value, transform); });
    }
    if (isObject(data)) {
        return fromEntries(Object.entries(data).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                transform(key),
                transformKeys(value, transform),
            ];
        }));
    }
    return data;
};
