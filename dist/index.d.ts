import EventEmitter from 'eventemitter3';
import WebSocket$1 from 'isomorphic-ws';

interface MastoProxyConfig {
    readonly host: string;
    readonly port: number;
    readonly auth?: {
        readonly username: string;
        readonly password: string;
    };
    readonly protocol?: string;
}
/**
 * Abstraction of AxiosRequestConfig
 */
interface MastoConfig {
    readonly url: string;
    readonly accessToken?: string;
    readonly timeout?: number;
    readonly headers?: {
        [key: string]: string;
    };
    readonly proxy?: MastoProxyConfig;
    readonly disableVersionCheck?: boolean;
    readonly disableDeprecatedWarning?: boolean;
    readonly disableExperimentalWarning?: boolean;
}

declare type MimeType = 'application/json' | 'multipart/form-data' | 'application/x-www-form-urlencoded';
interface Serializer {
    serialize(type: MimeType, data: unknown): unknown;
    deserialize<T = Record<string, unknown>>(type: MimeType, data: unknown): T;
}

declare class SerializerNodejsImpl implements Serializer {
    serialize(type: MimeType, rawData: unknown): unknown;
    deserialize<T = Record<string, unknown>>(type: MimeType, data: string): T;
}

declare class SerializerNativeImpl implements Serializer {
    serialize(type: MimeType, rawData: unknown): unknown;
    deserialize<T = Record<string, unknown>>(type: MimeType, data: string): T;
}

declare type Headers = Record<string, unknown>;
declare type Data = unknown;
declare type Request = {
    readonly url: string;
    readonly method: 'get' | 'post' | 'patch' | 'delete' | 'put' | 'options';
    readonly headers?: Headers;
    readonly params?: Data;
    readonly data?: Data;
};
declare type Response<T> = {
    readonly headers: Headers;
    readonly data: T;
};
declare type Method = <T>(path: string, data?: Data, request?: Partial<Request>) => Promise<T>;
interface Http {
    readonly request: <T>(request: Request) => Promise<Response<T>>;
    readonly get: Method;
    readonly post: Method;
    readonly patch: Method;
    readonly put: Method;
    readonly delete: Method;
}

declare abstract class BaseHttp implements Http {
    abstract readonly config: MastoConfig;
    abstract request<T>(request: Request): Promise<Response<T>>;
    createHeader(header?: Partial<Headers>): Headers;
    encodeParams(params?: Data): string;
    resolveUrl(path: string, params?: Data): string;
    getContentType(headers: Headers): MimeType | undefined;
    get<T>(url: string, data?: Data, init?: Partial<Request>): Promise<T>;
    post<T>(url: string, data?: Data, init?: Partial<Request>): Promise<T>;
    delete<T>(url: string, data?: Data, init?: Partial<Request>): Promise<T>;
    put<T>(url: string, data?: Data, init?: Partial<Request>): Promise<T>;
    patch<T>(url: string, data?: Data, init?: Partial<Request>): Promise<T>;
}

declare class HttpAxiosImpl extends BaseHttp implements Http {
    readonly config: MastoConfig;
    readonly serializer: Serializer;
    private readonly axios;
    constructor(config: MastoConfig, serializer: Serializer);
    request<T>(params: Request): Promise<Response<T>>;
}

declare class HttpNativeImpl extends BaseHttp implements Http {
    readonly config: MastoConfig;
    readonly serializer: Serializer;
    constructor(config: MastoConfig, serializer: Serializer);
    request<T>(request: Request): Promise<Response<T>>;
    private static toHeaders;
    private static hasBlob;
}

/**
 * Represents a user of Mastodon and their associated profile.
 * @see https://docs.joinmastodon.org/entities/account/
 */
interface Account$1 {
    /** The account id */
    id: string;
    /** The username of the account, not including domain */
    username: string;
    /** The WebFinger account URI. Equal to `username` for local users, or `username@domain` for remote users. */
    acct: string;
    /** The location of the user's profile page. */
    url: string;
    /** The profile's display name. */
    displayName: string;
    /** The profile's bio / description. */
    note: string;
    /** An image icon that is shown next to statuses and in the profile. */
    avatar: string;
    /** A static version of the `avatar`. Equal to avatar if its value is a static image; different if `avatar` is an animated GIF. */
    avatarStatic: string;
    /** An image banner that is shown above the profile and in profile cards. */
    header: string;
    /** A static version of the header. Equal to `header` if its value is a static image; different if `header` is an animated GIF. */
    headerStatic: string;
    /** Whether the account manually approves follow requests. */
    locked: boolean;
    /** Custom emoji entities to be used when rendering the profile. If none, an empty array will be returned. */
    emojis: Emoji[];
    /** Whether the account has opted into discovery features such as the profile directory. */
    discoverable: boolean;
    /** When the account was created. */
    createdAt: string;
    /** How many statuses are attached to this account. */
    statusesCount: number;
    /** The reported followers of this profile. */
    followersCount: number;
    /** The reported follows of this profile. */
    followingCount: number;
    /** Time of the last status posted */
    lastStatusAt: string;
    /** Indicates that the profile is currently inactive and that its user has moved to a new account. */
    moved?: boolean | null;
    /** An extra entity returned when an account is suspended. **/
    suspended?: boolean | null;
    /** Additional metadata attached to a profile as name-value pairs. */
    fields?: Field[] | null;
    /** Boolean to indicate that the account performs automated actions */
    bot?: boolean | null;
}
interface AccountCredentials extends Account$1 {
    /**
     * Note the extra `source` property, which is not visible on accounts other than your own.
     * Also note that plain-text is used within `source` and HTML is used for their
     * corresponding properties such as `note` and `fields`.
     */
    source: Source;
}

interface AccountFeaturedTag {
    id: string;
    name: string;
    url: string;
}

/**
 * Represents a weekly bucket of instance activity.
 * @see https://docs.joinmastodon.org/entities/activity/
 */
interface Activity {
    /** Midnight at the first day of the week. */
    week: string;
    /** Statuses created since the week began. */
    statuses: string;
    /** User logins since the week began. */
    logins: string;
    /** User registrations since the week began. */
    registrations: string;
}

declare type AccountRole = 'moderator' | 'admin' | 'user';
/**
 * Admin-level information about a given account.
 * @see https://docs.joinmastodon.org/entities/admin-account/
 */
interface Account {
    /** The ID of the account in the database. */
    id: string;
    /** The username of the account. */
    username: string;
    /** The domain of the account. */
    domain: string;
    /** When the account was first discovered. */
    createdAt: string;
    /** The email address associated with the account. */
    email: string;
    /** The IP address last used to login to this account. */
    ip: string;
    /** The locale of the account. */
    locale?: string | null;
    /** Invite request text ??? */
    inviteRequest?: string | null;
    /** The current role of the account. */
    role: AccountRole;
    /** Whether the account has confirmed their email address. */
    confirmed: boolean;
    /** Whether the account is currently approved. */
    approved: boolean;
    /** Whether the account is currently disabled. */
    disabled: boolean;
    /** Whether the account is currently silenced. */
    silenced: boolean;
    /** Whether the account is currently suspended. */
    suspended: boolean;
    /** User-level information about the account. */
    account: Account$1;
    /** The ID of the application that created this account. */
    createdByApplicationId?: string | null;
    /** The ID of the account that invited this user */
    invitedByAccountId?: string | null;
}

/**
 * Admin-level information about a filed report.
 * @see https://docs.joinmastodon.org/entities/admin-report/
 */
interface Report {
    /** The ID of the report in the database. */
    id: string;
    /** The action taken to resolve this report. */
    actionTaken: string;
    /** An optional reason for reporting. */
    comment: string;
    /** The time the report was filed. */
    createdAt: string;
    /** The time of last action on this report. */
    updatedAt: string;
    /** The account which filed the report. */
    account: Account$1;
    /** The account being reported. */
    targetAccount: Account$1;
    /** The account of the moderator assigned to this report. */
    assignedAccount: Account$1;
    /** The action taken by the moderator who handled the report. */
    actionTakenByAccount: Account$1;
    /** Statuses attached to the report, for context. */
    statuses: Status[];
}

type index$1_AccountRole = AccountRole;
type index$1_Account = Account;
type index$1_Report = Report;
declare namespace index$1 {
  export {
    index$1_AccountRole as AccountRole,
    index$1_Account as Account,
    index$1_Report as Report,
  };
}

interface Announcement {
    id: string;
    content: string;
    startsAt: string;
    endsAt: string;
    allDay: boolean;
    mentions: Mention[];
    tags: Tag[];
    emojis: Emoji[];
    reactions: Reaction[];
}

/**
 * Represents an application that interfaces with the REST API to access accounts or post statuses.
 * @see https://docs.joinmastodon.org/entities/application/
 */
interface Application {
    /** The name of your application. */
    name: string;
    /** The website associated with your application. */
    website?: string | null;
    /** Used for Push Streaming API. Returned with POST /api/v1/apps. Equivalent to PushSubscription#server_key */
    vapidKey?: string | null;
}
interface Client extends Application {
    /** Client ID key, to be used for obtaining OAuth tokens */
    clientId?: string | null;
    /** Client secret key, to be used for obtaining OAuth tokens */
    clientSecret?: string | null;
}

declare type AttachmentType = 'image' | 'video' | 'gifv' | 'audio' | 'unknown';
interface AttachmentMetaImage {
    width: number;
    height: number;
    size: string;
    aspect: number;
}
interface AttachmentMetaVideo {
    width: number;
    height: number;
    frameRate: string;
    duration: number;
    bitrate: number;
    aspect: number;
}
interface AttachmentMetaFocus {
    x: number;
    y: number;
}
interface AttachmentMetaColors {
    background: string;
    foreground: string;
    accent: string;
}
interface AttachmentMeta {
    small?: AttachmentMetaImage | AttachmentMetaVideo | null;
    original?: AttachmentMetaImage | AttachmentMetaVideo | null;
    focus?: AttachmentMetaFocus | null;
    colors?: AttachmentMetaColors | null;
}
/**
 * Represents a file or media attachment that can be added to a status.
 * @see https://docs.joinmastodon.org/entities/attachment/
 */
