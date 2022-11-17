var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { deprecated, version } from '../decorators';
import { delay, timeout } from '../utils';
var MediaAttachmentRepository = /** @class */ (function () {
    function MediaAttachmentRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * @experimental
     * @param id ID of the media
     * @param interval interval of polling
     * @returns Media attachment that has done processing
     */
    MediaAttachmentRepository.prototype.waitFor = function (id, interval) {
        var _this = this;
        var _a;
        if (interval === void 0) { interval = 1000; }
        return timeout((function () { return __awaiter(_this, void 0, void 0, function () {
            var media, processing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(media == undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, delay(interval)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetch(id)];
                    case 2:
                        processing = _a.sent();
                        if (processing.url != undefined) {
                            media = processing;
                        }
                        return [3 /*break*/, 0];
                    case 3: return [2 /*return*/, media];
                }
            });
        }); })(), (_a = this.config.timeout) !== null && _a !== void 0 ? _a : 3000);
    };
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.create = function (_a) {
        var _b = _a.skipPolling, skipPolling = _b === void 0 ? false : _b, params = __rest(_a, ["skipPolling"]);
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.post("/api/v2/media", params, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                    case 1:
                        media = _c.sent();
                        if (skipPolling)
                            return [2 /*return*/, media];
                        return [2 /*return*/, this.waitFor(media.id)];
                }
            });
        });
    };
    /**
     * Fetches an attachment to be used with a new status.
     * @param id ID of the attachment
     * @see https://github.com/tootsuite/mastodon/pull/13210
     */
    MediaAttachmentRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/media/".concat(id));
    };
    /**
     * Update an Attachment, before it is attached to a status and posted.
     * @param id The id of the Attachment entity to be updated
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.update = function (id, _a) {
        var _b = _a.skipPolling, skipPolling = _b === void 0 ? false : _b, params = __rest(_a, ["skipPolling"]);
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.put("/api/v1/media/".concat(id), params, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                    case 1:
                        media = _c.sent();
                        if (skipPolling)
                            return [2 /*return*/, media];
                        return [2 /*return*/, this.waitFor(media.id)];
                }
            });
        });
    };
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.v1__create = function (params) {
        return this.http.post("/api/v1/media", params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
    __decorate([
        version({ since: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], MediaAttachmentRepository.prototype, "update", null);
    __decorate([
        deprecated('Use Masto.media#create instead'),
        version({ since: '0.0.0', until: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "v1__create", null);
    return MediaAttachmentRepository;
}());
export { MediaAttachmentRepository };
