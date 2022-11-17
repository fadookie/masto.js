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
 * Mastodon forbidden error
 */
var MastoConflictError = /** @class */ (function (_super) {
    __extends(MastoConflictError, _super);
    function MastoConflictError(message, description, details) {
        var _this = _super.call(this, message, 409, description, details) || this;
        _this.message = message;
        _this.description = description;
        _this.details = details;
        _this.name = 'MastoConflictError';
        return _this;
    }
    return MastoConflictError;
}(MastoError));
export { MastoConflictError };