interface Attachment {
    /** The ID of the attachment in the database. */
    id: string;
    /** The type of the attachment. */
    type: AttachmentType;
    /** The location of the original full-size attachment. */
    url?: string | null;
    /** The location of a scaled-down preview of the attachment. */
    previewUrl: string;
    /** The location of the full-size original attachment on the remote website. */
    remoteUrl?: string | null;
    /** Remote version of previewUrl */
    previewRemoteUrl?: string | null;
    /** A shorter URL for the attachment. */
    textUrl?: string | null;
    /** Metadata returned by Paperclip. */
    meta?: AttachmentMeta | null;
    /**
     * Alternate text that describes what is in the media attachment,
     * to be used for the visually impaired or when media attachments do not load.
     */
    description?: string | null;
    /**
     * A hash computed by the BlurHash algorithm,
     * for generating colorful preview thumbnails when media has not been downloaded yet.
     */
    blurhash?: string | null;
}

declare type CardType = 'link' | 'photo' | 'video' | 'rich';
/**
 * Represents a rich preview card that is generated using OpenGraph tags from a URL.
 * @see https://docs.joinmastodon.org/entities/card/
 */
interface Card {
    /** Location of linked resource. */
    url: string;
    /** Title of linked resource. */
    title: string;
    /** Description of preview. */
    description: string;
    /** The type of the preview card. */
    type: CardType;
    /** Blurhash */
    blurhash: string;
    /** The author of the original resource. */
    authorName?: string | null;
    /** A link to the author of the original resource. */
    authorUrl?: string | null;
    /** The provider of the original resource. */
    providerName?: string | null;
    /** A link to the provider of the original resource. */
    providerUrl?: string | null;
    /** HTML to be used for generating the preview card. */
    html?: string | null;
    /** Width of preview, in pixels. */
    width?: string | null;
    /** Height of preview, in pixels. */
    height?: string | null;
    /** Preview thumbnail. */
    image?: string | null;
    /** Used for photo embeds, instead of custom `html`. */
    embedUrl: string;
}

/**
 * Represents the tree around a given status. Used for reconstructing threads of statuses.
 * @see https://docs.joinmastodon.org/entities/context/
 */
interface Context {
    /** Parents in the thread. */
    ancestors: Status[];
    /** Children in the thread. */
    descendants: Status[];
}

/**
 * Represents a conversation with "direct message" visibility.
 * @see https://docs.joinmastodon.org/entities/conversation/
 */
interface Conversation {
    /** Local database ID of the conversation. */
    id: string;
    /** Participants in the conversation. */
    accounts: Account$1[];
    /** Is the conversation currently marked as unread? */
    unread: boolean;
    /** The last status in the conversation, to be used for optional display. */
    lastStatus?: Status | null;
}

/**
 * Represents a custom emoji.
 * @see https://docs.joinmastodon.org/entities/emoji/
 */
interface Emoji {
    /** The name of the custom emoji. */
    shortcode: string;
    /** A link to the custom emoji. */
    url: string;
    /** A link to a static copy of the custom emoji. */
    staticUrl: string;
    /** Whether this Emoji should be visible in the picker or unlisted. */
    visibleInPicker: boolean;
    /** Used for sorting custom emoji in the picker. */
    category?: string | null;
}

/**
 * Represents a hashtag that is featured on a profile.
 * @see https://docs.joinmastodon.org/entities/featuredtag/
 */
interface FeaturedTag {
    /** The internal ID of the featured tag in the database. */
    id: string;
    /** The name of the hashtag being featured. */
    name: string;
    /** The number of authored statuses containing this hashtag */
    statusesCount: number;
    /** The timestamp of the last authored status containing this hashtag. */
    lastStatusAt?: string | null;
}

declare type FilterContext = 'home' | 'notifications' | 'public' | 'thread' | 'account';
/**
 * Represents a user-defined filter for determining which statuses should not be shown to the user.
 * @see https://docs.joinmastodon.org/entities/filter/
 */
interface Filter {
    /** The ID of the filter in the database. */
    id: string;
    /** The text to be filtered. */
    phrase: string;
    /** The contexts in which the filter should be applied. */
    context: FilterContext[];
    /** When the filter should no longer be applied */
    expiresAt?: string | null;
    /** Should matching entities in home and notifications be dropped by the server? */
    irreversible: boolean;
    /** Should the filter consider word boundaries? */
    wholeWord: string;
}

/**
 * Represents daily usage history of a hashtag.
 * @see https://docs.joinmastodon.org/entities/history/
 */
interface History {
    /** UNIX timestamp on midnight of the given day. */
    day: string;
    /** the counted usage of the tag within that day. */
    uses: string;
    /** the total of accounts using the tag within that day. */
    accounts: string;
}

/**
 * Represents a proof from an external identity provider.
 * @see https://docs.joinmastodon.org/entities/identityproof/
 */
interface IdentityProof {
    /** The name of the identity provider. */
    provider: string;
    /** The account owner's username on the identity provider's service. */
    providerUsername: string;
    /** The account owner's profile URL on the identity provider. */
    profileUrl: string;
    /** A link to a statement of identity proof, hosted by the identity provider. */
    proofUrl: string;
    /** The name of the identity provider. */
    updatedAt: string;
}

interface InstanceStatusesConfiguration {
    maxCharacters: number;
    maxMediaAttachments: number;
    charactersReservedPerUrl: string;
}
interface InstanceMediaAttachmentsConfiguration {
    supportedMimeTypes: string[];
    imageSizeLimit: number;
    imageMatrixLimit: number;
    videoSizeLimit: number;
    videoFrameRateLimit: number;
    videoMatrixLimit: number;
}
interface InstancePollsConfiguration {
    supportedMimeTypes: string[];
    imageSizeLimit: number;
    imageMatrixLimit: number;
    videoSizeLimit: number;
    videoFrameRateLimit: number;
    videoMatrixLimit: number;
}
/**
 * @see https://github.com/mastodon/mastodon/pull/16485
 */
interface InstanceConfiguration {
    statuses: InstanceStatusesConfiguration;
    mediaAttachments: InstanceMediaAttachmentsConfiguration;
    polls: InstancePollsConfiguration;
}
/**
 * Represents the software instance of Mastodon running on this domain.
 * @see https://docs.joinmastodon.org/entities/instance/
 */
interface Instance {
    /** The domain name of the instance. */
    uri: string;
    /** The title of the website. */
    title: string;
    /** Admin-defined description of the Mastodon site. */
    description: string;
    /** A shorter description defined by the admin. */
    shortDescription: string;
    /** An email that may be contacted for any inquiries. */
    email: string;
    /** The version of Mastodon installed on the instance. */
    version: string;
    /** Primary languages of the website and its staff. */
    languages: string[];
    /** Whether registrations are enabled. */
    registrations: boolean;
    /** Whether registrations require moderator approval. */
    approvalRequired: boolean;
    /** URLs of interest for clients apps. */
    urls: InstanceURLs;
    /** Statistics about how much information the instance contains. */
    stats: InstanceStats;
    /** Whether invitation in enabled */
    invitesEnabled: boolean;
    /** List various values like file size limits and supported mime types */
    configuration: InstanceConfiguration;
    /** Banner image for the website. */
    thumbnail?: string | null;
    /** A user that can be contacted, as an alternative to `email`. */
    contactAccount?: Account$1 | null;
    rules?: InstanceRule[] | null;
}
interface InstanceURLs {
    /** WebSockets address for push streaming. String (URL). */
    streamingApi: string;
}
interface InstanceStats {
    /** Users registered on this instance. Number. */
    userCount: number;
    /** Statuses authored by users on instance. Number. */
    statusCount: number;
    /** Domains federated with this instance. Number. */
    domainCount: number;
}
interface InstanceRule {
    id: string;
    text: string;
}

/**
 * Represents a profile field as a name-value pair with optional verification.
 * @see https://docs.joinmastodon.org/entities/field/
 */
interface Field {
    /** The key of a given field's key-value pair. */
    name: string;
    /** The value associated with the `name` key. */
    value: string;
    /** Timestamp of when the server verified a URL value for a rel="me” link. */
    verifiedAt?: string | null;
}

interface Link extends Card {
    history: History[];
}

/**
 * Represents a list of some users that the authenticated user follows.
 * @see https://docs.joinmastodon.org/entities/list/
 */
interface List {
    /** The internal database ID of the list. */
    id: string;
    /** The user-defined title of the list. */
    title: string;
}

interface MarkerItem {
    /** The ID of the most recently viewed entity. */
    lastReadId: string;
    /** The timestamp of when the marker was set. */
    updatedAt: string;
    /** Used for locking to prevent write conflicts. */
    version: number;
}
declare type MarkerTimeline = 'home' | 'notifications';
/**
 * Represents the last read position within a user's timelines.
 * @see https://docs.joinmastodon.org/entities/marker/
 */
declare type Marker = {
    [key in MarkerTimeline]: MarkerItem;
};

/**
 * Represents a mention of a user within the content of a status.
 * @see https://docs.joinmastodon.org/entities/mention/
 */
interface Mention {
    /** The account id of the mentioned user. */
    id: string;
    /** The username of the mentioned user. */
    username: string;
    /** The location of the mentioned user's profile. */
    url: string;
    /**
     * The WebFinger acct: URI of the mentioned user.
     * Equivalent to username for local users, or `username@domain` for remote users.
     */
    acct: string;
}

declare type StatusVisibility = 'public' | 'unlisted' | 'private' | 'direct';
/**
 * Represents a status posted by an account.
 * @see https://docs.joinmastodon.org/entities/status/
 */
interface Status {
    /** ID of the status in the database. */
    id: string;
    /** URI of the status used for federation. */
    uri: string;
    /** The date when this status was created. */
    createdAt: string;
    /** The account that authored this status. */
    account: Account$1;
    /** HTML-encoded status content. */
    content: string;
    /** Visibility of this status. */
    visibility: StatusVisibility;
    /** Is this status marked as sensitive content? */
    sensitive: boolean;
    /** Subject or summary line, below which status content is collapsed until expanded. */
    spoilerText: string;
    /** Media that is attached to this status. */
    mediaAttachments: Attachment[];
    /** The application used to post this status. */
    application: Application;
    /** Mentions of users within the status content. */
    mentions: Mention[];
    /** Hashtags used within the status content. */
    tags: Tag[];
    /** Custom emoji to be used when rendering status content. */
    emojis: Emoji[];
    /** How many boosts this status has received. */
    reblogsCount: number;
    /** How many favourites this status has received. */
    favouritesCount: number;
    /** How many replies this status has received. */
    repliesCount: number;
    /** A link to the status's HTML representation. */
    url?: string | null;
    /** ID of the status being replied. */
    inReplyToId?: string | null;
    /** ID of the account being replied to. */
    inReplyToAccountId?: string | null;
    /** The status being reblogged. */
    reblog?: Status | null;
    /** The poll attached to the status. */
    poll?: Poll | null;
    /** Preview card for links included within status content. */
    card?: Card | null;
    /** Primary language of this status. */
    language?: string | null;
    /**
     * Plain-text source of a status. Returned instead of `content` when status is deleted,
     * so the user may redraft from the source text without the client having
     * to reverse-engineer the original text from the HTML content.
     */
    text?: string | null;
    /** Have you favourited this status? */
    favourited?: boolean | null;
    /** Have you boosted this status? */
    reblogged?: boolean | null;
    /** Have you muted notifications for this status's conversation? */
    muted?: boolean | null;
    /** Have you bookmarked this status? */
    bookmarked?: boolean | null;
    /** Have you pinned this status? Only appears if the status is pin-able. */
    pinned?: boolean | null;
}

