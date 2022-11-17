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
var DomainBlockRepository = /** @class */ (function (_super) {
    __extends(DomainBlockRepository, _super);
    function DomainBlockRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * View domains the user has blocked.
     * @param params Parameters
     * @return Array of strings
     * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
     */
    DomainBlockRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/domain_blocks", params);
    };
    /**
     * Block a domain to:
     * - hide all public posts from it
     * - hide all notifications from it
     * - remove all followers from it
     * - prevent following new users from it (but does not remove existing follows)
     * @param domain Domain to block.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
     */
    DomainBlockRepository.prototype.block = function (domain) {
        return this.http.post("/api/v1/domain_blocks", {
            domain: domain,
        });
    };
    /**
     * Remove a domain block, if it exists in the user's array of blocked domains.
     * @param domain Domain to unblock
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
     */
    DomainBlockRepository.prototype.unblock = function (domain) {
        return this.http.delete("/api/v1/domain_blocks", {
            domain: domain,
        });
    };
    __decorate([
        version({ since: '1.4.0' })
    ], DomainBlockRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '1.4.0' })
    ], DomainBlockRepository.prototype, "block", null);
    __decorate([
        version({ since: '1.4.0' })
    ], DomainBlockRepository.prototype, "unblock", null);
    return DomainBlockRepository;
}(IterableRepository));
export { DomainBlockRepository };
