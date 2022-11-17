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
/**
 * Error object
 * @see https://docs.joinmastodon.org/entities/error/
 */
var MastoError = /** @class */ (function (_super) {
    __extends(MastoError, _super);
    function MastoError(
    /** The error message. Equivalent for the `error` field from the Error entity */
    message, 
    /** HTTP status code */
    statusCode, 
    /** A longer description of the error, mainly provided with the OAuth API. */
    description, 
    /** Used by /api/v1/accounts */
    details) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.statusCode = statusCode;
        _this.description = description;
        _this.details = details;
        /** Helper to check if the error has been thrown from Masto */
        _this.isMastoError = true;
        return _this;
    }
    return MastoError;
}(Error));
export { MastoError };