declare type NotificationType = 'mention' | 'reblog' | 'favourite' | 'follow' | 'poll' | 'follow_request';
/**
 * Represents a notification of an event relevant to the user.
 * @see https://docs.joinmastodon.org/entities/notification
 */
interface Notification {
    /** The id of the notification in the database. */
    id: string;
    /** The type of event that resulted in the notification. */
    type: NotificationType;
    /** The timestamp of the notification. */
    createdAt: string;
    /** The account that performed the action that generated the notification. */
    account: Account$1;
    /** Status that was the object of the notification, e.g. in mentions, reblogs, favourites, or polls. */
    status?: Status | null;
}

interface PollOption {
    /** The text value of the poll option. String. */
    title: string;
    /** The number of received votes for this option. Number, or null if results are not published yet. */
    votesCount?: number;
    /** Custom emoji to be used for rendering poll options. */
    emojis: Emoji[];
}
/**
 * Represents a poll attached to a status.
 * @see https://docs.joinmastodon.org/entities/poll/
 */
interface Poll {
    /** The ID of the poll in the database. */
    id: string;
    /** When the poll ends. */
    expiresAt?: string | null;
    /** Is the poll currently expired? */
    expired: boolean;
    /** Does the poll allow multiple-choice answers? */
    multiple: boolean;
    /** How many votes have been received. */
    votesCount: number;
    /** How many unique accounts have voted on a multiple-choice poll. */
    votersCount?: number | null;
    /** When called with a user token, has the authorized user voted? */
    voted?: boolean;
    /**
     * When called with a user token, which options has the authorized user chosen?
     * Contains an array of index values for options.
     */
    ownVotes?: number[] | null;
    /** Possible answers for the poll. */
    options: PollOption[];
}

declare type PreferenceReadingExpandMedia = 'show_all' | 'hide_all' | 'default';
/**
 * Represents a user's preferences.
 * @see https://docs.joinmastodon.org/entities/preferences/
 */
interface Preference {
    /** Default visibility for new posts. Equivalent to Source#privacy. */
    'posting:default:visibility': StatusVisibility;
    /** Default sensitivity flag for new posts. Equivalent to Source#sensitive. */
    'posting:default:sensitive': boolean;
    /** Default language for new posts. Equivalent to Source#language */
    'posting:default:language': string;
    /** Whether media attachments should be automatically displayed or blurred/hidden. */
    'reading:expand:media': PreferenceReadingExpandMedia;
    /** Whether CWs should be expanded by default. */
    'reading:expand:spoilers': boolean;
}

/**
 * Represents a subscription to the push streaming server.
 * @see https://docs.joinmastodon.org/entities/push-subscription/
 */
interface PushSubscription {
    /** The id of the push subscription in the database. */
    id: string;
    /** Where push alerts will be sent to. */
    endpoint: string;
    /** The streaming server's VAPID key. */
    serverKey: string;
    /** Which alerts should be delivered to the `endpoint`. */
    alerts: PushSubscriptionAlerts;
}
interface PushSubscriptionAlerts {
    /** Receive a push notification when someone has followed you? Boolean. */
    follow: boolean;
    /** Receive a push notification when a status you created has been favourited by someone else? Boolean. */
    favourite: boolean;
    /** Receive a push notification when someone else has mentioned you in a status? Boolean. */
    reblog: boolean;
    /** Receive a push notification when a status you created has been boosted by someone else? Boolean. */
    mention: boolean;
    /** Receive a push notification when a poll you voted in or created has ended? Boolean. */
    poll: boolean;
}

interface Reaction {
    name: string;
    count: number;
    me: boolean;
    url: string;
    staticUrl: string;
}

/**
 * Represents the relationship between accounts, such as following / blocking / muting / etc.
 * @see https://docs.joinmastodon.org/entities/relationship/
 */
interface Relationship {
    /** The account id. */
    id: string;
    /** Are you following this user? */
    following: boolean;
    /** Do you have a pending follow request for this user? */
    requested: boolean;
    /** Are you featuring this user on your profile? */
    endorsed: boolean;
    /** Are you followed by this user? */
    followedBy: boolean;
    /** Are you muting this user? */
    muting: boolean;
    /** Are you muting notifications from this user? */
    mutingNotifications: boolean;
    /** Are you receiving this user's boosts in your home timeline? */
    showingReblogs: boolean;
    /** Are you blocking this user? */
    blocking: boolean;
    /** Are you blocking this user's domain? */
    domainBlocking: boolean;
    /** Is this user blocking you? */
    blockedBy: boolean;
    /** Personal note for this account */
    note?: string | null;
}

/**
 * Represents the results of a search.
 * @see https://docs.joinmastodon.org/entities/results/
 */
interface Results {
    /** Accounts which match the given query */
    accounts: Account$1[];
    /** Statuses which match the given query */
    statuses: Status[];
    /** Hashtags which match the given query */
    hashtags: Tag[];
}

interface StatusParams extends Pick<Status, 'id' | 'inReplyToId' | 'sensitive' | 'spoilerText' | 'visibility'> {
    /** Content of the status */
    text: string;
    /** IDs of media attachments */
    mediaIds?: string[] | null;
    /** ID of the application */
    applicationId: string;
}
/**
 * Represents a status that will be published at a future scheduled date.
 * @see https://docs.joinmastodon.org/entities/scheduledstatus/
 */
interface ScheduledStatus {
    /** ID of the scheduled status in the database. */
    id: string;
    /** ID of the status in the database. */
    scheduledAt: string;
    /** Parameters of the status */
    params: StatusParams;
    /** Media attachments */
    mediaAttachments: Attachment[];
}

/**
 * Represents display or publishing preferences of user's own account.
 * Returned as an additional entity when verifying and updated credentials, as an attribute of Account.
 * @see https://docs.joinmastodon.org/entities/source/
 */
interface Source {
    /** Profile bio. */
    note: string;
    /** Metadata about the account. */
    fields: Field;
    /** The default post privacy to be used for new statuses. */
    privacy?: StatusVisibility | null;
    /** Whether new statuses should be marked sensitive by default. */
    sensitive?: boolean | null;
    /** The default posting language for new statuses. */
    language: string | null;
    /** The number of pending follow requests. */
    followRequestsCount?: number | null;
}

declare type StatusEdit = Pick<Status, 'content' | 'spoilerText' | 'sensitive' | 'createdAt' | 'account' | 'mediaAttachments' | 'emojis'>;

interface StatusSource {
    id: string;
    text: string;
    spoilerText: string;
}

/**
 * Represents a hashtag used within the content of a status.
 * @see https://docs.joinmastodon.org/entities/tag/
 */
interface Tag {
    /** The value of the hashtag after the # sign. */
    name: string;
    /** A link to the hashtag on the instance. */
    url: string;
    /** Usage statistics for given days. */
    history?: History[] | null;
}

declare const enum ScopeVerb {
    Read = "read",
    Write = "write",
    Push = "push"
}
declare const enum ScopeDomain {
    Accounts = "accounts",
    Blocks = "blocks",
    Bookmarks = "bookmarks",
    Conversations = "conversations",
    Favourites = "favourites",
    Filters = "filters",
    Follows = "follows",
    Lists = "lists",
    Media = "media",
    Mutes = "mutes",
    Notifications = "notifications",
    Reports = "reports",
    Search = "search",
    Statuses = "statuses"
}
declare type Scope = `${'' | 'admin:'}${ScopeVerb}:${ScopeDomain}`;
/**
 * Represents an OAuth token used for authenticating with the API and performing actions.
 * @see https://docs.joinmastodon.org/entities/token/
 */
interface Token {
    /** An OAuth token to be used for authorization. */
    accessToken: string;
    /** The OAuth token type. Mastodon uses Bearer tokens. */
    tokenType: string;
    /** The OAuth scopes granted by this token, space-separated. */
    scope: Scope;
    /** When the token was generated. */
    createdAt: string;
}

declare class Paginator<Params, Result> implements AsyncIterableIterator<Result> {
    private readonly http;
    readonly initialUrl: string;
    readonly initialParams?: Params | undefined;
    private nextUrl?;
    private nextParams?;
    constructor(http: Http, initialUrl: string, initialParams?: Params | undefined);
    private pluckNext;
    next(params?: Params): Promise<IteratorResult<Result>>;
    return<T, U>(value: U | Promise<U>): Promise<IteratorResult<T, U>>;
    throw<T, U>(e: unknown): Promise<IteratorResult<T, U>>;
    [Symbol.asyncIterator](): AsyncGenerator<Result, Result, Params | undefined>;
}

interface DefaultPaginationParams {
    /** **Internal parameter.** Use HTTP Link header from response for pagination. */
    readonly maxId?: string | null;
    /** **Internal parameter.** Use HTTP Link header from response for pagination. */
    readonly sinceId?: string | null;
    /** Get a list of items with ID greater than this value excluding this ID */
    readonly minId?: string | null;
    /** Maximum number of results to return per page. Defaults to 40. NOTE: Pagination is done with the Link header from the response. */
    readonly limit?: number | null;
}
interface Repository<Entity, CreateParams = never, UpdateParams = never, FetchParams = never, PaginationParams = DefaultPaginationParams> {
    readonly [Symbol.asyncIterator]?: () => AsyncIterableIterator<Entity[]>;
    readonly getIterator?: (params?: PaginationParams) => AsyncIterableIterator<Entity[]>;
    readonly fetch?: ((id: string) => Promise<Entity>) | ((params?: FetchParams) => Promise<Entity>);
    readonly fetchMany?: (params?: PaginationParams) => Promise<IteratorResult<Entity[]>>;
    readonly fetchAll?: (params?: FetchParams) => Promise<Entity[]>;
    readonly create?: (params: CreateParams) => Promise<Entity>;
    readonly update?: ((id: string, params: UpdateParams) => Promise<Entity>) | ((params: UpdateParams) => Promise<Entity>);
    readonly delete?: (id: string) => Promise<void>;
}

