import { AdminRepositories } from '../repositories';
var MastoAdminClient = /** @class */ (function () {
    function MastoAdminClient(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
        this.account = new AdminRepositories.AccountRepository(this.http, this.version, this.config);
        this.report = new AdminRepositories.ReportRepository(this.http, this.version, this.config);
    }
    return MastoAdminClient;
}());
export { MastoAdminClient };
/**
 * @deprecated This alias will be removed in v5.0.0
 */
export var AdminFacadeRepositories = MastoAdminClient;
