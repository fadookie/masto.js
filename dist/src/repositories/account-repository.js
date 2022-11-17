var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators/version';
import { Paginator } from '../paginator';
var AccountRepository = /** @class */ (function () {
    function AccountRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    AccountRepository.prototype.getFollowersIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/followers"), params);
    };
    AccountRepository.prototype.getFollowingIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/following"), params);
    };
    AccountRepository.prototype.getStatusesIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/statuses"), params);
    };
    // ====
    /**
     * View information about a profile.
     * @param id The id of the account in the database
     * @return Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id));
    };
    /**
     * Creates a user and account records. Returns an account access token
     * for the app that initiated the request. The app should save this token for later,
     * and should wait for the user to confirm their account by clicking a link in their email inbox.
     * @param params Parameters
     * @return Token
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/accounts", params);
    };
    /**
     * Test to make sure that the user token works.
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.verifyCredentials = function () {
        return this.http.get('/api/v1/accounts/verify_credentials');
    };
    /**
     *  Update the user's display and preferences.
     * @param params Parameters
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.updateCredentials = function (params) {
        return this.http.patch('/api/v1/accounts/update_credentials', params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
    /**
     * Accounts which follow the given account, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchFollowers = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getFollowersIterable(id, params).next();
    };
    /**
     * Accounts which the given account is following, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchFollowing = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getFollowersIterable(id, params).next();
    };
    /**
     * Statuses posted to the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchStatuses = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getStatusesIterable(id, params).next();
    };
    /**
     * Follow the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.follow = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/follow"), params);
    };
    /**
     * Unfollow the given account
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unfollow = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unfollow"), params);
    };
    /**
     * Find out whether a given account is followed, blocked, muted, etc.
     * @param id Array of account IDs to check
     * @return Array of Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchRelationships = function (id) {
        return this.http.get('/api/v1/accounts/relationships', {
            id: id,
        });
    };
    /**
     * Search for matching accounts by username or display name.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.search = function (params) {
        return this.http.get("/api/v1/accounts/search", params);
    };
    /**
     * Block the given account. Clients should filter statuses from this account if received (e.g. due to a boost in the Home timeline)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.block = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/block"));
    };
    /**
     * Unblock the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unblock = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unblock"));
    };
    /**
     * Add the given account to the user's featured profiles. (Featured profiles are currently shown on the user's own public profile.)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.pin = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/pin"));
    };
    /**
     * Remove the given account from the user's featured profiles.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unpin = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unpin"));
    };
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    AccountRepository.prototype.fetchLists = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/lists"));
    };
    /**
     * Mute the given account. Clients should filter statuses and notifications from this account, if received (e.g. due to a boost in the Home timeline).
     * @param id The id of the account in the database
     * @param params Parameter
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.mute = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/mute"), params);
    };
    /**
     * Unmute the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unmute = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unmute"));
    };
    /**
     * Add personal note to the account
     * @param id ID of the account
     * @param param Parameters
     * @return Relationship
     */
    AccountRepository.prototype.createNote = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/note"), params);
    };
    /**
     * Get featured tag of the account
     * @param id ID of the account
     * @return FeaturedTags
     */
    AccountRepository.prototype.fetchFeaturedTags = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/featured_tags"));
    };
    /**
     * Identity proofs
     * @param id The id of the account in the database
     * @return Array of IdentityProof
     * @see https://github.com/tootsuite/mastodon/pull/10297
     */
    AccountRepository.prototype.fetchIdentityProofs = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/identity_proofs"));
    };
    /**
     * This method allows to quickly convert a username of a known account to an ID that can be used with the REST API, or to check if a username is available for sign-up
     * @param params Parameters
     * @return Account
     */
    AccountRepository.prototype.lookup = function (params) {
        return this.http.get('/api/v1/accounts/lookup', params);
    };
    /**
     * TODO: stub
     * @returns Accounts
     */
    AccountRepository.prototype.fetchFamiliarFollowers = function () {
        return this.http.get("/api/v1/accounts/familiar_followers");
    };
    /**
     * @param id ID of the account
     * @returns N/A
     */
    AccountRepository.prototype.removeFromFollowers = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/remove_from_followers"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getFollowersIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getFollowingIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getStatusesIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.7.0' })
    ], AccountRepository.prototype, "create", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "verifyCredentials", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "updateCredentials", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "follow", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unfollow", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "fetchRelationships", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "search", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "block", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unblock", null);
    __decorate([
        version({ since: '2.5.0' })
    ], AccountRepository.prototype, "pin", null);
    __decorate([
        version({ since: '2.5.0' })
    ], AccountRepository.prototype, "unpin", null);
    __decorate([
        version({ since: '2.1.0' })
    ], AccountRepository.prototype, "fetchLists", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "mute", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unmute", null);
    __decorate([
        version({ since: '3.2.0' })
    ], AccountRepository.prototype, "createNote", null);
    __decorate([
        version({ since: '3.3.0' })
    ], AccountRepository.prototype, "fetchFeaturedTags", null);
    __decorate([
        version({ since: '2.8.0' })
    ], AccountRepository.prototype, "fetchIdentityProofs", null);
    __decorate([
        version({ since: '3.4.0' })
    ], AccountRepository.prototype, "lookup", null);
    __decorate([
        version({ since: '3.5.0' })
    ], AccountRepository.prototype, "fetchFamiliarFollowers", null);
    __decorate([
        version({ since: '3.5.0' })
    ], AccountRepository.prototype, "removeFromFollowers", null);
    return AccountRepository;
}());
export { AccountRepository };
