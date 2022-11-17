var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
import { Paginator } from '../paginator';
var ListRepository = /** @class */ (function () {
    function ListRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    ListRepository.prototype.getAccountIterator = function (id, params) {
        return new Paginator(this.http, "/api/v1/lists/".concat(id, "/accounts"), params);
    };
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/lists/".concat(id));
    };
    /**
     * Fetch all lists that the user owns.
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/lists');
    };
    /**
     * Create a new list.
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/lists', params);
    };
    /**
     * Change the title of a list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/lists/".concat(id), params);
    };
    /**
     * Delete a list
     * @param id ID of the list in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/lists/".concat(id));
    };
    /**
     * View accounts in list
     * @param id ID of the list in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetchAccounts = function (id, params) {
        return this.getAccountIterator(id, params).next();
    };
    /**
     * Add accounts to the given list. Note that the user must be following these accounts.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.addAccount = function (id, params) {
        return this.http.post("/api/v1/lists/".concat(id, "/accounts"), params);
    };
    /**
     * Remove accounts from the given list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.removeAccount = function (id, params) {
        return this.http.delete("/api/v1/lists/".concat(id, "/accounts"), params);
    };
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "getAccountIterator", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "remove", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "addAccount", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "removeAccount", null);
    return ListRepository;
}());
export { ListRepository };
