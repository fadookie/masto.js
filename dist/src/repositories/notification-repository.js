var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
import { Paginator } from '../paginator';
import { IterableRepository } from './iterable-repository';
var NotificationsRepository = /** @class */ (function (_super) {
    __extends(NotificationsRepository, _super);
    function NotificationsRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Notifications concerning the user.
     * This API returns Link headers containing links to the next/previous page.
     * However, the links can also be constructed dynamically using query params and `id` values.
     * @param params Query parameter
     * @return Array of Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/notifications', params);
    };
    /**
     * View information about a notification with a given ID.
     * @param id ID of the notification in the database.
     * @return Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/notifications/".concat(id));
    };
    /**
     * Clear all notifications from the server.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.clear = function () {
        return this.http.post('/api/v1/notifications/clear');
    };
    /**
     * Clear a single notification from the server.
     * @param id ID of the notification to be cleared
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.dismiss = function (id) {
        return this.http.post("/api/v1/notifications/".concat(id, "/dismiss"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "clear", null);
    __decorate([
        version({ since: '2.6.0' })
    ], NotificationsRepository.prototype, "dismiss", null);
    return NotificationsRepository;
}(IterableRepository));
export { NotificationsRepository };
