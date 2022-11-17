var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { headerCase } from 'change-case';
import { createError, MastoError } from '../errors';
import { BaseHttp } from './base-http';
var HttpNativeImpl = /** @class */ (function (_super) {
    __extends(HttpNativeImpl, _super);
    function HttpNativeImpl(config, serializer) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.serializer = serializer;
        return _this;
    }
    HttpNativeImpl.prototype.request = function (request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, timeout, proxy, method, data, params, url, headers, reqContentType, body, response, text, resContentType, error_1, data_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.config, timeout = _b.timeout, proxy = _b.proxy;
                        method = request.method, data = request.data, params = request.params;
                        if (proxy != undefined) {
                            // eslint-disable-next-line no-console
                            console.warn('Proxies are not supported on HttpNativeImpl');
                        }
                        if (timeout != undefined) {
                            // eslint-disable-next-line no-console
                            console.warn('Timeouts are not supported on HttpNativeImpl');
                        }
                        url = this.resolveUrl(request.url, params);
                        headers = new Headers(this.createHeader(request.headers));
                        reqContentType = (_a = headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'application/json';
                        body = this.serializer.serialize(reqContentType, data);
                        if (body instanceof FormData &&
                            reqContentType === 'multipart/form-data' &&
                            HttpNativeImpl.hasBlob(body)) {
                            // As multipart form data should contain an arbitrary boundary,
                            // leave Content-Type header undefined, so that fetch() API
                            // automatically configure Content-Type with an appropriate boundary.
                            headers.delete('Content-Type');
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, fetch(url, {
                                method: method,
                                headers: headers,
                                body: body,
                            })];
                    case 2:
                        response = _c.sent();
                        if (!response.ok) {
                            throw response;
                        }
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _c.sent();
                        resContentType = this.getContentType(HttpNativeImpl.toHeaders(response.headers));
                        if (resContentType == undefined) {
                            throw new MastoError('Content-Type is not defined');
                        }
                        return [2 /*return*/, {
                                headers: HttpNativeImpl.toHeaders(response.headers),
                                data: this.serializer.deserialize('application/json', text),
                            }];
                    case 4:
                        error_1 = _c.sent();
                        if (!(error_1 instanceof Response)) {
                            throw error_1;
                        }
                        return [4 /*yield*/, error_1.json()];
                    case 5:
                        data_1 = _c.sent();
                        throw createError({
                            statusCode: error_1.status,
                            message: data_1 === null || data_1 === void 0 ? void 0 : data_1.error,
                            details: data_1 === null || data_1 === void 0 ? void 0 : data_1.errorDescription,
                            description: data_1 === null || data_1 === void 0 ? void 0 : data_1.details,
                            limit: error_1.headers.get('X-RateLimit-Limit'),
                            remaining: error_1.headers.get('X-RateLimit-Remaining'),
                            reset: error_1.headers.get('X-RateLimit-Reset'),
                        });
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpNativeImpl.toHeaders = function (headers) {
        var result = {};
        for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            result[headerCase(key)] = value;
        }
        return result;
    };
    HttpNativeImpl.hasBlob = function (formData) {
        var hasBlob = false;
        // eslint-disable-next-line unicorn/no-array-for-each
        formData.forEach(function (v) { return (hasBlob || (hasBlob = v instanceof Blob)); });
        return hasBlob;
    };
    return HttpNativeImpl;
}(BaseHttp));
export { HttpNativeImpl };
