var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var PollRepository = /** @class */ (function () {
    function PollRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View a poll
     * @param id ID of the poll in the database
     * @return Poll
     * @see https://docs.joinmastodon.org/methods/statuses/polls/
     */
    PollRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/polls/".concat(id));
    };
    /**
     * Vote on a poll
     * @param id ID of the poll in the database
     * @param params Parameters
     * @return Poll
     * @see https://docs.joinmastodon.org/methods/statuses/polls/
     */
    PollRepository.prototype.vote = function (id, params) {
        return this.http.post("/api/v1/polls/".concat(id, "/votes"), params);
    };
    __decorate([
        version({ since: '2.8.0' })
    ], PollRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.8.0' })
    ], PollRepository.prototype, "vote", null);
    return PollRepository;
}());
export { PollRepository };
