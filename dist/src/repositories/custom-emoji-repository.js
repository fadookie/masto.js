var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var CustomEmojiRepository = /** @class */ (function () {
    function CustomEmojiRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Returns custom emojis that are available on the server.
     * @return Array of Emoji
     * @see https://docs.joinmastodon.org/methods/instance/custom_emojis/
     */
    CustomEmojiRepository.prototype.fetchAll = function () {
        return this.http.get("/api/v1/custom_emojis");
    };
    __decorate([
        version({ since: '2.0.0' })
    ], CustomEmojiRepository.prototype, "fetchAll", null);
    return CustomEmojiRepository;
}());
export { CustomEmojiRepository };
