var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { railsQueryString } from '../serializers/rails-querystring';
var BaseHttp = /** @class */ (function () {
    function BaseHttp() {
    }
    BaseHttp.prototype.createHeader = function (header) {
        if (header === void 0) { header = {}; }
        var headers = __assign({ 'Content-Type': 'application/json' }, header);
        if (this.config.accessToken) {
            headers['Authorization'] = "Bearer ".concat(this.config.accessToken);
        }
        return headers;
    };
    BaseHttp.prototype.encodeParams = function (params) {
        if (params === void 0) { params = {}; }
        return railsQueryString.stringify(params);
    };
    BaseHttp.prototype.resolveUrl = function (path, params) {
        if (params === void 0) { params = {}; }
        var searchParams = this.encodeParams(params);
        return "".concat(this.config.url).concat(path).concat(searchParams !== '' ? "?".concat(searchParams) : '');
    };
    BaseHttp.prototype.getContentType = function (headers) {
        var _a;
        var contentType = (_a = headers['Content-Type']) !== null && _a !== void 0 ? _a : headers['content-type'];
        if (typeof contentType !== 'string') {
            return;
        }
        return contentType.replace(/\s*;.*$/, '');
    };
    BaseHttp.prototype.get = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'get', url: url, params: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.post = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'post', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.delete = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'delete', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.put = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'put', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.patch = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'patch', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    return BaseHttp;
}());
export { BaseHttp };
