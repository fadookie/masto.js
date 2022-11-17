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
import { BaseHttp } from './base-http';
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {
            url: 'https://mastodon.social',
            accessToken: 'token',
        };
        _this.request = jest.fn();
        _this.serializer = new SerializerNodejsImpl();
        return _this;
    }
    return Test;
}(BaseHttp));
describe('BaseHttp', function () {
    it('creates header', function () {
        var test = new Test();
        expect(test.createHeader({ extra: 'header' })).toEqual({
            Authorization: 'Bearer token',
            'Content-Type': 'application/json',
            extra: 'header',
        });
    });
    it('override content-type header', function () {
        var test = new Test();
        expect(test.createHeader({ 'Content-Type': 'multipart/form-data' })).toEqual({
            Authorization: 'Bearer token',
            'Content-Type': 'multipart/form-data',
        });
    });
    it('resolves url', function () {
        var test = new Test();
        expect(test.resolveUrl('/api/v1/yay')).toEqual('https://mastodon.social/api/v1/yay');
    });
    it('resolves url with params', function () {
        var test = new Test();
        expect(test.resolveUrl('/api/v1/yay', { query: true })).toEqual('https://mastodon.social/api/v1/yay?query=true');
    });
    test.each([
        [{ 'Content-Type': 'text/plain; charset=utf-8' }, 'text/plain'],
        [{ 'content-type': 'text/plain; charset=utf-8' }, 'text/plain'],
        [{ 'Content-Type': 'text/plain' }, 'text/plain'],
    ])('removes charset from content-type', function (headers, expected) {
        var test = new Test();
        expect(test.getContentType(headers)).toBe(expected);
    });
});
