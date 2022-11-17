var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var DirectoryRepository = /** @class */ (function () {
    function DirectoryRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * List accounts visible in the directory.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/instance/directory/
     */
    DirectoryRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/directory', params);
    };
    __decorate([
        version({ since: '3.0.0' })
    ], DirectoryRepository.prototype, "fetchAll", null);
    return DirectoryRepository;
}());
export { DirectoryRepository };