interface CreateAccountParams {
    /** The desired username for the account */
    readonly username: string;
    /** The password to be used for login */
    readonly password: string;
    /** The email address to be used for login */
    readonly email: string;
    /** Whether the user agrees to the local rules, terms, and policies. These should be presented to the user in order to allow them to consent before setting this parameter to TRUE. */
    readonly agreement: boolean;
    /** The language of the confirmation email that will be sent */
    readonly locale: string;
    /** Text that will be reviewed by moderators if registrations require manual approval. */
    readonly reason?: string;
}
interface UpdateCredentialsParams {
    /** Whether the account should be shown in the profile directory. */
    readonly discoverable?: boolean;
    /** Whether the account has a bot flag. */
    readonly bot?: boolean;
    /** The display name to use for the profile. */
    readonly displayName?: string | null;
    /** The account bio. */
    readonly note?: string | null;
    /** Avatar image encoded using multipart/form-data */
    readonly avatar?: unknown;
    /** Header image encoded using multipart/form-data */
    readonly header?: unknown;
    /** Whether manual approval of follow requests is required. */
    readonly locked?: boolean | null;
    readonly source?: Partial<Pick<Source, 'privacy' | 'sensitive' | 'language'>> | null;
    /**
     * Profile metadata `name` and `value`.
     * (By default, max 4 fields and 255 characters per property/value)
     */
    readonly fieldsAttributes?: Field[] | null;
}
interface MuteAccountParams {
    /** Mute notifications in addition to statuses? Defaults to true. */
    readonly notifications?: boolean;
}
interface CreateAccountNoteParams {
    readonly comment: string;
}
interface FetchAccountStatusesParams extends DefaultPaginationParams {
    /** Only return statuses that have media attachments */
    readonly onlyMedia?: boolean | null;
    /** Only return statuses that have been pinned */
    readonly pinned?: boolean | null;
    /** Skip statuses that reply to other statuses */
    readonly excludeReplies?: boolean | null;
}
interface FollowAccountParams {
    /** Whether the followed account’s reblogs will show up in the home timeline */
    readonly reblogs?: boolean | null;
}
interface SearchAccountsParams {
    /** What to search for */
    readonly q: string;
    /** Maximum number of results. Defaults to 40. */
    readonly limit?: number | null;
    /** Attempt WebFinger lookup. Defaults to false. Use this when `q` is an exact address. */
    readonly resolve?: boolean | null;
    /** Only who the user is following. Defaults to false. */
    readonly following?: boolean | null;
}
interface LookupAccountParams {
    readonly acct: string;
}
declare class AccountRepository$1 implements Repository<Account$1, CreateAccountParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    getFollowersIterable(id: string, params: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
    getFollowingIterable(id: string, params: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
    getStatusesIterable(id: string, params: FetchAccountStatusesParams): Paginator<FetchAccountStatusesParams, Status[]>;
    /**
     * View information about a profile.
     * @param id The id of the account in the database
     * @return Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    fetch(id: string): Promise<Account$1>;
    /**
     * Creates a user and account records. Returns an account access token
     * for the app that initiated the request. The app should save this token for later,
     * and should wait for the user to confirm their account by clicking a link in their email inbox.
     * @param params Parameters
     * @return Token
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    create(params: CreateAccountParams): Promise<Account$1>;
    /**
     * Test to make sure that the user token works.
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    verifyCredentials(): Promise<AccountCredentials>;
    /**
     *  Update the user's display and preferences.
     * @param params Parameters
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    updateCredentials(params?: UpdateCredentialsParams): Promise<AccountCredentials>;
    /**
     * Accounts which follow the given account, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    fetchFollowers(id: string, params?: DefaultPaginationParams): Promise<IteratorResult<Account$1[]>>;
    /**
     * Accounts which the given account is following, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    fetchFollowing(id: string, params?: DefaultPaginationParams): Promise<IteratorResult<Account$1[]>>;
    /**
     * Statuses posted to the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    fetchStatuses(id: string, params?: DefaultPaginationParams): Promise<IteratorResult<Status[]>>;
    /**
     * Follow the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    follow(id: string, params?: FollowAccountParams): Promise<Relationship>;
    /**
     * Unfollow the given account
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    unfollow(id: string, params?: FollowAccountParams): Promise<Relationship>;
    /**
     * Find out whether a given account is followed, blocked, muted, etc.
     * @param id Array of account IDs to check
     * @return Array of Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    fetchRelationships(id: string[]): Promise<Relationship[]>;
    /**
     * Search for matching accounts by username or display name.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    search(params?: SearchAccountsParams): Promise<Account$1[]>;
    /**
     * Block the given account. Clients should filter statuses from this account if received (e.g. due to a boost in the Home timeline)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    block(id: string): Promise<Relationship>;
    /**
     * Unblock the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    unblock(id: string): Promise<Relationship>;
    /**
     * Add the given account to the user's featured profiles. (Featured profiles are currently shown on the user's own public profile.)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    pin(id: string): Promise<Relationship>;
    /**
     * Remove the given account from the user's featured profiles.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    unpin(id: string): Promise<Relationship>;
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    fetchLists(id: string): Promise<List[]>;
    /**
     * Mute the given account. Clients should filter statuses and notifications from this account, if received (e.g. due to a boost in the Home timeline).
     * @param id The id of the account in the database
     * @param params Parameter
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    mute(id: string, params?: MuteAccountParams): Promise<Relationship>;
    /**
     * Unmute the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    unmute(id: string): Promise<Relationship>;
    /**
     * Add personal note to the account
     * @param id ID of the account
     * @param param Parameters
     * @return Relationship
     */
    createNote(id: string, params: CreateAccountNoteParams): Promise<Relationship>;
    /**
     * Get featured tag of the account
     * @param id ID of the account
     * @return FeaturedTags
     */
    fetchFeaturedTags(id: string): Promise<FeaturedTag>;
    /**
     * Identity proofs
     * @param id The id of the account in the database
     * @return Array of IdentityProof
     * @see https://github.com/tootsuite/mastodon/pull/10297
     */
    fetchIdentityProofs(id: string): Promise<IdentityProof>;
    /**
     * This method allows to quickly convert a username of a known account to an ID that can be used with the REST API, or to check if a username is available for sign-up
     * @param params Parameters
     * @return Account
     */
    lookup(params: LookupAccountParams): Promise<Account$1>;
    /**
     * TODO: stub
     * @returns Accounts
     */
    fetchFamiliarFollowers(): Promise<Account$1[]>;
    /**
     * @param id ID of the account
     * @returns N/A
     */
    removeFromFollowers(id: string): Promise<void>;
}

/** Map of event name and callback argument */
interface EventTypeMap {
    /** Status posted */
    update: [Status];
    /** Status deleted */
    delete: [Status['id']];
    /** User's notification */
    notification: [Notification];
    /** User's filter changed */
    filters_changed: [];
    /** Status added to a conversation */
    conversation: [Conversation];
    /** Status updated */
    'status.update': [Status];
    /** for RxJS' `fromEvent` compatibility */
    [K: string]: unknown[];
}
/** Supported event names */
declare type EventType = keyof EventTypeMap;
/** Mastodon event */
interface Event {
    event: EventType;
    payload: string;
}
interface WsEvents extends Omit<EventEmitter<EventTypeMap>, 'on'> {
    readonly disconnect: () => void;
    readonly on: <T extends EventType>(name: T, cb: (...data: EventTypeMap[T]) => void) => void;
}
interface Ws {
    stream(path: string, params: unknown): Promise<WsEvents>;
}

declare abstract class BaseWs implements Ws {
    protected abstract readonly baseUrl: string;
    protected abstract readonly config: MastoConfig;
    protected abstract readonly version: string;
    protected abstract readonly serializer: Serializer;
    abstract stream(path: string, params: unknown): Promise<WsEvents>;
    private supportsSecureToken;
    resolveUrl(path: string, params?: Record<string, unknown>): string;
    createProtocols(protocols?: never[]): string[];
}

/**
 * Mastodon streaming api wrapper
 */
declare class WsEventsNodejsImpl extends EventEmitter<EventTypeMap> implements WsEvents {
    private readonly ws;
    private readonly serializer;
    constructor(ws: WebSocket$1, serializer: Serializer);
    /**
     * Connect to the websocket endpoint
     * @param url URL of the websocket endpoint
     * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
     * @param params URL parameters
     */
    static connect(url: string, serializer: Serializer, protocols?: string | string[]): Promise<WsEvents>;
    /**
     * Disconnect from the websocket endpoint
     */
    disconnect(): void;
    /**
     * Parse JSON data and emit it as an event
     * @param message Websocket message
     */
    private handleMessage;
}
declare class WsNodejsImpl extends BaseWs implements Ws {
    protected readonly baseUrl: string;
    protected readonly version: string;
    protected readonly config: MastoConfig;
    protected readonly serializer: Serializer;
    constructor(baseUrl: string, version: string, config: MastoConfig, serializer: Serializer);
    stream(path: string, params?: Record<string, unknown>): Promise<WsEvents>;
}

/**
 * Mastodon streaming api wrapper
 */
declare class WsEventsNativeImpl extends EventEmitter<EventTypeMap> implements WsEvents {
    private readonly ws;
    private readonly serializer;
    constructor(ws: WebSocket, serializer: Serializer);
    /**
     * Connect to the websocket endpoint
     * @param url URL of the websocket endpoint
     * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
     * @param params URL parameters
     */
    static connect(url: string, serializer: Serializer, protocols?: string | string[]): Promise<WsEvents>;
    /**
     * Disconnect from the websocket endpoint
     */
    disconnect(): void;
    /**
     * Parse JSON data and emit it as an event
     * @param message Websocket message
     */
    private handleMessage;
}
declare class WsNativeImpl extends BaseWs implements Ws {
    protected readonly baseUrl: string;
    protected readonly version: string;
    protected readonly config: MastoConfig;
    protected readonly serializer: Serializer;
    constructor(baseUrl: string, version: string, config: MastoConfig, serializer: Serializer);
    stream(path: string, params?: Record<string, unknown>): Promise<WsEvents>;
}

declare class StreamRepository {
    private readonly ws;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(ws: Ws, version: string, config: MastoConfig);
    /**
     * Starting home timeline and notification streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamUser(): Promise<WsEvents>;
    /**
     * Starting federated timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamPublicTimeline(): Promise<WsEvents>;
    /**
     * Starting local timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamCommunityTimeline(): Promise<WsEvents>;
    /**
     * Stream remote public timeline
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamRemotePublicTimeline(): Promise<WsEvents>;
    /**
     * Starting tag timeline streaming
     * @param id ID of the tag
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamTagTimeline(id: string): Promise<WsEvents>;
    /**
     * Starting local tag timeline streaming
     * @param id ID of the tag
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamLocalTagTimeline(id: string): Promise<WsEvents>;
    /**
     * Starting list timeline streaming
     * @param id ID of the list
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamListTimeline(id: string): Promise<WsEvents>;
    /**
     * Starting direct timeline streaming
     * @return Instance of EventEmitter
     * @see https://docs.joinmastodon.org/methods/timelines/streaming/
     */
    streamDirectTimeline(): Promise<WsEvents>;
}

declare class AnnouncementRepository implements Repository<Announcement> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Fetch announcements
     * @return Announcements
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    fetchAll(): Promise<Announcement[]>;
    /**
     * Dismiss announcement
     * @param id ID of the announcement
     * @return Nothing
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    dismiss(id: string): Promise<void>;
    /**
     * Add a reaction to an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    addReaction(id: string, name: string): Promise<void>;
    /**
     * Remove a reaction from an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    removeReaction(id: string, name: string): Promise<void>;
}

interface CreateAppParams {
    /** A name of your application */
    readonly clientName: string;
    /**
     * Where the user should be redirected after authorization.
     * To display the authorization code to the user instead of redirecting to a web page,
     * use `urn:ietf:wg:oauth:2.0:oob` in this parameter.
     */
    readonly redirectUris: string;
    /** Space separated list of scopes. If none is provided, defaults to `read`. */
    readonly scopes: string;
    /** URL to the homepage of your app */
    readonly website?: string | null;
}
declare class AppRepository implements Repository<Client, CreateAppParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Create a new application to obtain OAuth2 credentials.
     * @param params Parameters
     * @return Returns App with `client_id` and `client_secret`
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    create(params: CreateAppParams): Promise<Client>;
    /**
     * Confirm that the app's OAuth2 credentials work.
     * @return Application
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    verifyCredentials(): Promise<Client>;
}

declare abstract class IterableRepository<T = never, C = never, U = never, R = never, RMany = DefaultPaginationParams> implements Repository<T, C, U, R, RMany> {
    abstract getIterator(params?: RMany): AsyncIterableIterator<T[]>;
    fetchMany(params?: RMany): Promise<IteratorResult<T[]>>;
    [Symbol.asyncIterator](): AsyncIterableIterator<T[]>;
}

declare class BlockRepository extends IterableRepository<Account$1> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Blocked users
     * @param params Array of Account
     * @return Query parameter
     * @see https://docs.joinmastodon.org/methods/accounts/blocks/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
}

declare class BookmarkRepository extends IterableRepository<Status> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Statuses the user has bookmarked.
     * @param params Parameters
     * @return Array of Statuses
     * @see https://docs.joinmastodon.org/methods/accounts/bookmarks/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Status[]>;
}

declare class ConversationRepository extends IterableRepository<Conversation> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Show conversation
     * @param params Parameters
     * @return Array of Conversation
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Conversation[]>;
    /**
     * Remove conversation
     * @param id ID of the conversation in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    remove(id: string): Promise<void>;
    /**
     * Mark as read
     * @param id ID of the conversation in the database
     * @return Conversation
     * @see https://docs.joinmastodon.org/methods/timelines/conversations/
     */
    read(id: string): Promise<Conversation>;
}

