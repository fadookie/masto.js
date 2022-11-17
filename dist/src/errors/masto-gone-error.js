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
 * Mastodon gone error
 */
var MastoGoneError = /** @class */ (function (_super) {
    __extends(MastoGoneError, _super);
    function MastoGoneError(message, description, details) {
        var _this = _super.call(this, message, 410, description, details) || this;
        _this.name = 'MastoGoneError';
        return _this;
    }
    return MastoGoneError;
}(MastoError));
export { MastoGoneError };
