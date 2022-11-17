var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var FilterRepository = /** @class */ (function () {
    function FilterRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View all filters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.fetchAll = function () {
        return this.http.get("/api/v1/filters");
    };
    /**
     * View a single filter
     * @param id ID of the filter
     * @return Returns Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/filters/".concat(id));
    };
    /**
     * Create a filter
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/filters", params);
    };
    /**
     * Update a filter
     * @param id ID of the filter in the database
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/filters/".concat(id), params);
    };
    /**
     * Remove a filter
     * @param id ID of the filter in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/filters/".concat(id));
    };
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "remove", null);
    return FilterRepository;
}());
export { FilterRepository };
