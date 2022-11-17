var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../../decorators';
var ReportRepository = /** @class */ (function () {
    function ReportRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View all reports. Pagination may be done with HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/admin/reports', params);
    };
    /**
     * View information about the report with the given ID.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/admin/reports/".concat(id));
    };
    /**
     * Claim the handling of this report to yourself.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.assignToSelf = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/assign_to_self"));
    };
    /**
     * Unassign a report so that someone else can claim it.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.unassign = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/unassign"));
    };
    /**
     * Mark a report as resolved with no further action taken.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.resolve = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/resolve"));
    };
    /**
     * Reopen a currently closed report.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.reopen = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/reopen"));
    };
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "assignToSelf", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "unassign", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "resolve", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "reopen", null);
    return ReportRepository;
}());
export { ReportRepository };
