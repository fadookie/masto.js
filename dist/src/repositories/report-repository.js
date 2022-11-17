var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var ReportRepository = /** @class */ (function () {
    function ReportRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * File a report
     * @param params Parameters
     * @return Report
     * @see https://docs.joinmastodon.org/methods/accounts/reports/
     */
    ReportRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/reports', params);
    };
    __decorate([
        version({ since: '1.1.0' })
    ], ReportRepository.prototype, "create", null);
    return ReportRepository;
}());
export { ReportRepository };
