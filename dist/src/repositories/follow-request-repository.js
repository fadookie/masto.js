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
var FollowRequestRepository = /** @class */ (function (_super) {
    __extends(FollowRequestRepository, _super);
    function FollowRequestRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Pending Follows
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    FollowRequestRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/follow_requests", params);
    };
    /**
     * Accept Follow
     * @param id ID of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    FollowRequestRepository.prototype.authorize = function (id) {
        return this.http.post("/api/v1/follow_requests/".concat(id, "/authorize"));
    };
    /**
     * Reject Follow
     * @param id ID of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    FollowRequestRepository.prototype.reject = function (id) {
        return this.http.post("/api/v1/follow_requests/".concat(id, "/reject"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], FollowRequestRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '0.0.0' })
    ], FollowRequestRepository.prototype, "authorize", null);
    __decorate([
        version({ since: '0.0.0' })
    ], FollowRequestRepository.prototype, "reject", null);
    return FollowRequestRepository;
}(IterableRepository));
export { FollowRequestRepository };
