var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { isObject } from './is-object';
/**
 * Encodes URI in Rails format
 */
var stringify = function (object) {
    if (object == undefined) {
        return '';
    }
    if (!isObject(object)) {
        return '';
    }
    var values = Object.entries(object)
        .reduce(function (prev, _a) {
        var k = _a[0], v = _a[1];
        if (Array.isArray(v)) {
            var xs = v.map(function (x) { return "".concat(k, "[]=").concat(x); });
            return __spreadArray(__spreadArray([], prev, true), xs, true);
        }
        if (isObject(v)) {
            throw new TypeError('Encoding nested object is not supported');
        }
        return __spreadArray(__spreadArray([], prev, true), ["".concat(k, "=").concat(v)], false);
    }, [])
        .join('&');
    return values;
};
export var railsQueryString = { stringify: stringify };
