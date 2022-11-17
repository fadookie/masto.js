var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { deprecated, version } from '../decorators';
var StatusRepository = /** @class */ (function () {
    function StatusRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View information about a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id));
    };
    /**
     * Post a new status.
     * @param params Parameters
     * @param idempotencyKey Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    StatusRepository.prototype.create = function (params, idempotencyKey) {
        if (idempotencyKey) {
            return this.http.post('/api/v1/statuses', params, {
                headers: { 'Idempotency-Key': idempotencyKey },
            });
        }
        return this.http.post('/api/v1/statuses', params);
    };
    /**
     * Update a status
     * @param params Parameters
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    StatusRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/statuses/".concat(id), params);
    };
    /**
     * Delete one of your own statuses.
     * @param id Local ID of a status in the database. Must be owned by authenticated account.
     * @return Status with source text and `media_attachments` or `poll`
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/statuses/".concat(id));
    };
    /**
     * View statuses above and below this status in the thread.
     * @param id Local ID of a status in the database.
     * @return Context
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchContext = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/context"));
    };
    /**
     * Preview card
     * @deprecated Use `card` attribute of status instead
     * @param id ID of the status in the database
     * @return Card
     * @see https://docs.joinmastodon.org/api/rest/statuses/#get-api-v1-statuses-id-card
     */
    StatusRepository.prototype.fetchCard = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/card"));
    };
    /**
     * Add a status to your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.favourite = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/favourite"));
    };
    /**
     * Remove a status from your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unfavourite = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unfavourite"));
    };
    /**
     * Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.mute = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/mute"));
    };
    /**
     * Start receiving notifications again for the thread that this status is part of.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unmute = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unmute"));
    };
    /**
     * View who boosted a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchRebloggedBy = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/reblogged_by"));
    };
    /**
     * View who favourited a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchFavouritedBy = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/favourited_by"));
    };
    /**
     * Re-share a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses-id-reblog
     */
    StatusRepository.prototype.reblog = function (id, params) {
        return this.http.post("/api/v1/statuses/".concat(id, "/reblog"), params);
    };
    /**
     * Undo a re-share of a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unreblog = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unreblog"));
    };
    /**
     * Feature one of your own public statuses at the top of your profile.
     * @param id Local ID of a status in the database. The status should be public and authored by the authorized account.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.pin = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/pin"));
    };
    /**
     * Un-feature a status from the top of your profile.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unpin = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unpin"));
    };
    /**
     * Privately bookmark a status.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.bookmark = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/bookmark"));
    };
    /**
     * Remove a status from your private bookmarks.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unbookmark = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unbookmark"));
    };
    StatusRepository.prototype.fetchHistory = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/history"));
    };
    StatusRepository.prototype.fetchSource = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/source"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "update", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "remove", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchContext", null);
    __decorate([
        deprecated('Use `card` attribute of status instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], StatusRepository.prototype, "fetchCard", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "favourite", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "unfavourite", null);
    __decorate([
        version({ since: '1.4.2' })
    ], StatusRepository.prototype, "mute", null);
    __decorate([
        version({ since: '1.4.2' })
    ], StatusRepository.prototype, "unmute", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchRebloggedBy", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchFavouritedBy", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "reblog", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "unreblog", null);
    __decorate([
        version({ since: '1.6.0' })
    ], StatusRepository.prototype, "pin", null);
    __decorate([
        version({ since: '1.6.0' })
    ], StatusRepository.prototype, "unpin", null);
    __decorate([
        version({ since: '3.1.0' })
    ], StatusRepository.prototype, "bookmark", null);
    __decorate([
        version({ since: '3.1.0' })
    ], StatusRepository.prototype, "unbookmark", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "fetchHistory", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "fetchSource", null);
    return StatusRepository;
}());
export { StatusRepository };