declare class CustomEmojiRepository implements Repository<Emoji> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Returns custom emojis that are available on the server.
     * @return Array of Emoji
     * @see https://docs.joinmastodon.org/methods/instance/custom_emojis/
     */
    fetchAll(): Promise<Emoji[]>;
}

declare type DirectoryOrderType = 'active' | 'new';
interface FetchDirectoryParams {
    /** How many accounts to load. Default 40. */
    readonly limit?: number | null;
    /** How many accounts to skip before returning results. Default 0. */
    readonly offset?: number | null;
    /** `active` to sort by most recently posted statuses (default) or `new` to sort by most recently created profiles. */
    readonly order?: DirectoryOrderType | null;
    /** Only return local accounts. */
    readonly local?: boolean | null;
}
declare class DirectoryRepository implements Repository<Account$1, never, never, FetchDirectoryParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * List accounts visible in the directory.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/instance/directory/
     */
    fetchAll(params?: FetchDirectoryParams): Promise<Account$1[]>;
}

declare class DomainBlockRepository extends IterableRepository<string> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View domains the user has blocked.
     * @param params Parameters
     * @return Array of strings
     * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, string[]>;
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
    block(domain: string): Promise<void>;
    /**
     * Remove a domain block, if it exists in the user's array of blocked domains.
     * @param domain Domain to unblock
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/domain_blocks/
     */
    unblock(domain: string): Promise<void>;
}

declare class EndorsementRepository extends IterableRepository<Account$1> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Accounts that the user is currently featuring on their profile.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/endorsements/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
}

declare class FavouriteRepository extends IterableRepository<Status> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Statuses the user has favourited.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/accounts/favourites/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Status[]>;
}

interface CreateFeaturedTagParams {
    /** The hashtag to be featured. */
    readonly name: string;
}
declare class FeaturedTagRepository implements Repository<FeaturedTag> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View your featured tags
     * @return Array of FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     * @done
     */
    fetchAll(): Promise<FeaturedTag[]>;
    /**
     * Feature a tag
     * @param params Parameters
     * @return FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    create(params: CreateFeaturedTagParams): Promise<FeaturedTag>;
    /**
     * Shows your 10 most-used tags, with usage history for the past week.
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    fetchSuggestions(): Promise<Tag[]>;
    /**
     * Un-feature a tag
     * @param id The id of the FeaturedTag to be un-featured
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    remove(id: string): Promise<void>;
}

interface CreateFilterParams {
    /** Text to be filtered */
    readonly phrase: string;
    /**
     * Array of enumerable strings `home`, `notifications`, `public`, `thread`.
     * At least one context must be specified.
     */
    readonly context: FilterContext[] | null;
    /** Should the server irreversibly drop matching entities from home and notifications? */
    readonly irreversible?: boolean | null;
    /** Consider word boundaries? */
    readonly wholeWord?: boolean | null;
    /** ISO 8601 Date-time for when the filter expires. Otherwise, null for a filter that doesn't expire. */
    readonly expiresIn?: number | null;
}
declare type UpdateFilterParams = CreateFilterParams;
declare class FilterRepository implements Repository<Filter, CreateFilterParams, UpdateFilterParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View all filters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    fetchAll(): Promise<Filter[]>;
    /**
     * View a single filter
     * @param id ID of the filter
     * @return Returns Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    fetch(id: string): Promise<Filter>;
    /**
     * Create a filter
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    create(params?: CreateFilterParams): Promise<Filter>;
    /**
     * Update a filter
     * @param id ID of the filter in the database
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    update(id: string, params?: UpdateFilterParams): Promise<Filter>;
    /**
     * Remove a filter
     * @param id ID of the filter in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    remove(id: string): Promise<void>;
}

declare class FollowRequestRepository extends IterableRepository<Account$1> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Pending Follows
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
    /**
     * Accept Follow
     * @param id ID of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    authorize(id: string): Promise<Relationship>;
    /**
     * Reject Follow
     * @param id ID of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/follow_requests/
     */
    reject(id: string): Promise<Relationship>;
}

declare class InstanceRepository implements Repository<Instance> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Information about the server.
     * @return Instance
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    fetch(): Promise<Instance>;
    /**
     * Domains that this instance is aware of.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    fetchPeers(): Promise<string[]>;
    /**
     * Instance activity over the last 3 months, binned weekly.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    fetchActivity(): Promise<Activity[]>;
}

interface ModifyListParams {
    /** The title of the list to be created. */
    readonly title: string;
}
interface ModifyListAccountsParams {
    /** Array of account IDs */
    readonly accountIds: string[];
}
declare class ListRepository implements Repository<List, ModifyListParams, ModifyListParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    getAccountIterator(id: string, params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    fetch(id: string): Promise<List>;
    /**
     * Fetch all lists that the user owns.
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    fetchAll(): Promise<List[]>;
    /**
     * Create a new list.
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    create(params: ModifyListParams): Promise<List>;
    /**
     * Change the title of a list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    update(id: string, params: ModifyListParams): Promise<List>;
    /**
     * Delete a list
     * @param id ID of the list in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    remove(id: string): Promise<void>;
    /**
     * View accounts in list
     * @param id ID of the list in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    fetchAccounts(id: string, params?: DefaultPaginationParams): Promise<IteratorResult<Account$1[]>>;
    /**
     * Add accounts to the given list. Note that the user must be following these accounts.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    addAccount(id: string, params: ModifyListAccountsParams): Promise<void>;
    /**
     * Remove accounts from the given list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    removeAccount(id: string, params: ModifyListAccountsParams): Promise<void>;
}

interface FetchMarkersParams {
    /**
     * Array of markers to fetch.
     * String enum anyOf `home`, `notifications`.
     * If not provided, an empty object will be returned.
     */
    readonly timeline?: readonly MarkerTimeline[];
}
declare type CreateMarkersParams = {
    readonly /** ID of the last status read in the timeline. */ [key in MarkerTimeline]: Pick<MarkerItem, 'lastReadId'>;
};
declare class MarkerRepository implements Repository<Marker, CreateMarkersParams, never, FetchMarkersParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Get saved timeline position
     * @param params Parameters
     * @return Markers
     * @see https://docs.joinmastodon.org/methods/timelines/markers/
     */
    fetch(params?: FetchMarkersParams): Promise<Marker>;
    /**
     * Save position in timeline
     * @param params Parameters
     * @return Markers
     * @see https://github.com/tootsuite/mastodon/pull/11762
     */
    create(params: CreateMarkersParams): Promise<Marker>;
}

