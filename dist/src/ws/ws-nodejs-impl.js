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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import EventEmitter from 'eventemitter3';
import WebSocket from 'isomorphic-ws';
import { BaseWs } from './base-ws';
/**
 * Mastodon streaming api wrapper
 */
var WsEventsNodejsImpl = /** @class */ (function (_super) {
    __extends(WsEventsNodejsImpl, _super);
    function WsEventsNodejsImpl(ws, serializer) {
        var _this = _super.call(this) || this;
        _this.ws = ws;
        _this.serializer = serializer;
        /**
         * Parse JSON data and emit it as an event
         * @param message Websocket message
         */
        _this.handleMessage = function (_a) {
            var data = _a.data;
            var event = _this.serializer.deserialize('application/json', data);
            var args = [];
            try {
                args.push(_this.serializer.deserialize('application/json', event.payload));
            }
            catch (_b) {
                args = [];
            }
            _this.emit.apply(_this, __spreadArray([event.event], args, false));
        };
        return _this;
    }
    /**
     * Connect to the websocket endpoint
     * @param url URL of the websocket endpoint
     * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
     * @param params URL parameters
     */
    WsEventsNodejsImpl.connect = function (url, serializer, protocols) {
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket(url, protocols);
            var instance = new WsEventsNodejsImpl(ws, serializer);
            ws.addEventListener('message', instance.handleMessage);
            ws.addEventListener('error', reject);
            ws.addEventListener('open', function () { return resolve(instance); });
        });
    };
    /**
     * Disconnect from the websocket endpoint
     */
    WsEventsNodejsImpl.prototype.disconnect = function () {
        if (!this.ws)
            return;
        this.ws.close();
    };
    return WsEventsNodejsImpl;
}(EventEmitter));
export { WsEventsNodejsImpl };
var WsNodejsImpl = /** @class */ (function (_super) {
    __extends(WsNodejsImpl, _super);
    function WsNodejsImpl(baseUrl, version, config, serializer) {
        var _this = _super.call(this) || this;
        _this.baseUrl = baseUrl;
        _this.version = version;
        _this.config = config;
        _this.serializer = serializer;
        return _this;
    }
    WsNodejsImpl.prototype.stream = function (path, params) {
        if (params === void 0) { params = {}; }
        return WsEventsNodejsImpl.connect(this.resolveUrl(path, params), this.serializer, this.createProtocols());
    };
    return WsNodejsImpl;
}(BaseWs));
export { WsNodejsImpl };
