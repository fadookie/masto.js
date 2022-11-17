var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../../decorators';
var AccountRepository = /** @class */ (function () {
    function AccountRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View accounts matching certain criteria for filtering, up to 100 at a time.
     * Pagination may be done with the HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/admin/accounts', params);
    };
    /**
     * View admin-level information about the given account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/admin/accounts/".concat(id));
    };
    /**
     * Perform an action against an account and log this action in the moderation history.
     * @param id g ID of the account
     * @param params Params
     * @return Account
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.createAction = function (id, params) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/action"), params);
    };
    /**
     * Approve the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.approve = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/approve"));
    };
    /**
     * Reject the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.reject = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/reject"));
    };
    /**
     * Re-enable a local account whose login is currently disabled.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.enable = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/enable"));
    };
    /**
     * Unsilence a currently silenced account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.unsilence = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/unsilence"));
    };
    /**
     * Unsuspend a currently suspended account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.unsuspend = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/unsuspend"));
    };
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "createAction", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "approve", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "reject", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "enable", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "unsilence", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "unsuspend", null);
    return AccountRepository;
}());
export { AccountRepository };
