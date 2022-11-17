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
import EventEmitter from 'eventemitter3';
export var wsDisconnect = jest.fn();
export var wsOn = jest.fn();
export var wsStream = jest.fn();
var WsEventsMockImpl = /** @class */ (function (_super) {
    __extends(WsEventsMockImpl, _super);
    function WsEventsMockImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.disconnect = wsDisconnect;
        _this.on = wsOn;
        return _this;
    }
    WsEventsMockImpl.connect = jest.fn();
    return WsEventsMockImpl;
}(EventEmitter));
export { WsEventsMockImpl };
var WsMockImpl = /** @class */ (function () {
    function WsMockImpl() {
        this.stream = wsStream;
    }
    return WsMockImpl;
}());
export { WsMockImpl };
