var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var FeaturedTagRepository = /** @class */ (function () {
    function FeaturedTagRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View your featured tags
     * @return Array of FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     * @done
     */
    FeaturedTagRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/featured_tags');
    };
    /**
     * Feature a tag
     * @param params Parameters
     * @return FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/featured_tags', params);
    };
    /**
     * Shows your 10 most-used tags, with usage history for the past week.
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.fetchSuggestions = function () {
        return this.http.get('/api/v1/featured_tags/suggestions');
    };
    /**
     * Un-feature a tag
     * @param id The id of the FeaturedTag to be un-featured
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/featured_tags/".concat(id));
    };
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "fetchSuggestions", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "remove", null);
    return FeaturedTagRepository;
}());
export { FeaturedTagRepository };