interface CreateMediaAttachmentParams {
    /** The file to be attached, using multipart form data. */
    readonly file: unknown;
    /** A plain-text description of the media, for accessibility purposes. */
    readonly description?: string | null;
    /** Two floating points (x,y), comma-delimited, ranging from -1.0 to 1.0 */
    readonly focus?: string | null;
    /** Custom thumbnail */
    readonly thumbnail?: unknown | null;
    /** Wait resolving promise for the media to be uploaded. Defaults to `false` */
    readonly skipPolling?: boolean;
}
declare type UpdateMediaAttachmentParams = Partial<CreateMediaAttachmentParams>;
declare class MediaAttachmentRepository implements Repository<Attachment, CreateMediaAttachmentParams, UpdateMediaAttachmentParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * @experimental
     * @param id ID of the media
     * @param interval interval of polling
     * @returns Media attachment that has done processing
     */
    waitFor(id: string, interval?: number): Promise<Attachment>;
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    create({ skipPolling, ...params }: CreateMediaAttachmentParams): Promise<Attachment>;
    /**
     * Fetches an attachment to be used with a new status.
     * @param id ID of the attachment
     * @see https://github.com/tootsuite/mastodon/pull/13210
     */
    fetch(id: string): Promise<Attachment>;
    /**
     * Update an Attachment, before it is attached to a status and posted.
     * @param id The id of the Attachment entity to be updated
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    update(id: string, { skipPolling, ...params }: UpdateMediaAttachmentParams): Promise<Attachment>;
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    v1__create(params: CreateMediaAttachmentParams): Promise<Attachment>;
}

declare class MuteRepository extends IterableRepository<Account$1> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Accounts the user has muted.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/mutes/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
}

interface FetchNotificationsParams extends DefaultPaginationParams {
    /** Instead of specifying every known type to exclude, you can specify only the types you want. */
    readonly types?: NotificationType[] | null;
    /** ID of the account */
    readonly accountId?: string | null;
    /** Array of notifications to exclude (Allowed values: "follow", "favourite", "reblog", "mention") */
    readonly excludeTypes?: NotificationType[] | null;
}
declare class NotificationsRepository extends IterableRepository<Notification> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Notifications concerning the user.
     * This API returns Link headers containing links to the next/previous page.
     * However, the links can also be constructed dynamically using query params and `id` values.
     * @param params Query parameter
     * @return Array of Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    getIterator(params?: FetchNotificationsParams): Paginator<FetchNotificationsParams, Notification[]>;
    /**
     * View information about a notification with a given ID.
     * @param id ID of the notification in the database.
     * @return Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    fetch(id: string): Promise<Notification>;
    /**
     * Clear all notifications from the server.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    clear(): Promise<void>;
    /**
     * Clear a single notification from the server.
     * @param id ID of the notification to be cleared
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    dismiss(id: string): Promise<void>;
}

interface VotePollParams {
    /** Array of own votes containing index for each option (starting from 0) */
    readonly choices: string[];
}
declare class PollRepository implements Repository<Poll> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View a poll
     * @param id ID of the poll in the database
     * @return Poll
     * @see https://docs.joinmastodon.org/methods/statuses/polls/
     */
    fetch(id: string): Promise<Poll>;
    /**
     * Vote on a poll
     * @param id ID of the poll in the database
     * @param params Parameters
     * @return Poll
     * @see https://docs.joinmastodon.org/methods/statuses/polls/
     */
    vote(id: string, params: VotePollParams): Promise<Poll>;
}

declare class PreferenceRepository implements Repository<Preference> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Preferences defined by the user in their account settings.
     * @return Preferences by key and value
     * @see https://docs.joinmastodon.org/methods/accounts/preferences/
     */
    fetch(): Promise<Preference>;
}

declare type SubscriptionPolicy = 'all' | 'followed' | 'follower' | 'none';
interface CreatePushSubscriptionParams {
    readonly subscription: {
        /** Endpoint URL that is called when a notification event occurs. */
        readonly endpoint: string;
        readonly keys: {
            /** User agent public key. Base64 encoded string of public key of ECDH key using `prime256v1` curve. */
            readonly p256dh: string;
            /** Auth secret. Base64 encoded string of 16 bytes of random data. */
            readonly auth: string;
        };
    };
    readonly data?: {
        readonly alerts?: Partial<PushSubscriptionAlerts> | null;
        readonly policy?: SubscriptionPolicy;
    } | null;
}
declare type UpdatePushSubscriptionParams = Pick<CreatePushSubscriptionParams, 'data'>;
declare class PushSubscriptionsRepository implements Repository<PushSubscription, CreatePushSubscriptionParams, UpdatePushSubscriptionParams> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * Add a Web Push API subscription to receive notifications.
     * Each access token can have one push subscription.
     * If you create a new subscription, the old subscription is deleted.
     * @param params Parameters
     * @return Returns Push Subscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    create(params: CreatePushSubscriptionParams): Promise<PushSubscription>;
    /**
     * View the PushSubscription currently associated with this access token.
     * @return PushSubscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    fetch(): Promise<PushSubscription>;
    /**
     * Updates the current push subscription. Only the data part can be updated. To change fundamentals, a new subscription must be created instead.
     * @param params Parameters
     * @return PushSubscription
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    update(params: UpdatePushSubscriptionParams): Promise<PushSubscription>;
    /**
     * Removes the current Web Push API subscription.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/push/
     */
    remove(): Promise<void>;
}

declare type ReportCategory = 'spam' | 'violation' | 'other';
interface ReportAccountParams {
    /** ID of the account to report */
    readonly accountId: string;
    /** Array of Statuses to attach to the report, for context */
    readonly statusIds?: string[] | null;
    /** Reason for the report (default max 1000 characters) */
    readonly comment?: string | null;
    /** If the account is remote, should the report be forwarded to the remote admin? */
    readonly forward?: boolean | null;
    /** category can be one of: spam, violation, other (default) */
    readonly category?: ReportCategory | null;
    /** must reference rules returned in GET /api/v1/instance */
    readonly ruleIds?: string[] | null;
}
declare class ReportRepository$1 {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * File a report
     * @param params Parameters
     * @return Report
     * @see https://docs.joinmastodon.org/methods/accounts/reports/
     */
    create(params: ReportAccountParams): Promise<void>;
}

interface UpdateScheduledStatusParams {
    /** ISO 8601 Date-time at which the status will be published. Must be at least 5 minutes into the future. */
    readonly scheduledAt: string;
}
declare class ScheduledStatusesRepository extends IterableRepository<ScheduledStatus> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View scheduled statuses
     * @param params Parameters
     * @return Array of ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, ScheduledStatus[]>;
    /**
     * View a single scheduled status
     * @param id ID of the scheduled status in the database.
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    fetch(id: string): Promise<ScheduledStatus>;
    /**
     * Update Scheduled status
     * @param id ID of the Status to be scheduled
     * @param params Parameters
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/api/rest/scheduled-statuses/#put-api-v1-scheduled-statuses-id
     */
    update(id: string, params: UpdateScheduledStatusParams): Promise<ScheduledStatus>;
    /**
     * Cancel a scheduled status
     * @param id ID of the scheduled status in the database.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    remove(id: string): Promise<void>;
}

interface CreateStatusParamsBase {
    /** ID of the status being replied to, if status is a reply */
    readonly inReplyToId?: string | null;
    /** Mark status and attached media as sensitive? */
    readonly sensitive?: boolean | null;
    /** Text to be shown as a warning or subject before the actual content. Statuses are generally collapsed behind this field. */
    readonly spoilerText?: string | null;
    /** Visibility of the posted status. Enumerable oneOf public, unlisted, private, direct. */
    readonly visibility?: StatusVisibility | null;
    /** ISO 8601 Date-time at which to schedule a status. Providing this parameter will cause ScheduledStatus to be returned instead of Status. Must be at least 5 minutes in the future. */
    readonly scheduledAt?: string | null;
    /** ISO 639 language code for this status. */
    readonly language?: string | null;
}
interface CreateStatusPollParam {
    /** Array of possible answers. If provided, `media_ids` cannot be used, and `poll[expires_in]` must be provided. */
    readonly options: string[];
    /** Duration the poll should be open, in seconds. If provided, media_ids cannot be used, and poll[options] must be provided. */
    readonly expiresIn: number;
    /** Allow multiple choices? */
    readonly multiple?: boolean | null;
    /** Hide vote counts until the poll ends? */
    readonly hideTotals?: boolean | null;
}
interface CreateStatusParamsWithStatus extends CreateStatusParamsBase {
    /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
    readonly status: string;
    /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
    readonly mediaIds?: never;
    readonly poll?: CreateStatusPollParam | null;
}
interface CreateStatusParamsWithMediaIds extends CreateStatusParamsBase {
    /** Array of Attachment ids to be attached as media. If provided, `status` becomes optional, and `poll` cannot be used. */
    readonly mediaIds: readonly string[];
    /** Text content of the status. If `media_ids` is provided, this becomes optional. Attaching a `poll` is optional while `status` is provided. */
    readonly status?: string | null;
    readonly poll?: never;
}
declare type CreateStatusParams = CreateStatusParamsWithStatus | CreateStatusParamsWithMediaIds;
declare type UpdateStatusParams = CreateStatusParams;
interface ReblogStatusParams {
    /** any visibility except limited or direct (i.e. public, unlisted, private). Defaults to public. Currently unused in UI. */
    readonly visibility: StatusVisibility;
}
declare class StatusRepository implements Repository<Status> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View information about a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    fetch(id: string): Promise<Status>;
    /**
     * Post a new status.
     * @param params Parameters
     * @param idempotencyKey Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    create(params: CreateStatusParams, idempotencyKey?: string): Promise<Status>;
    /**
     * Update a status
     * @param params Parameters
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    update(id: string, params: UpdateStatusParams): Promise<Status>;
    /**
     * Delete one of your own statuses.
     * @param id Local ID of a status in the database. Must be owned by authenticated account.
     * @return Status with source text and `media_attachments` or `poll`
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    remove(id: string): Promise<Status>;
    /**
     * View statuses above and below this status in the thread.
     * @param id Local ID of a status in the database.
     * @return Context
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    fetchContext(id: string): Promise<Context>;
    /**
     * Preview card
     * @deprecated Use `card` attribute of status instead
     * @param id ID of the status in the database
     * @return Card
     * @see https://docs.joinmastodon.org/api/rest/statuses/#get-api-v1-statuses-id-card
     */
    fetchCard(id: string): Promise<Card>;
    /**
     * Add a status to your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    favourite(id: string): Promise<Status>;
    /**
     * Remove a status from your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    unfavourite(id: string): Promise<Status>;
    /**
     * Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    mute(id: string): Promise<Status>;
    /**
     * Start receiving notifications again for the thread that this status is part of.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    unmute(id: string): Promise<Status>;
    /**
     * View who boosted a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    fetchRebloggedBy(id: string): Promise<Account$1[]>;
    /**
     * View who favourited a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    fetchFavouritedBy(id: string): Promise<Account$1[]>;
    /**
     * Re-share a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses-id-reblog
     */
    reblog(id: string, params?: ReblogStatusParams): Promise<Status>;
    /**
     * Undo a re-share of a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    unreblog(id: string): Promise<Status>;
    /**
     * Feature one of your own public statuses at the top of your profile.
     * @param id Local ID of a status in the database. The status should be public and authored by the authorized account.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    pin(id: string): Promise<Status>;
    /**
     * Un-feature a status from the top of your profile.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    unpin(id: string): Promise<Status>;
    /**
     * Privately bookmark a status.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    bookmark(id: string): Promise<Status>;
    /**
     * Remove a status from your private bookmarks.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    unbookmark(id: string): Promise<Status>;
    fetchHistory(id: string): Promise<StatusEdit[]>;
    fetchSource(id: string): Promise<StatusSource>;
}

declare class SuggestionRepository extends IterableRepository<Account$1> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    getIterator(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Account$1[]>;
    /**
     * Remove an account from follow suggestions.
     * @param id id of the account in the database to be removed from suggestions
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/suggestions/
     */
    remove(id: string): Promise<void>;
}

