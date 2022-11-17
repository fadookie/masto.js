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
import { SerializerNodejsImpl } from '../serializers';
import { BaseWs } from './base-ws';
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseUrl = 'wss://mastodon.social';
        _this.config = {
            url: 'https://mastodon.social',
            accessToken: 'token',
        };
        _this.serializer = new SerializerNodejsImpl();
        _this.version = '99.99.9';
        _this.stream = jest.fn();
        return _this;
    }
    return Test;
}(BaseWs));
describe('BaseWs', function () {
    it('resolves url', function () {
        var test = new Test();
        expect(test.resolveUrl('/api/v1/streaming/public')).toBe('wss://mastodon.social/api/v1/streaming/public');
    });
    it('resolves url with params', function () {
        var test = new Test();
        expect(test.resolveUrl('/api/v1/streaming/public', { public: true })).toBe('wss://mastodon.social/api/v1/streaming/public?public=true');
    });
    it('resolves protocols', function () {
        var test = new Test();
        expect(test.createProtocols()).toEqual(['token']);
    });
});
