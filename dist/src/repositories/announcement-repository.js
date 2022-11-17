var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var AnnouncementRepository = /** @class */ (function () {
    function AnnouncementRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Fetch announcements
     * @return Announcements
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/announcements');
    };
    /**
     * Dismiss announcement
     * @param id ID of the announcement
     * @return Nothing
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.dismiss = function (id) {
        return this.http.post("/api/v1/announcements/".concat(id, "/dismiss"));
    };
    /**
     * Add a reaction to an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.addReaction = function (id, name) {
        return this.http.put("/api/v1/announcements/".concat(id, "/reactions/").concat(name));
    };
    /**
     * Remove a reaction from an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.removeReaction = function (id, name) {
        return this.http.delete("/api/v1/announcements/".concat(id, "/reactions/").concat(name));
    };
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "dismiss", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "addReaction", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "removeReaction", null);
    return AnnouncementRepository;
}());
export { AnnouncementRepository };
