var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var AppRepository = /** @class */ (function () {
    function AppRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Create a new application to obtain OAuth2 credentials.
     * @param params Parameters
     * @return Returns App with `client_id` and `client_secret`
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    AppRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/apps", params);
    };
    /**
     * Confirm that the app's OAuth2 credentials work.
     * @return Application
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    AppRepository.prototype.verifyCredentials = function () {
        return this.http.get("/api/v1/apps/verify_credentials");
    };
    __decorate([
        version({ since: '0.0.0' })
    ], AppRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.0.0' })
    ], AppRepository.prototype, "verifyCredentials", null);
    return AppRepository;
}());
export { AppRepository };
