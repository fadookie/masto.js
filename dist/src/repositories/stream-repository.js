var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var StreamRepository = /** @class */ (function () {
    function StreamRepository(ws, version, config) {
        this.ws = ws;
        this.version = version;
        this.config = config;
    }
    /**
     * Starting home timeline and notification streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamUser = function () {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'user',
        });
    };
    /**
     * Starting federated timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamPublicTimeline = function () {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'public',
        });
    };
    /**
     * Starting local timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamCommunityTimeline = function () {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'public:local',
        });
    };
    /**
     * Stream remote public timeline
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamRemotePublicTimeline = function () {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'public:remote',
        });
    };
    /**
     * Starting tag timeline streaming
     * @param id ID of the tag
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamTagTimeline = function (id) {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'hashtag',
            tag: id,
        });
    };
    /**
     * Starting local tag timeline streaming
     * @param id ID of the tag
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamLocalTagTimeline = function (id) {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'hashtag:local',
            tag: id,
        });
    };
    /**
     * Starting list timeline streaming
     * @param id ID of the list
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamListTimeline = function (id) {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'list',
            list: id,
        });
    };
    /**
     * Starting direct timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    StreamRepository.prototype.streamDirectTimeline = function () {
        return this.ws.stream('/api/v1/streaming', {
            stream: 'direct',
        });
    };
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamUser", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamPublicTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamCommunityTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamRemotePublicTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamTagTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamLocalTagTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamListTimeline", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StreamRepository.prototype, "streamDirectTimeline", null);
    return StreamRepository;
}());
export { StreamRepository };
