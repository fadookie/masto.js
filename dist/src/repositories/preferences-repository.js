var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var PreferenceRepository = /** @class */ (function () {
    function PreferenceRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Preferences defined by the user in their account settings.
     * @return Preferences by key and value
     * @see https://docs.joinmastodon.org/methods/accounts/preferences/
     */
    PreferenceRepository.prototype.fetch = function () {
        return this.http.get('/api/v1/preferences');
    };
    __decorate([
        version({ since: '2.8.0' })
    ], PreferenceRepository.prototype, "fetch", null);
    return PreferenceRepository;
}());
export { PreferenceRepository };
