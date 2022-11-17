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
var ScheduledStatusesRepository = /** @class */ (function (_super) {
    __extends(ScheduledStatusesRepository, _super);
    function ScheduledStatusesRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * View scheduled statuses
     * @param params Parameters
     * @return Array of ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/scheduled_statuses', params);
    };
    /**
     * View a single scheduled status
     * @param id ID of the scheduled status in the database.
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/scheduled_statuses/".concat(id));
    };
    /**
     * Update Scheduled status
     * @param id ID of the Status to be scheduled
     * @param params Parameters
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/api/rest/scheduled-statuses/#put-api-v1-scheduled-statuses-id
     */
    ScheduledStatusesRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/scheduled_statuses/".concat(id), params);
    };
    /**
     * Cancel a scheduled status
     * @param id ID of the scheduled status in the database.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/scheduled_statuses/".concat(id));
    };
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "remove", null);
    return ScheduledStatusesRepository;
}(IterableRepository));
export { ScheduledStatusesRepository };
