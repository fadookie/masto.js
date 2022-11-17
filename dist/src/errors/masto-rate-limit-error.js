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
import { MastoError } from './masto-error';
/**
 * Mastodon rate limit error class
 * @param message Message for users
 */
var MastoRateLimitError = /** @class */ (function (_super) {
    __extends(MastoRateLimitError, _super);
    function MastoRateLimitError(message, 
    /** Number of requests permitted per time period */
    limit, 
    /** Number of requests you can still make */
    remaining, 
    /** Timestamp when your rate limit will reset */
    reset, description, details) {
        var _this = _super.call(this, message, 429, description, details) || this;
        _this.limit = limit;
        _this.remaining = remaining;
        _this.reset = reset;
        _this.name = 'MastoRateLimitError';
        return _this;
    }
    return MastoRateLimitError;
}(MastoError));
export { MastoRateLimitError };
