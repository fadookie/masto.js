import { camelCase, snakeCase } from 'change-case';
import { flattenObject } from './form-data';
import { transformKeys } from './transform-keys';
var SerializerNodejsImpl = /** @class */ (function () {
    function SerializerNodejsImpl() {
    }
    SerializerNodejsImpl.prototype.serialize = function (type, rawData) {
        if (rawData == undefined)
            return;
        var data = transformKeys(rawData, snakeCase);
        // prettier-ignore
        switch (type) {
            case 'application/json': {
                return JSON.stringify(data);
            }
            case 'multipart/form-data': {
                var formData = new FormData();
                for (var _i = 0, _a = Object
                    .entries(flattenObject(data)); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    formData.append(key, value);
                }
                return formData;
            }
            case 'application/x-www-form-urlencoded': {
                return new URLSearchParams(data).toString();
            }
            default: {
                return;
            }
        }
    };
    SerializerNodejsImpl.prototype.deserialize = function (type, data) {
        switch (type) {
            case 'application/json': {
                try {
                    return transformKeys(JSON.parse(data), camelCase);
                }
                catch (_a) {
                    return undefined;
                }
            }
            default: {
                throw new Error("Unknown content type ".concat(type, ", ").concat(data));
            }
        }
    };
    return SerializerNodejsImpl;
}());
export { SerializerNodejsImpl };