interface FetchTimelineParams extends DefaultPaginationParams {
    /** Show only local statuses? Defaults to false. */
    readonly local?: boolean | null;
    /** Show only statuses with media attached? Defaults to false. */
    readonly onlyMedia?: boolean | null;
    /** Remote only */
    readonly remote?: boolean | null;
}
declare class TimelinesRepository {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    get home(): Paginator<FetchTimelineParams, Status[]>;
    get public(): Paginator<FetchTimelineParams, Status[]>;
    getHomeIterable(params?: FetchTimelineParams): Paginator<FetchTimelineParams, Status[]>;
    getPublicIterable(params?: FetchTimelineParams): Paginator<FetchTimelineParams, Status[]>;
    getHashtagIterable(hashtag: string, params?: FetchTimelineParams): Paginator<FetchTimelineParams, Status[]>;
    getListIterable(id: string, params?: FetchTimelineParams): Paginator<FetchTimelineParams, Status[]>;
    getDirectIterable(params?: FetchTimelineParams): Paginator<FetchTimelineParams, Status[]>;
    /**
     * View statuses from followed users.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    fetchHome(params?: FetchTimelineParams): Promise<IteratorResult<Status[]>>;
    /**
     * Public timeline
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    fetchPublic(params?: FetchTimelineParams): Promise<IteratorResult<Status[]>>;
    /**
     * View public statuses containing the given hashtag.
     * @param hashtag Content of a #hashtag, not including # symbol.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    fetchHashtag(hashtag: string, params?: FetchTimelineParams): Promise<IteratorResult<Status[]>>;
    /**
     * View statuses in the given list timeline.
     * @param id Local ID of the list in the database.
     * @param params Query parameter
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    fetchList(id: string, params?: FetchTimelineParams): Promise<IteratorResult<Status[]>>;
    /**
     * View statuses with a “direct” privacy, from your account or in your notifications.
     * @deprecated Use conversations API instead
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    fetchDirect(params?: FetchTimelineParams): Promise<IteratorResult<Status[]>>;
    /**
     * @deprecated Use getHashtagIterable instead.
     */
    getTagIterable: (hashtag: string, params?: FetchTimelineParams) => Paginator<FetchTimelineParams, Status[]>;
    /**
     * @deprecated Use getListIterable instead.
     */
    getList: (id: string, params?: FetchTimelineParams) => Paginator<FetchTimelineParams, Status[]>;
    /**
     * @deprecated Use getDirectIterable instead.
     */
    getDirect: (params?: FetchTimelineParams) => Paginator<FetchTimelineParams, Status[]>;
}

