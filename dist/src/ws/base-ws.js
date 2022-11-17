var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import semver from 'semver';
import { railsQueryString } from '../serializers/rails-querystring';
var BaseWs = /** @class */ (function () {
    function BaseWs() {
    }
    BaseWs.prototype.supportsSecureToken = function () {
        if (this.config.disableVersionCheck) {
            return false;
        }
        // Since v2.8.4, it is supported to pass access token with`Sec-Websocket-Protocol`
        // https://github.com/tootsuite/mastodon/pull/10818
        return (this.version &&
            this.baseUrl.startsWith('wss:') &&
            semver.gte(this.version, '2.8.4', { loose: true }));
    };
    BaseWs.prototype.resolveUrl = function (path, params) {
        if (params === void 0) { params = {}; }
        if (!this.supportsSecureToken()) {
            params.accessToken = this.config.accessToken;
        }
        var query = railsQueryString.stringify(params);
        return this.baseUrl + path + (query !== '' ? "?".concat(query) : '');
    };
    BaseWs.prototype.createProtocols = function (protocols) {
        if (protocols === void 0) { protocols = []; }
        return this.supportsSecureToken() && this.config.accessToken != undefined
            ? __spreadArray([this.config.accessToken], protocols, true) : [];
    };
    return BaseWs;
}());
export { BaseWs };
