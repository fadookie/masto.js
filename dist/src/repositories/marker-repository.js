var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var MarkerRepository = /** @class */ (function () {
    function MarkerRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Get saved timeline position
     * @param params Parameters
     * @return Markers
     * @see https://docs.joinmastodon.org/methods/timelines/markers/
     */
    MarkerRepository.prototype.fetch = function (params) {
        return this.http.get('/api/v1/markers', params);
    };
    /**
     * Save position in timeline
     * @param params Parameters
     * @return Markers
     * @see https://github.com/tootsuite/mastodon/pull/11762
     */
    MarkerRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/markers', params);
    };
    __decorate([
        version({ since: '3.0.0' })
    ], MarkerRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '3.0.0' })
    ], MarkerRepository.prototype, "create", null);
    return MarkerRepository;
}());
export { MarkerRepository };