interface FetchTrendsParams {
    /** Maximum number of results to return. Defaults to 10. */
    readonly limit: number;
}
declare class TrendRepository implements Repository<Tag> {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    get statuses(): Paginator<DefaultPaginationParams, Status[]>;
    get links(): Paginator<DefaultPaginationParams, Link[]>;
    getStatuses(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Status[]>;
    getLinks(params?: DefaultPaginationParams): Paginator<DefaultPaginationParams, Link[]>;
    /**
     * Tags that are being used more frequently within the past week.
     * @param params Parameters
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/instance/trends/
     */
    fetchAll(params?: FetchTrendsParams): Promise<Tag[]>;
}

interface CreateConfirmationParams {
    readonly email?: string;
}
declare class EmailRepository {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    createConfirmation(params?: CreateConfirmationParams): Promise<void>;
}

interface AdminFetchReportsParams {
    readonly resolved?: boolean | null;
    readonly accountId?: string | null;
    readonly targetAccountId?: string | null;
    readonly byTargetDomain?: string | null;
}
declare class ReportRepository {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View all reports. Pagination may be done with HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    fetchAll(params?: AdminFetchReportsParams): Promise<Report[]>;
    /**
     * View information about the report with the given ID.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    fetch(id: string): Promise<Report>;
    /**
     * Claim the handling of this report to yourself.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    assignToSelf(id: string): Promise<Report>;
    /**
     * Unassign a report so that someone else can claim it.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    unassign(id: string): Promise<Report>;
    /**
     * Mark a report as resolved with no further action taken.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    resolve(id: string): Promise<Report>;
    /**
     * Reopen a currently closed report.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    reopen(id: string): Promise<Report>;
}

interface AdminFetchAccountParams {
    /** Filter for local accounts? */
    readonly local?: boolean | null;
    /** Filter for remote accounts? */
    readonly remote?: boolean | null;
    /** Filter by the given domain */
    readonly byDomain?: string | null;
    /** Filter for currently active accounts? */
    readonly active?: boolean | null;
    /** Filter for currently pending accounts? */
    readonly pending?: boolean | null;
    /** Filter for currently disabled accounts? */
    readonly disabled?: boolean | null;
    /** Filter for currently silenced accounts? */
    readonly silenced?: boolean | null;
    /** Filter for currently suspended accounts? */
    readonly suspended?: boolean | null;
    /** Username to search for */
    readonly username?: string | null;
    /** Display name to search for */
    readonly displayName?: string | null;
    /** Lookup a user with this email */
    readonly email?: string | null;
    /** Lookup users by this IP address */
    readonly ip?: string | null;
    /** Filter for staff accounts? */
    readonly staff?: boolean | null;
}
declare type AccountActionType = 'none' | 'disable' | 'silence' | 'suspend';
interface AdminActionAccountParams {
    /** Type of action to be taken. Enumerable oneOf: `none` `disable` `silence` `suspend` */
    readonly type?: AccountActionType;
    /** ID of an associated report that caused this action to be taken */
    readonly reportId?: string;
    /** ID of a preset warning */
    readonly warningPresetId?: string | null;
    /** Additional text for clarification of why this action was taken */
    readonly text?: string | null;
    /** Whether an email should be sent to the user with the above information. */
    readonly sendEmailNotification?: boolean | null;
}
declare class AccountRepository {
    private readonly http;
    readonly version: string;
    readonly config: MastoConfig;
    constructor(http: Http, version: string, config: MastoConfig);
    /**
     * View accounts matching certain criteria for filtering, up to 100 at a time.
     * Pagination may be done with the HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    fetchAll(params?: AdminFetchAccountParams): Promise<Account[]>;
    /**
     * View admin-level information about the given account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    fetch(id: string): Promise<Account>;
    /**
     * Perform an action against an account and log this action in the moderation history.
     * @param id g ID of the account
     * @param params Params
     * @return Account
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    createAction(id: string, params: AdminActionAccountParams): Promise<Account>;
    /**
     * Approve the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    approve(id: string): Promise<Account>;
    /**
     * Reject the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    reject(id: string): Promise<Account>;
    /**
     * Re-enable a local account whose login is currently disabled.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    enable(id: string): Promise<Account>;
    /**
     * Unsilence a currently silenced account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    unsilence(id: string): Promise<Account>;
    /**
     * Unsuspend a currently suspended account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    unsuspend(id: string): Promise<Account>;
}

type index_AdminFetchReportsParams = AdminFetchReportsParams;
type index_ReportRepository = ReportRepository;
declare const index_ReportRepository: typeof ReportRepository;
type index_AdminFetchAccountParams = AdminFetchAccountParams;
type index_AccountActionType = AccountActionType;
type index_AdminActionAccountParams = AdminActionAccountParams;
type index_AccountRepository = AccountRepository;
declare const index_AccountRepository: typeof AccountRepository;
declare namespace index {
  export {
    index_AdminFetchReportsParams as AdminFetchReportsParams,
    index_ReportRepository as ReportRepository,
    index_AdminFetchAccountParams as AdminFetchAccountParams,
    index_AccountActionType as AccountActionType,
    index_AdminActionAccountParams as AdminActionAccountParams,
    index_AccountRepository as AccountRepository,
  };
}

declare class MastoAdminClient {
    private readonly http;
    private readonly version;
    private readonly config;
    readonly account: AccountRepository;
    readonly report: ReportRepository;
    constructor(http: Http, version: string, config: MastoConfig);
}
/**
 * @deprecated This alias will be removed in v5.0.0
 */
declare const AdminFacadeRepositories: typeof MastoAdminClient;

declare type SearchType = 'accounts' | 'hashtags' | 'statuses';
interface SearchParams extends DefaultPaginationParams {
    /** Attempt WebFinger lookup. Defaults to false. */
    readonly q: string;
    /** Enum(accounts, hashtags, statuses) */
    readonly type?: SearchType | null;
    /** Attempt WebFinger look-up */
    readonly resolve?: boolean | null;
    /** If provided, statuses returned will be authored only by this account */
    readonly accountId?: string | null;
    /** Filter out unreviewed tags? Defaults to false. Use true when trying to find trending tags. */
    readonly excludeUnreviewed?: boolean | null;
    /** Only include accounts that the user is following. Defaults to false. */
    readonly following?: boolean | null;
}
declare class MastoClient {
    private readonly http;
    private readonly ws;
    readonly version: string;
    readonly config: MastoConfig;
    readonly admin: MastoAdminClient;
    readonly stream: StreamRepository;
    readonly accounts: AccountRepository$1;
    readonly announcements: AnnouncementRepository;
    readonly apps: AppRepository;
    readonly blocks: BlockRepository;
    readonly bookmarks: BookmarkRepository;
    readonly conversations: ConversationRepository;
    readonly customEmojis: CustomEmojiRepository;
    readonly directory: DirectoryRepository;
    readonly domainBlocks: DomainBlockRepository;
    readonly endorsements: EndorsementRepository;
    readonly favourites: FavouriteRepository;
    readonly featuredTags: FeaturedTagRepository;
    readonly filters: FilterRepository;
    readonly followRequests: FollowRequestRepository;
    readonly instances: InstanceRepository;
    readonly lists: ListRepository;
    readonly markers: MarkerRepository;
    readonly mediaAttachments: MediaAttachmentRepository;
    readonly mutes: MuteRepository;
    readonly notifications: NotificationsRepository;
    readonly poll: PollRepository;
    readonly preferences: PreferenceRepository;
    readonly pushSubscriptions: PushSubscriptionsRepository;
    readonly reports: ReportRepository$1;
    readonly scheduledStatuses: ScheduledStatusesRepository;
    readonly statuses: StatusRepository;
    readonly suggestions: SuggestionRepository;
    readonly timelines: TimelinesRepository;
    readonly trends: TrendRepository;
    readonly email: EmailRepository;
    constructor(http: Http, ws: Ws, version: string, config: MastoConfig);
    /**
     * Search results
     * @param params Parameters
     * @return Results
     * @see https://docs.joinmastodon.org/methods/search/
     */
    search(params: SearchParams): Paginator<SearchParams, Results>;
}
/**
 * @deprecated This type alias will be removed in v5.x
 */
declare const FacadeRepositories: typeof MastoClient;

interface Target$1 {
    readonly version: string;
    readonly config: MastoConfig;
}
interface AvailableParams {
    since?: `${number}.${number}.${number}`;
    until?: `${number}.${number}.${number}`;
}
declare type Fn$1 = (...args: any[]) => any;
/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
declare const version: ({ since, until }: AvailableParams) => (_target: Target$1, name: string, descriptor: TypedPropertyDescriptor<Fn$1>) => void;

interface Target {
    readonly config: MastoConfig;
}
declare type Fn = (...args: any[]) => any;
/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
declare const deprecated: (message: string) => (_target: Target, name: string | symbol, descriptor: TypedPropertyDescriptor<Fn>) => void;

declare type MastoErrorType = 'ERR_BLOCKED' | 'ERR_UNREACHABLE' | 'ERR_TAKEN' | 'ERR_RESERVED' | 'ERR_ACCEPTED' | 'ERR_BLANK' | 'ERR_INVALID' | 'ERR_TOO_LONG' | 'ERR_TOO_SHORT' | 'ERR_INCLUSION';
interface MastoErrorDetail {
    readonly error: MastoErrorType;
    readonly description: string;
}
declare type MastoErrorDetails = Record<string, readonly MastoErrorDetail[]>;
/**
 * Error object
 * @see https://docs.joinmastodon.org/entities/error/
 */
declare class MastoError extends Error {
    /** The error message. Equivalent for the `error` field from the Error entity */
    readonly message: string;
    /** HTTP status code */
    readonly statusCode?: number | undefined;
    /** A longer description of the error, mainly provided with the OAuth API. */
    readonly description?: string | null | undefined;
    /** Used by /api/v1/accounts */
    readonly details?: MastoErrorDetails | null | undefined;
    /** Helper to check if the error has been thrown from Masto */
    readonly isMastoError = true;
    constructor(
    /** The error message. Equivalent for the `error` field from the Error entity */
    message: string, 
    /** HTTP status code */
    statusCode?: number | undefined, 
    /** A longer description of the error, mainly provided with the OAuth API. */
    description?: string | null | undefined, 
    /** Used by /api/v1/accounts */
    details?: MastoErrorDetails | null | undefined);
}

/**
 * Mastodon forbidden error
 */
declare class MastoForbiddenError extends MastoError {
    readonly name = "MastoForbiddenError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon forbidden error
 */
declare class MastoConflictError extends MastoError {
    readonly message: string;
    readonly description?: string | undefined;
    readonly details?: MastoErrorDetails | undefined;
    readonly name = "MastoConflictError";
    constructor(message: string, description?: string | undefined, details?: MastoErrorDetails | undefined);
}

/**
 * Mastodon not found error class
 */
declare class MastoNotFoundError extends MastoError {
    readonly name = "MastoNotFoundError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon rate limit error class
 * @param message Message for users
 */
declare class MastoRateLimitError extends MastoError {
    /** Number of requests permitted per time period */
    readonly limit: number;
    /** Number of requests you can still make */
    readonly remaining: number;
    /** Timestamp when your rate limit will reset */
    readonly reset: string;
    readonly name = "MastoRateLimitError";
    constructor(message: string, 
    /** Number of requests permitted per time period */
    limit: number, 
    /** Number of requests you can still make */
    remaining: number, 
    /** Timestamp when your rate limit will reset */
    reset: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon gone error
 */
declare class MastoGoneError extends MastoError {
    readonly name = "MastoGoneError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon Timeout error
 * @param message Message for users
 */
declare class MastoTimeoutError extends MastoError {
    readonly name = "MastoTimeoutError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon unauthorized error class
 * @param message Message for users
 */
declare class MastoUnauthorizedError extends MastoError {
    readonly name = "MastoUnauthorizedError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

/**
 * Mastodon unprocessable entity
 * @param message Message for users
 */
declare class MastoUnprocessableEntityError extends MastoError {
    readonly name = "MastoUnprocessableEntityError";
    constructor(message: string, description?: string, details?: MastoErrorDetails);
}

interface BaseCreateErrorParams {
    readonly message: string;
    readonly description?: string;
    readonly details?: MastoErrorDetails;
}
interface CreateDefaultErrorParams extends BaseCreateErrorParams {
    readonly statusCode: 401 | 403 | 404 | 404 | 409 | 410 | 422 | 500;
}
interface CreateRateLimitErrorParams extends BaseCreateErrorParams {
    readonly statusCode: 429;
    readonly limit: number;
    readonly remaining: number;
    readonly reset: string;
}
declare type CreateErrorParams = CreateDefaultErrorParams | CreateRateLimitErrorParams;
declare const createError: (params: CreateErrorParams) => MastoError;

declare const login: (config: MastoConfig) => Promise<MastoClient>;

export { Account$1 as Account, AccountCredentials, AccountFeaturedTag, AccountRepository$1 as AccountRepository, Activity, index$1 as Admin, AdminFacadeRepositories, index as AdminRepositories, Announcement, AnnouncementRepository, AppRepository, Application, Attachment, AttachmentMeta, AttachmentMetaColors, AttachmentMetaFocus, AttachmentMetaImage, AttachmentMetaVideo, AttachmentType, BaseCreateErrorParams, BaseHttp, BlockRepository, BookmarkRepository, Card, CardType, Client, Context, Conversation, ConversationRepository, CreateAccountNoteParams, CreateAccountParams, CreateAppParams, CreateConfirmationParams, CreateDefaultErrorParams, CreateErrorParams, CreateFeaturedTagParams, CreateFilterParams, CreateMarkersParams, CreateMediaAttachmentParams, CreatePushSubscriptionParams, CreateRateLimitErrorParams, CreateStatusParams, CreateStatusParamsBase, CreateStatusParamsWithMediaIds, CreateStatusParamsWithStatus, CreateStatusPollParam, CustomEmojiRepository, Data, DefaultPaginationParams, DirectoryOrderType, DirectoryRepository, DomainBlockRepository, EmailRepository, Emoji, EndorsementRepository, Event, EventType, EventTypeMap, FacadeRepositories, FavouriteRepository, FeaturedTag, FeaturedTagRepository, FetchAccountStatusesParams, FetchDirectoryParams, FetchMarkersParams, FetchNotificationsParams, FetchTimelineParams, FetchTrendsParams, Field, Filter, FilterContext, FilterRepository, FollowAccountParams, FollowRequestRepository, Headers, History, Http, HttpAxiosImpl, HttpNativeImpl, IdentityProof, Instance, InstanceConfiguration, InstanceMediaAttachmentsConfiguration, InstancePollsConfiguration, InstanceRepository, InstanceRule, InstanceStats, InstanceStatusesConfiguration, InstanceURLs, IterableRepository, Link, List, ListRepository, LookupAccountParams, Marker, MarkerItem, MarkerRepository, MarkerTimeline, MastoAdminClient, MastoClient, MastoConfig, MastoConflictError, MastoError, MastoErrorDetail, MastoErrorDetails, MastoErrorType, MastoForbiddenError, MastoGoneError, MastoNotFoundError, MastoProxyConfig, MastoRateLimitError, MastoTimeoutError, MastoUnauthorizedError, MastoUnprocessableEntityError, MediaAttachmentRepository, Mention, Method, MimeType, ModifyListAccountsParams, ModifyListParams, MuteAccountParams, MuteRepository, Notification, NotificationType, NotificationsRepository, Paginator, Poll, PollOption, PollRepository, Preference, PreferenceReadingExpandMedia, PreferenceRepository, PushSubscription, PushSubscriptionAlerts, PushSubscriptionsRepository, Reaction, ReblogStatusParams, Relationship, ReportAccountParams, ReportCategory, ReportRepository$1 as ReportRepository, Repository, Request, Response, Results, ScheduledStatus, ScheduledStatusesRepository, Scope, SearchAccountsParams, SearchParams, SearchType, Serializer, SerializerNativeImpl, SerializerNodejsImpl, Source, Status, StatusEdit, StatusParams, StatusRepository, StatusSource, StatusVisibility, StreamRepository, SubscriptionPolicy, SuggestionRepository, Tag, TimelinesRepository, Token, TrendRepository, UpdateCredentialsParams, UpdateFilterParams, UpdateMediaAttachmentParams, UpdatePushSubscriptionParams, UpdateScheduledStatusParams, UpdateStatusParams, VotePollParams, Ws, WsEvents, WsEventsNativeImpl, WsEventsNodejsImpl, WsNativeImpl, WsNodejsImpl, createError, deprecated, login, version };
