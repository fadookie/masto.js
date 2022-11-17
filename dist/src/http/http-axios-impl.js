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
import axios from 'axios';
import { createError, MastoError } from '../errors';
import { BaseHttp } from './base-http';
var HttpAxiosImpl = /** @class */ (function (_super) {
    __extends(HttpAxiosImpl, _super);
    function HttpAxiosImpl(config, serializer) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.serializer = serializer;
        _this.axios = axios.create({
            baseURL: config.url,
            headers: _this.createHeader(),
            proxy: config.proxy,
            timeout: config.timeout,
            transformRequest: function (data, headers) {
                if (headers == undefined) {
                    throw new MastoError('headers is null');
                }
                var result = _this.serializer.serialize(headers['Content-Type'], data);
                // In Node.js, axios doesn't set boundary data to the header
                // so set it manually by using getHeaders of form-data node.js package
                // https://github.com/form-data/form-data#headers-getheaders-headers-userheaders-
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof (result === null || result === void 0 ? void 0 : result.getHeaders) === 'function') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    headers['Content-Type'] = result.getHeaders()['content-type'];
                }
                return result;
            },
            transformResponse: function (data, headers) {
                if (headers == undefined) {
                    throw new MastoError('headers is null');
                }
                var contentType = _this.getContentType(headers);
                if (contentType == undefined) {
                    throw new MastoError('Content-Type is not defined');
                }
                return _this.serializer.deserialize(contentType, data);
            },
            paramsSerializer: {
                serialize: function (params) { return _this.encodeParams(params); },
            },
        });
        return _this;
    }
    HttpAxiosImpl.prototype.request = function (params) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var config, response, error_1, data;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 2, , 3]);
                        config = {};
                        config.url = params.url;
                        config.method = params.method;
                        if (params.headers) {
                            config.headers = params.headers;
                        }
                        if (params.params) {
                            config.params = params.params;
                        }
                        if (params.data) {
                            config.data = params.data;
                        }
                        return [4 /*yield*/, this.axios.request(config)];
                    case 1:
                        response = _j.sent();
                        return [2 /*return*/, {
                                headers: response.headers,
                                data: response.data,
                            }];
                    case 2:
                        error_1 = _j.sent();
                        // eslint-disable-next-line import/no-named-as-default-member
                        if (!axios.isAxiosError(error_1)) {
                            throw error_1;
                        }
                        data = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data;
                        throw createError({
                            statusCode: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.status,
                            message: data === null || data === void 0 ? void 0 : data.error,
                            details: data === null || data === void 0 ? void 0 : data.errorDescription,
                            description: data === null || data === void 0 ? void 0 : data.details,
                            limit: (_d = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d['X-RateLimit-Limit'],
                            remaining: (_f = (_e = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _e === void 0 ? void 0 : _e.headers) === null || _f === void 0 ? void 0 : _f['X-RateLimit-Remaining'],
                            reset: (_h = (_g = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h['X-RateLimit-Reset'],
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return HttpAxiosImpl;
}(BaseHttp));
export { HttpAxiosImpl };
