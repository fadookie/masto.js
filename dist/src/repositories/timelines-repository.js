var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { deprecated, version } from '../decorators';
import { Paginator } from '../paginator';
var TimelinesRepository = /** @class */ (function () {
    function TimelinesRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
        // ====
        /**
         * @deprecated Use getHashtagIterable instead.
         */
        this.getTagIterable = this.getHashtagIterable.bind(this);
        /**
         * @deprecated Use getListIterable instead.
         */
        this.getList = this.getListIterable.bind(this);
        /**
         * @deprecated Use getDirectIterable instead.
         */
        this.getDirect = this.getDirectIterable.bind(this);
    }
    Object.defineProperty(TimelinesRepository.prototype, "home", {
        get: function () {
            return this.getHomeIterable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimelinesRepository.prototype, "public", {
        get: function () {
            return this.getPublicIterable();
        },
        enumerable: false,
        configurable: true
    });
    TimelinesRepository.prototype.getHomeIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/home', params);
    };
    TimelinesRepository.prototype.getPublicIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/public', params);
    };
    TimelinesRepository.prototype.getHashtagIterable = function (hashtag, params) {
        return new Paginator(this.http, "/api/v1/timelines/tag/".concat(hashtag), params);
    };
    TimelinesRepository.prototype.getListIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/timelines/list/".concat(id), params);
    };
    TimelinesRepository.prototype.getDirectIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/direct', params);
    };
    // ====
    /**
     * View statuses from followed users.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchHome = function (params) {
        return this.getHomeIterable(params).next();
    };
    /**
     * Public timeline
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchPublic = function (params) {
        return this.getPublicIterable(params).next();
    };
    /**
     * View public statuses containing the given hashtag.
     * @param hashtag Content of a #hashtag, not including # symbol.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchHashtag = function (hashtag, params) {
        return this.getHashtagIterable(hashtag, params).next();
    };
    /**
     * View statuses in the given list timeline.
     * @param id Local ID of the list in the database.
     * @param params Query parameter
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchList = function (id, params) {
        return this.getListIterable(id, params).next();
    };
    /**
     * View statuses with a “direct” privacy, from your account or in your notifications.
     * @deprecated Use conversations API instead
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchDirect = function (params) {
        return this.getDirectIterable(params).next();
    };
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getHomeIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getPublicIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getHashtagIterable", null);
    __decorate([
        version({ since: '2.1.0' })
    ], TimelinesRepository.prototype, "getListIterable", null);
    __decorate([
        deprecated('Use conversations API instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], TimelinesRepository.prototype, "getDirectIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchHome", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchPublic", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchHashtag", null);
    __decorate([
        version({ since: '2.1.0' })
    ], TimelinesRepository.prototype, "fetchList", null);
    __decorate([
        deprecated('Use conversations API instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], TimelinesRepository.prototype, "fetchDirect", null);
    return TimelinesRepository;
}());
export { TimelinesRepository };
