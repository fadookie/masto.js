var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
import { Paginator } from '../paginator';
var TrendRepository = /** @class */ (function () {
    function TrendRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    Object.defineProperty(TrendRepository.prototype, "statuses", {
        get: function () {
            return this.getStatuses();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrendRepository.prototype, "links", {
        get: function () {
            return this.getLinks();
        },
        enumerable: false,
        configurable: true
    });
    TrendRepository.prototype.getStatuses = function (params) {
        return new Paginator(this.http, '/api/v1/trends/statuses', params);
    };
    TrendRepository.prototype.getLinks = function (params) {
        return new Paginator(this.http, '/api/v1/trends/links', params);
    };
    /**
     * Tags that are being used more frequently within the past week.
     * @param params Parameters
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/instance/trends/
     */
    TrendRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/trends/tags', params);
    };
    __decorate([
        version({ since: '3.5.0' })
    ], TrendRepository.prototype, "getStatuses", null);
    __decorate([
        version({ since: '3.5.0' })
    ], TrendRepository.prototype, "getLinks", null);
    __decorate([
        version({ since: '3.0.0' })
    ], TrendRepository.prototype, "fetchAll", null);
    return TrendRepository;
}());
export { TrendRepository };
