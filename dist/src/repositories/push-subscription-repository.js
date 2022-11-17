var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
var PushSubscriptionsRepository = /** @class */ (function () {
    function PushSubscriptionsRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Add a Web Push API subscription to receive notifications.
     * Each access token can have one push subscription.
     * If you create a new subscription, the old subscription is deleted.
     * @param params Parameters
     * @return Returns Push Subscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    PushSubscriptionsRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/push/subscription', params);
    };
    /**
     * View the PushSubscription currently associated with this access token.
     * @return PushSubscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    PushSubscriptionsRepository.prototype.fetch = function () {
        return this.http.get('/api/v1/push/subscription');
    };
    /**
     * Updates the current push subscription. Only the data part can be updated. To change fundamentals, a new subscription must be created instead.
     * @param params Parameters
     * @return PushSubscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    PushSubscriptionsRepository.prototype.update = function (params) {
        return this.http.put('/api/v1/push/subscription', params);
    };
    /**
     * Removes the current Web Push API subscription.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    PushSubscriptionsRepository.prototype.remove = function () {
        return this.http.delete('/api/v1/push/subscription');
    };
    __decorate([
        version({ since: '2.4.0' })
    ], PushSubscriptionsRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.4.0' })
    ], PushSubscriptionsRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.4.0' })
    ], PushSubscriptionsRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.4.0' })
    ], PushSubscriptionsRepository.prototype, "remove", null);
    return PushSubscriptionsRepository;
}());
export { PushSubscriptionsRepository };
