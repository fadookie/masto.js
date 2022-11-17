var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var InstanceRepository = /** @class */ (function () {
    function InstanceRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Information about the server.
     * @return Instance
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetch = function () {
        return this.http.get('/api/v1/instance');
    };
    /**
     * Domains that this instance is aware of.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetchPeers = function () {
        return this.http.get('/api/v1/instance/peers');
    };
    /**
     * Instance activity over the last 3 months, binned weekly.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetchActivity = function () {
        return this.http.get('/api/v1/instance/activity');
    };
    __decorate([
        version({ since: '1.0.0' })
    ], InstanceRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.1.2' })
    ], InstanceRepository.prototype, "fetchPeers", null);
    __decorate([
        version({ since: '2.1.2' })
    ], InstanceRepository.prototype, "fetchActivity", null);
    return InstanceRepository;
}());
export { InstanceRepository };
