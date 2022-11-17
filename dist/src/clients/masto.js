var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { version } from '../decorators';
import { Paginator } from '../paginator';
import { AccountRepository, AnnouncementRepository, AppRepository, BlockRepository, BookmarkRepository, ConversationRepository, CustomEmojiRepository, DirectoryRepository, DomainBlockRepository, EmailRepository, EndorsementRepository, FavouriteRepository, FeaturedTagRepository, FilterRepository, FollowRequestRepository, InstanceRepository, ListRepository, MarkerRepository, MediaAttachmentRepository, MuteRepository, NotificationsRepository, PollRepository, PreferenceRepository, PushSubscriptionsRepository, ReportRepository, ScheduledStatusesRepository, StatusRepository, StreamRepository, SuggestionRepository, TimelinesRepository, TrendRepository, } from '../repositories';
import { MastoAdminClient } from './admin';
var MastoClient = /** @class */ (function () {
    function MastoClient(http, ws, version, config) {
        this.http = http;
        this.ws = ws;
        this.version = version;
        this.config = config;
        this.admin = new MastoAdminClient(this.http, this.version, this.config);
        this.stream = new StreamRepository(this.ws, this.version, this.config);
        this.accounts = new AccountRepository(this.http, this.version, this.config);
        this.announcements = new AnnouncementRepository(this.http, this.version, this.config);
        this.apps = new AppRepository(this.http, this.version, this.config);
        this.blocks = new BlockRepository(this.http, this.version, this.config);
        this.bookmarks = new BookmarkRepository(this.http, this.version, this.config);
        this.conversations = new ConversationRepository(this.http, this.version, this.config);
        this.customEmojis = new CustomEmojiRepository(this.http, this.version, this.config);
        this.directory = new DirectoryRepository(this.http, this.version, this.config);
        this.domainBlocks = new DomainBlockRepository(this.http, this.version, this.config);
        this.endorsements = new EndorsementRepository(this.http, this.version, this.config);
        this.favourites = new FavouriteRepository(this.http, this.version, this.config);
        this.featuredTags = new FeaturedTagRepository(this.http, this.version, this.config);
        this.filters = new FilterRepository(this.http, this.version, this.config);
        this.followRequests = new FollowRequestRepository(this.http, this.version, this.config);
        this.instances = new InstanceRepository(this.http, this.version, this.config);
        this.lists = new ListRepository(this.http, this.version, this.config);
        this.markers = new MarkerRepository(this.http, this.version, this.config);
        this.mediaAttachments = new MediaAttachmentRepository(this.http, this.version, this.config);
        this.mutes = new MuteRepository(this.http, this.version, this.config);
        this.notifications = new NotificationsRepository(this.http, this.version, this.config);
        this.poll = new PollRepository(this.http, this.version, this.config);
        this.preferences = new PreferenceRepository(this.http, this.version, this.config);
        this.pushSubscriptions = new PushSubscriptionsRepository(this.http, this.version, this.config);
        this.reports = new ReportRepository(this.http, this.version, this.config);
        this.scheduledStatuses = new ScheduledStatusesRepository(this.http, this.version, this.config);
        this.statuses = new StatusRepository(this.http, this.version, this.config);
        this.suggestions = new SuggestionRepository(this.http, this.version, this.config);
        this.timelines = new TimelinesRepository(this.http, this.version, this.config);
        this.trends = new TrendRepository(this.http, this.version, this.config);
        this.email = new EmailRepository(this.http, this.version, this.config);
    }
    /**
     * Search results
     * @param params Parameters
     * @return Results
     * @see https://docs.joinmastodon.org/methods/search/
     */
    MastoClient.prototype.search = function (params) {
        return new Paginator(this.http, "/api/v2/search", params);
    };
    __decorate([
        version({ since: '2.4.1' })
    ], MastoClient.prototype, "search", null);
    return MastoClient;
}());
export { MastoClient };
/**
 * @deprecated This type alias will be removed in v5.x
 */
export var FacadeRepositories = MastoClient;
