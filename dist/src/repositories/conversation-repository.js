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
var ConversationRepository = /** @class */ (function (_super) {
    __extends(ConversationRepository, _super);
    function ConversationRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Show conversation
     * @param params Parameters
     * @return Array of Conversation
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    ConversationRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/conversations', params);
    };
    /**
     * Remove conversation
     * @param id ID of the conversation in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    ConversationRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/conversations/".concat(id));
    };
    /**
     * Mark as read
     * @param id ID of the conversation in the database
     * @return Conversation
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    ConversationRepository.prototype.read = function (id) {
        return this.http.post("/api/v1/conversations/".concat(id, "/read"));
    };
    __decorate([
        version({ since: '2.6.0' })
    ], ConversationRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '2.6.0' })
    ], ConversationRepository.prototype, "remove", null);
    __decorate([
        version({ since: '2.6.0' })
    ], ConversationRepository.prototype, "read", null);
    return ConversationRepository;
}(IterableRepository));
export { ConversationRepository };
