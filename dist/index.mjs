import 'isomorphic-form-data';
import semver from 'semver';
import axios from 'axios';
import { headerCase, camelCase, snakeCase } from 'change-case';
import EventEmitter from 'eventemitter3';
import WebSocket$1 from 'isomorphic-ws';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

/**
 * Error object
 * @see https://docs.joinmastodon.org/entities/error/
 */
var MastoError = /** @class */ (function (_super) {
    __extends(MastoError, _super);
    function MastoError(
    /** The error message. Equivalent for the `error` field from the Error entity */
    message, 
    /** HTTP status code */
    statusCode, 
    /** A longer description of the error, mainly provided with the OAuth API. */
    description, 
    /** Used by /api/v1/accounts */
    details) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.statusCode = statusCode;
        _this.description = description;
        _this.details = details;
        /** Helper to check if the error has been thrown from Masto */
        _this.isMastoError = true;
        return _this;
    }
    return MastoError;
}(Error));

/**
 * Mastodon forbidden error
 */
var MastoForbiddenError = /** @class */ (function (_super) {
    __extends(MastoForbiddenError, _super);
    function MastoForbiddenError(message, description, details) {
        var _this = _super.call(this, message, 403, description, details) || this;
        _this.name = 'MastoForbiddenError';
        return _this;
    }
    return MastoForbiddenError;
}(MastoError));

/**
 * Mastodon forbidden error
 */
var MastoConflictError = /** @class */ (function (_super) {
    __extends(MastoConflictError, _super);
    function MastoConflictError(message, description, details) {
        var _this = _super.call(this, message, 409, description, details) || this;
        _this.message = message;
        _this.description = description;
        _this.details = details;
        _this.name = 'MastoConflictError';
        return _this;
    }
    return MastoConflictError;
}(MastoError));

/**
 * Mastodon not found error class
 */
var MastoNotFoundError = /** @class */ (function (_super) {
    __extends(MastoNotFoundError, _super);
    function MastoNotFoundError(message, description, details) {
        var _this = _super.call(this, message, 404, description, details) || this;
        _this.name = 'MastoNotFoundError';
        return _this;
    }
    return MastoNotFoundError;
}(MastoError));

/**
 * Mastodon rate limit error class
 * @param message Message for users
 */
var MastoRateLimitError = /** @class */ (function (_super) {
    __extends(MastoRateLimitError, _super);
    function MastoRateLimitError(message, 
    /** Number of requests permitted per time period */
    limit, 
    /** Number of requests you can still make */
    remaining, 
    /** Timestamp when your rate limit will reset */
    reset, description, details) {
        var _this = _super.call(this, message, 429, description, details) || this;
        _this.limit = limit;
        _this.remaining = remaining;
        _this.reset = reset;
        _this.name = 'MastoRateLimitError';
        return _this;
    }
    return MastoRateLimitError;
}(MastoError));

/**
 * Mastodon gone error
 */
var MastoGoneError = /** @class */ (function (_super) {
    __extends(MastoGoneError, _super);
    function MastoGoneError(message, description, details) {
        var _this = _super.call(this, message, 410, description, details) || this;
        _this.name = 'MastoGoneError';
        return _this;
    }
    return MastoGoneError;
}(MastoError));

/**
 * Mastodon Timeout error
 * @param message Message for users
 */
var MastoTimeoutError = /** @class */ (function (_super) {
    __extends(MastoTimeoutError, _super);
    function MastoTimeoutError(message, description, details) {
        var _this = _super.call(this, message, undefined, description, details) || this;
        _this.name = 'MastoTimeoutError';
        return _this;
    }
    return MastoTimeoutError;
}(MastoError));

/**
 * Mastodon unauthorized error class
 * @param message Message for users
 */
var MastoUnauthorizedError = /** @class */ (function (_super) {
    __extends(MastoUnauthorizedError, _super);
    function MastoUnauthorizedError(message, description, details) {
        var _this = _super.call(this, message, 401, description, details) || this;
        _this.name = 'MastoUnauthorizedError';
        return _this;
    }
    return MastoUnauthorizedError;
}(MastoError));

/**
 * Mastodon unprocessable entity
 * @param message Message for users
 */
var MastoUnprocessableEntityError = /** @class */ (function (_super) {
    __extends(MastoUnprocessableEntityError, _super);
    function MastoUnprocessableEntityError(message, description, details) {
        var _this = _super.call(this, message, 422, description, details) || this;
        _this.name = 'MastoUnprocessableEntityError';
        return _this;
    }
    return MastoUnprocessableEntityError;
}(MastoError));

var createError = function (params) {
    var _a, _b;
    var message = (_a = params.message) !== null && _a !== void 0 ? _a : 'Unexpected error occurred';
    var description = (_b = params.description) !== null && _b !== void 0 ? _b : 'No description provided for this error';
    var args = [message, description, params.details];
    switch (params.statusCode) {
        case 401: {
            return new (MastoUnauthorizedError.bind.apply(MastoUnauthorizedError, __spreadArray([void 0], args, false)))();
        }
        case 403: {
            return new (MastoForbiddenError.bind.apply(MastoForbiddenError, __spreadArray([void 0], args, false)))();
        }
        case 404: {
            return new (MastoNotFoundError.bind.apply(MastoNotFoundError, __spreadArray([void 0], args, false)))();
        }
        case 409: {
            return new (MastoConflictError.bind.apply(MastoConflictError, __spreadArray([void 0], args, false)))();
        }
        case 410: {
            return new (MastoGoneError.bind.apply(MastoGoneError, __spreadArray([void 0], args, false)))();
        }
        case 422: {
            return new (MastoUnprocessableEntityError.bind.apply(MastoUnprocessableEntityError, __spreadArray([void 0], args, false)))();
        }
        case 429: {
            return new MastoRateLimitError(message, params.limit, params.remaining, params.reset, description);
        }
        default: {
            return new MastoError(message, params.statusCode, description, params.details);
        }
    }
};

/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
var version = function (_a) {
    var since = _a.since, until = _a.until;
    return function (_target, name, descriptor) {
        var origin = descriptor.value;
        if (!origin) {
            throw new Error('version can only apply to a method of a class');
        }
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.config.disableVersionCheck) {
                return origin.apply(this, args);
            }
            if (since && semver.lt(this.version, since, { loose: true })) {
                throw new MastoNotFoundError("".concat(String(name), " is not available with the current ") +
                    "Mastodon version ".concat(this.version, ". ") +
                    "It requires greater than or equal to version ".concat(since, "."));
            }
            if (until && semver.gt(this.version, until, { loose: true })) {
                throw new MastoNotFoundError("".concat(String(name), " is not available with the current ") +
                    "Mastodon version ".concat(this.version, ". ") +
                    "It was removed on version ".concat(until, "."));
            }
            return origin.apply(this, args);
        };
    };
};

var Paginator = /** @class */ (function () {
    function Paginator(http, initialUrl, initialParams) {
        this.http = http;
        this.initialUrl = initialUrl;
        this.initialParams = initialParams;
        this.pluckNext = function (link) {
            var _a;
            return (_a = link === null || link === void 0 ? void 0 : link.match(/<(.+?)>; rel="next"/)) === null || _a === void 0 ? void 0 : _a[1];
        };
        this.nextUrl = initialUrl;
        this.nextParams = initialParams;
    }
    Paginator.prototype.next = function (params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.nextUrl == undefined) {
                            return [2 /*return*/, { done: true, value: undefined }];
                        }
                        return [4 /*yield*/, this.http.request({
                                method: 'get',
                                // if no params specified, use link header
                                url: params ? this.initialUrl : this.nextUrl,
                                data: params !== null && params !== void 0 ? params : this.nextParams,
                            })];
                    case 1:
                        response = _b.sent();
                        this.nextUrl = this.pluckNext((_a = response.headers) === null || _a === void 0 ? void 0 : _a.link);
                        return [2 /*return*/, {
                                done: false,
                                value: response.data,
                            }];
                }
            });
        });
    };
    Paginator.prototype.return = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            done: true
                        };
                        return [4 /*yield*/, value];
                    case 1: return [2 /*return*/, (_a.value = _b.sent(),
                            _a)];
                }
            });
        });
    };
    Paginator.prototype.throw = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw e;
            });
        });
    };
    Paginator.prototype[Symbol.asyncIterator] = function () {
        return this;
    };
    return Paginator;
}());

var AccountRepository$1 = /** @class */ (function () {
    function AccountRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    AccountRepository.prototype.getFollowersIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/followers"), params);
    };
    AccountRepository.prototype.getFollowingIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/following"), params);
    };
    AccountRepository.prototype.getStatusesIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/accounts/".concat(id, "/statuses"), params);
    };
    // ====
    /**
     * View information about a profile.
     * @param id The id of the account in the database
     * @return Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id));
    };
    /**
     * Creates a user and account records. Returns an account access token
     * for the app that initiated the request. The app should save this token for later,
     * and should wait for the user to confirm their account by clicking a link in their email inbox.
     * @param params Parameters
     * @return Token
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/accounts", params);
    };
    /**
     * Test to make sure that the user token works.
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.verifyCredentials = function () {
        return this.http.get('/api/v1/accounts/verify_credentials');
    };
    /**
     *  Update the user's display and preferences.
     * @param params Parameters
     * @return the user's own Account with Source
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.updateCredentials = function (params) {
        return this.http.patch('/api/v1/accounts/update_credentials', params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
    /**
     * Accounts which follow the given account, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchFollowers = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getFollowersIterable(id, params).next();
    };
    /**
     * Accounts which the given account is following, if network is not hidden by the account owner.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchFollowing = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getFollowersIterable(id, params).next();
    };
    /**
     * Statuses posted to the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchStatuses = function (id, params) {
        if (params === void 0) { params = {}; }
        return this.getStatusesIterable(id, params).next();
    };
    /**
     * Follow the given account.
     * @param id The id of the account in the database
     * @param params Parameters
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.follow = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/follow"), params);
    };
    /**
     * Unfollow the given account
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unfollow = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unfollow"), params);
    };
    /**
     * Find out whether a given account is followed, blocked, muted, etc.
     * @param id Array of account IDs to check
     * @return Array of Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.fetchRelationships = function (id) {
        return this.http.get('/api/v1/accounts/relationships', {
            id: id,
        });
    };
    /**
     * Search for matching accounts by username or display name.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.search = function (params) {
        return this.http.get("/api/v1/accounts/search", params);
    };
    /**
     * Block the given account. Clients should filter statuses from this account if received (e.g. due to a boost in the Home timeline)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.block = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/block"));
    };
    /**
     * Unblock the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unblock = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unblock"));
    };
    /**
     * Add the given account to the user's featured profiles. (Featured profiles are currently shown on the user's own public profile.)
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.pin = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/pin"));
    };
    /**
     * Remove the given account from the user's featured profiles.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unpin = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unpin"));
    };
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    AccountRepository.prototype.fetchLists = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/lists"));
    };
    /**
     * Mute the given account. Clients should filter statuses and notifications from this account, if received (e.g. due to a boost in the Home timeline).
     * @param id The id of the account in the database
     * @param params Parameter
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.mute = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/mute"), params);
    };
    /**
     * Unmute the given account.
     * @param id The id of the account in the database
     * @return Relationship
     * @see https://docs.joinmastodon.org/methods/accounts/
     */
    AccountRepository.prototype.unmute = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/unmute"));
    };
    /**
     * Add personal note to the account
     * @param id ID of the account
     * @param param Parameters
     * @return Relationship
     */
    AccountRepository.prototype.createNote = function (id, params) {
        return this.http.post("/api/v1/accounts/".concat(id, "/note"), params);
    };
    /**
     * Get featured tag of the account
     * @param id ID of the account
     * @return FeaturedTags
     */
    AccountRepository.prototype.fetchFeaturedTags = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/featured_tags"));
    };
    /**
     * Identity proofs
     * @param id The id of the account in the database
     * @return Array of IdentityProof
     * @see https://github.com/tootsuite/mastodon/pull/10297
     */
    AccountRepository.prototype.fetchIdentityProofs = function (id) {
        return this.http.get("/api/v1/accounts/".concat(id, "/identity_proofs"));
    };
    /**
     * This method allows to quickly convert a username of a known account to an ID that can be used with the REST API, or to check if a username is available for sign-up
     * @param params Parameters
     * @return Account
     */
    AccountRepository.prototype.lookup = function (params) {
        return this.http.get('/api/v1/accounts/lookup', params);
    };
    /**
     * TODO: stub
     * @returns Accounts
     */
    AccountRepository.prototype.fetchFamiliarFollowers = function () {
        return this.http.get("/api/v1/accounts/familiar_followers");
    };
    /**
     * @param id ID of the account
     * @returns N/A
     */
    AccountRepository.prototype.removeFromFollowers = function (id) {
        return this.http.post("/api/v1/accounts/".concat(id, "/remove_from_followers"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getFollowersIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getFollowingIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "getStatusesIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.7.0' })
    ], AccountRepository.prototype, "create", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "verifyCredentials", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "updateCredentials", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "follow", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unfollow", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "fetchRelationships", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "search", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "block", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unblock", null);
    __decorate([
        version({ since: '2.5.0' })
    ], AccountRepository.prototype, "pin", null);
    __decorate([
        version({ since: '2.5.0' })
    ], AccountRepository.prototype, "unpin", null);
    __decorate([
        version({ since: '2.1.0' })
    ], AccountRepository.prototype, "fetchLists", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "mute", null);
    __decorate([
        version({ since: '0.0.0' })
    ], AccountRepository.prototype, "unmute", null);
    __decorate([
        version({ since: '3.2.0' })
    ], AccountRepository.prototype, "createNote", null);
    __decorate([
        version({ since: '3.3.0' })
    ], AccountRepository.prototype, "fetchFeaturedTags", null);
    __decorate([
        version({ since: '2.8.0' })
    ], AccountRepository.prototype, "fetchIdentityProofs", null);
    __decorate([
        version({ since: '3.4.0' })
    ], AccountRepository.prototype, "lookup", null);
    __decorate([
        version({ since: '3.5.0' })
    ], AccountRepository.prototype, "fetchFamiliarFollowers", null);
    __decorate([
        version({ since: '3.5.0' })
    ], AccountRepository.prototype, "removeFromFollowers", null);
    return AccountRepository;
}());

/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
var deprecated = function (message) {
    return function (_target, name, descriptor) {
        var origin = descriptor.value;
        if (!origin) {
            throw new Error('deprecated can only apply to a method of a class');
        }
        descriptor.value = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (process.env.NODE_ENV !== 'production' ||
                !((_a = this.config) === null || _a === void 0 ? void 0 : _a.disableDeprecatedWarning)) {
                // eslint-disable-next-line no-console
                console.warn("#".concat(name.toString(), " is deprecated. ").concat(message));
            }
            return origin.apply(this, args);
        };
    };
};

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

var AnnouncementRepository = /** @class */ (function () {
    function AnnouncementRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Fetch announcements
     * @return Announcements
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/announcements');
    };
    /**
     * Dismiss announcement
     * @param id ID of the announcement
     * @return Nothing
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.dismiss = function (id) {
        return this.http.post("/api/v1/announcements/".concat(id, "/dismiss"));
    };
    /**
     * Add a reaction to an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.addReaction = function (id, name) {
        return this.http.put("/api/v1/announcements/".concat(id, "/reactions/").concat(name));
    };
    /**
     * Remove a reaction from an announcement
     * @param id ID of the announcement
     * @param name Emoji string
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/announcements/
     */
    AnnouncementRepository.prototype.removeReaction = function (id, name) {
        return this.http.delete("/api/v1/announcements/".concat(id, "/reactions/").concat(name));
    };
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "dismiss", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "addReaction", null);
    __decorate([
        version({ since: '3.1.0' })
    ], AnnouncementRepository.prototype, "removeReaction", null);
    return AnnouncementRepository;
}());

var AppRepository = /** @class */ (function () {
    function AppRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Create a new application to obtain OAuth2 credentials.
     * @param params Parameters
     * @return Returns App with `client_id` and `client_secret`
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    AppRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/apps", params);
    };
    /**
     * Confirm that the app's OAuth2 credentials work.
     * @return Application
     * @see https://docs.joinmastodon.org/methods/apps/
     */
    AppRepository.prototype.verifyCredentials = function () {
        return this.http.get("/api/v1/apps/verify_credentials");
    };
    __decorate([
        version({ since: '0.0.0' })
    ], AppRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.0.0' })
    ], AppRepository.prototype, "verifyCredentials", null);
    return AppRepository;
}());

var IterableRepository = /** @class */ (function () {
    function IterableRepository() {
    }
    IterableRepository.prototype.fetchMany = function (params) {
        return this.getIterator(params).next();
    };
    IterableRepository.prototype[Symbol.asyncIterator] = function () {
        return __asyncGenerator(this, arguments, function _a() {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(this.getIterator != undefined ? this.getIterator() : [])))];
                    case 1: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return IterableRepository;
}());

var BlockRepository = /** @class */ (function (_super) {
    __extends(BlockRepository, _super);
    function BlockRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Blocked users
     * @param params Array of Account
     * @return Query parameter
     * @see https://docs.joinmastodon.org/methods/accounts/blocks/
     */
    BlockRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/blocks", params);
    };
    __decorate([
        version({ since: '0.0.0' })
    ], BlockRepository.prototype, "getIterator", null);
    return BlockRepository;
}(IterableRepository));

var BookmarkRepository = /** @class */ (function (_super) {
    __extends(BookmarkRepository, _super);
    function BookmarkRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Statuses the user has bookmarked.
     * @param params Parameters
     * @return Array of Statuses
     * @see https://docs.joinmastodon.org/methods/accounts/bookmarks/
     */
    BookmarkRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/bookmarks', params);
    };
    __decorate([
        version({ since: '3.1.0' })
    ], BookmarkRepository.prototype, "getIterator", null);
    return BookmarkRepository;
}(IterableRepository));

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

var EndorsementRepository = /** @class */ (function (_super) {
    __extends(EndorsementRepository, _super);
    function EndorsementRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Accounts that the user is currently featuring on their profile.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/endorsements/
     */
    EndorsementRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/endorsements", params);
    };
    __decorate([
        version({ since: '2.5.0' })
    ], EndorsementRepository.prototype, "getIterator", null);
    return EndorsementRepository;
}(IterableRepository));

var FavouriteRepository = /** @class */ (function (_super) {
    __extends(FavouriteRepository, _super);
    function FavouriteRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Statuses the user has favourited.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/accounts/favourites/
     */
    FavouriteRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/favourites", params);
    };
    __decorate([
        version({ since: '0.0.0' })
    ], FavouriteRepository.prototype, "getIterator", null);
    return FavouriteRepository;
}(IterableRepository));

var FeaturedTagRepository = /** @class */ (function () {
    function FeaturedTagRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View your featured tags
     * @return Array of FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     * @done
     */
    FeaturedTagRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/featured_tags');
    };
    /**
     * Feature a tag
     * @param params Parameters
     * @return FeaturedTag
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/featured_tags', params);
    };
    /**
     * Shows your 10 most-used tags, with usage history for the past week.
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.fetchSuggestions = function () {
        return this.http.get('/api/v1/featured_tags/suggestions');
    };
    /**
     * Un-feature a tag
     * @param id The id of the FeaturedTag to be un-featured
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/featured_tags/
     */
    FeaturedTagRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/featured_tags/".concat(id));
    };
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "fetchSuggestions", null);
    __decorate([
        version({ since: '3.0.0' })
    ], FeaturedTagRepository.prototype, "remove", null);
    return FeaturedTagRepository;
}());

var FilterRepository = /** @class */ (function () {
    function FilterRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View all filters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.fetchAll = function () {
        return this.http.get("/api/v1/filters");
    };
    /**
     * View a single filter
     * @param id ID of the filter
     * @return Returns Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/filters/".concat(id));
    };
    /**
     * Create a filter
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.create = function (params) {
        return this.http.post("/api/v1/filters", params);
    };
    /**
     * Update a filter
     * @param id ID of the filter in the database
     * @param params Parameters
     * @return Filter
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/filters/".concat(id), params);
    };
    /**
     * Remove a filter
     * @param id ID of the filter in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/filters/
     */
    FilterRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/filters/".concat(id));
    };
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.4.3' })
    ], FilterRepository.prototype, "remove", null);
    return FilterRepository;
}());

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

var InstanceRepository = /** @class */ (function () {
    function InstanceRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Information about the server.
     * @return Instance
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetch = function () {
        return this.http.get('/api/v1/instance');
    };
    /**
     * Domains that this instance is aware of.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetchPeers = function () {
        return this.http.get('/api/v1/instance/peers');
    };
    /**
     * Instance activity over the last 3 months, binned weekly.
     * @return Array of Activity
     * @see https://docs.joinmastodon.org/methods/instance/
     */
    InstanceRepository.prototype.fetchActivity = function () {
        return this.http.get('/api/v1/instance/activity');
    };
    __decorate([
        version({ since: '1.0.0' })
    ], InstanceRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.1.2' })
    ], InstanceRepository.prototype, "fetchPeers", null);
    __decorate([
        version({ since: '2.1.2' })
    ], InstanceRepository.prototype, "fetchActivity", null);
    return InstanceRepository;
}());

var ListRepository = /** @class */ (function () {
    function ListRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    ListRepository.prototype.getAccountIterator = function (id, params) {
        return new Paginator(this.http, "/api/v1/lists/".concat(id, "/accounts"), params);
    };
    /**
     * Fetch the list with the given ID. Used for verifying the title of a list.
     * @param id ID of the list in the database
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/lists/".concat(id));
    };
    /**
     * Fetch all lists that the user owns.
     * @return Array of List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetchAll = function () {
        return this.http.get('/api/v1/lists');
    };
    /**
     * Create a new list.
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/lists', params);
    };
    /**
     * Change the title of a list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return List
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/lists/".concat(id), params);
    };
    /**
     * Delete a list
     * @param id ID of the list in the database
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/lists/".concat(id));
    };
    /**
     * View accounts in list
     * @param id ID of the list in the database
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.fetchAccounts = function (id, params) {
        return this.getAccountIterator(id, params).next();
    };
    /**
     * Add accounts to the given list. Note that the user must be following these accounts.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.addAccount = function (id, params) {
        return this.http.post("/api/v1/lists/".concat(id, "/accounts"), params);
    };
    /**
     * Remove accounts from the given list.
     * @param id ID of the list in the database
     * @param params Parameters
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/timelines/lists/
     */
    ListRepository.prototype.removeAccount = function (id, params) {
        return this.http.delete("/api/v1/lists/".concat(id, "/accounts"), params);
    };
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "getAccountIterator", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "create", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "remove", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "addAccount", null);
    __decorate([
        version({ since: '2.1.0' })
    ], ListRepository.prototype, "removeAccount", null);
    return ListRepository;
}());

var MarkerRepository = /** @class */ (function () {
    function MarkerRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Get saved timeline position
     * @param params Parameters
     * @return Markers
     * @see https://docs.joinmastodon.org/methods/timelines/markers/
     */
    MarkerRepository.prototype.fetch = function (params) {
        return this.http.get('/api/v1/markers', params);
    };
    /**
     * Save position in timeline
     * @param params Parameters
     * @return Markers
     * @see https://github.com/tootsuite/mastodon/pull/11762
     */
    MarkerRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/markers', params);
    };
    __decorate([
        version({ since: '3.0.0' })
    ], MarkerRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '3.0.0' })
    ], MarkerRepository.prototype, "create", null);
    return MarkerRepository;
}());

var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ms); });
};

var timeout = function (task, ms) { return __awaiter(void 0, void 0, void 0, function () {
    var cancellationToken, timeoutPromise, mainPromise;
    return __generator(this, function (_a) {
        if (ms == undefined) {
            return [2 /*return*/, task];
        }
        timeoutPromise = new Promise(function (_, reject) {
            cancellationToken = setTimeout(function () { return void reject(new MastoTimeoutError("Timeout of ".concat(ms, "ms exceeded"))); }, ms);
        });
        mainPromise = task.then(function (value) {
            clearTimeout(cancellationToken);
            return value;
        });
        return [2 /*return*/, Promise.race([timeoutPromise, mainPromise])];
    });
}); };

var MediaAttachmentRepository = /** @class */ (function () {
    function MediaAttachmentRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * @experimental
     * @param id ID of the media
     * @param interval interval of polling
     * @returns Media attachment that has done processing
     */
    MediaAttachmentRepository.prototype.waitFor = function (id, interval) {
        var _this = this;
        var _a;
        if (interval === void 0) { interval = 1000; }
        return timeout((function () { return __awaiter(_this, void 0, void 0, function () {
            var media, processing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(media == undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, delay(interval)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetch(id)];
                    case 2:
                        processing = _a.sent();
                        if (processing.url != undefined) {
                            media = processing;
                        }
                        return [3 /*break*/, 0];
                    case 3: return [2 /*return*/, media];
                }
            });
        }); })(), (_a = this.config.timeout) !== null && _a !== void 0 ? _a : 3000);
    };
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.create = function (_a) {
        var _b = _a.skipPolling, skipPolling = _b === void 0 ? false : _b, params = __rest(_a, ["skipPolling"]);
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.post("/api/v2/media", params, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                    case 1:
                        media = _c.sent();
                        if (skipPolling)
                            return [2 /*return*/, media];
                        return [2 /*return*/, this.waitFor(media.id)];
                }
            });
        });
    };
    /**
     * Fetches an attachment to be used with a new status.
     * @param id ID of the attachment
     * @see https://github.com/tootsuite/mastodon/pull/13210
     */
    MediaAttachmentRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/media/".concat(id));
    };
    /**
     * Update an Attachment, before it is attached to a status and posted.
     * @param id The id of the Attachment entity to be updated
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.update = function (id, _a) {
        var _b = _a.skipPolling, skipPolling = _b === void 0 ? false : _b, params = __rest(_a, ["skipPolling"]);
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.http.put("/api/v1/media/".concat(id), params, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                    case 1:
                        media = _c.sent();
                        if (skipPolling)
                            return [2 /*return*/, media];
                        return [2 /*return*/, this.waitFor(media.id)];
                }
            });
        });
    };
    /**
     * Creates an attachment to be used with a new status.
     * @param params Parameters
     * @return Attachment
     * @see https://docs.joinmastodon.org/methods/statuses/media/
     */
    MediaAttachmentRepository.prototype.v1__create = function (params) {
        return this.http.post("/api/v1/media", params, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
    __decorate([
        version({ since: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], MediaAttachmentRepository.prototype, "update", null);
    __decorate([
        deprecated('Use Masto.media#create instead'),
        version({ since: '0.0.0', until: '3.1.3' })
    ], MediaAttachmentRepository.prototype, "v1__create", null);
    return MediaAttachmentRepository;
}());

var MuteRepository = /** @class */ (function (_super) {
    __extends(MuteRepository, _super);
    function MuteRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Accounts the user has muted.
     * @param params Parameters
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/accounts/mutes/
     */
    MuteRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/mutes', params);
    };
    __decorate([
        version({ since: '0.0.0' })
    ], MuteRepository.prototype, "getIterator", null);
    return MuteRepository;
}(IterableRepository));

var NotificationsRepository = /** @class */ (function (_super) {
    __extends(NotificationsRepository, _super);
    function NotificationsRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * Notifications concerning the user.
     * This API returns Link headers containing links to the next/previous page.
     * However, the links can also be constructed dynamically using query params and `id` values.
     * @param params Query parameter
     * @return Array of Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/notifications', params);
    };
    /**
     * View information about a notification with a given ID.
     * @param id ID of the notification in the database.
     * @return Notification
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/notifications/".concat(id));
    };
    /**
     * Clear all notifications from the server.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.clear = function () {
        return this.http.post('/api/v1/notifications/clear');
    };
    /**
     * Clear a single notification from the server.
     * @param id ID of the notification to be cleared
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/notifications/
     */
    NotificationsRepository.prototype.dismiss = function (id) {
        return this.http.post("/api/v1/notifications/".concat(id, "/dismiss"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], NotificationsRepository.prototype, "clear", null);
    __decorate([
        version({ since: '2.6.0' })
    ], NotificationsRepository.prototype, "dismiss", null);
    return NotificationsRepository;
}(IterableRepository));

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

var PreferenceRepository = /** @class */ (function () {
    function PreferenceRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * Preferences defined by the user in their account settings.
     * @return Preferences by key and value
     * @see https://docs.joinmastodon.org/methods/accounts/preferences/
     */
    PreferenceRepository.prototype.fetch = function () {
        return this.http.get('/api/v1/preferences');
    };
    __decorate([
        version({ since: '2.8.0' })
    ], PreferenceRepository.prototype, "fetch", null);
    return PreferenceRepository;
}());

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

var ReportRepository$1 = /** @class */ (function () {
    function ReportRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * File a report
     * @param params Parameters
     * @return Report
     * @see https://docs.joinmastodon.org/methods/accounts/reports/
     */
    ReportRepository.prototype.create = function (params) {
        return this.http.post('/api/v1/reports', params);
    };
    __decorate([
        version({ since: '1.1.0' })
    ], ReportRepository.prototype, "create", null);
    return ReportRepository;
}());

var ScheduledStatusesRepository = /** @class */ (function (_super) {
    __extends(ScheduledStatusesRepository, _super);
    function ScheduledStatusesRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    /**
     * View scheduled statuses
     * @param params Parameters
     * @return Array of ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, '/api/v1/scheduled_statuses', params);
    };
    /**
     * View a single scheduled status
     * @param id ID of the scheduled status in the database.
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/scheduled_statuses/".concat(id));
    };
    /**
     * Update Scheduled status
     * @param id ID of the Status to be scheduled
     * @param params Parameters
     * @return ScheduledStatus
     * @see https://docs.joinmastodon.org/api/rest/scheduled-statuses/#put-api-v1-scheduled-statuses-id
     */
    ScheduledStatusesRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/scheduled_statuses/".concat(id), params);
    };
    /**
     * Cancel a scheduled status
     * @param id ID of the scheduled status in the database.
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/statuses/scheduled_statuses/
     */
    ScheduledStatusesRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/scheduled_statuses/".concat(id));
    };
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "getIterator", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "update", null);
    __decorate([
        version({ since: '2.7.0' })
    ], ScheduledStatusesRepository.prototype, "remove", null);
    return ScheduledStatusesRepository;
}(IterableRepository));

var StatusRepository = /** @class */ (function () {
    function StatusRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View information about a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id));
    };
    /**
     * Post a new status.
     * @param params Parameters
     * @param idempotencyKey Prevent duplicate submissions of the same status. Idempotency keys are stored for up to 1 hour, and can be any arbitrary string. Consider using a hash or UUID generated client-side.
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    StatusRepository.prototype.create = function (params, idempotencyKey) {
        if (idempotencyKey) {
            return this.http.post('/api/v1/statuses', params, {
                headers: { 'Idempotency-Key': idempotencyKey },
            });
        }
        return this.http.post('/api/v1/statuses', params);
    };
    /**
     * Update a status
     * @param params Parameters
     * @return Status. When scheduled_at is present, ScheduledStatus is returned instead.
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses
     */
    StatusRepository.prototype.update = function (id, params) {
        return this.http.put("/api/v1/statuses/".concat(id), params);
    };
    /**
     * Delete one of your own statuses.
     * @param id Local ID of a status in the database. Must be owned by authenticated account.
     * @return Status with source text and `media_attachments` or `poll`
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/statuses/".concat(id));
    };
    /**
     * View statuses above and below this status in the thread.
     * @param id Local ID of a status in the database.
     * @return Context
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchContext = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/context"));
    };
    /**
     * Preview card
     * @deprecated Use `card` attribute of status instead
     * @param id ID of the status in the database
     * @return Card
     * @see https://docs.joinmastodon.org/api/rest/statuses/#get-api-v1-statuses-id-card
     */
    StatusRepository.prototype.fetchCard = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/card"));
    };
    /**
     * Add a status to your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.favourite = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/favourite"));
    };
    /**
     * Remove a status from your favourites list.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unfavourite = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unfavourite"));
    };
    /**
     * Do not receive notifications for the thread that this status is part of. Must be a thread in which you are a participant.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.mute = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/mute"));
    };
    /**
     * Start receiving notifications again for the thread that this status is part of.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unmute = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unmute"));
    };
    /**
     * View who boosted a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchRebloggedBy = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/reblogged_by"));
    };
    /**
     * View who favourited a given status.
     * @param id Local ID of a status in the database.
     * @return Array of Account
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.fetchFavouritedBy = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/favourited_by"));
    };
    /**
     * Re-share a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/api/rest/statuses/#post-api-v1-statuses-id-reblog
     */
    StatusRepository.prototype.reblog = function (id, params) {
        return this.http.post("/api/v1/statuses/".concat(id, "/reblog"), params);
    };
    /**
     * Undo a re-share of a status.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unreblog = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unreblog"));
    };
    /**
     * Feature one of your own public statuses at the top of your profile.
     * @param id Local ID of a status in the database. The status should be public and authored by the authorized account.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.pin = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/pin"));
    };
    /**
     * Un-feature a status from the top of your profile.
     * @param id Local ID of a status in the database.
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unpin = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unpin"));
    };
    /**
     * Privately bookmark a status.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.bookmark = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/bookmark"));
    };
    /**
     * Remove a status from your private bookmarks.
     * @param id ID of the status in the database
     * @return Status
     * @see https://docs.joinmastodon.org/methods/statuses/
     */
    StatusRepository.prototype.unbookmark = function (id) {
        return this.http.post("/api/v1/statuses/".concat(id, "/unbookmark"));
    };
    StatusRepository.prototype.fetchHistory = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/history"));
    };
    StatusRepository.prototype.fetchSource = function (id) {
        return this.http.get("/api/v1/statuses/".concat(id, "/source"));
    };
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "create", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "update", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "remove", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchContext", null);
    __decorate([
        deprecated('Use `card` attribute of status instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], StatusRepository.prototype, "fetchCard", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "favourite", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "unfavourite", null);
    __decorate([
        version({ since: '1.4.2' })
    ], StatusRepository.prototype, "mute", null);
    __decorate([
        version({ since: '1.4.2' })
    ], StatusRepository.prototype, "unmute", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchRebloggedBy", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "fetchFavouritedBy", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "reblog", null);
    __decorate([
        version({ since: '0.0.0' })
    ], StatusRepository.prototype, "unreblog", null);
    __decorate([
        version({ since: '1.6.0' })
    ], StatusRepository.prototype, "pin", null);
    __decorate([
        version({ since: '1.6.0' })
    ], StatusRepository.prototype, "unpin", null);
    __decorate([
        version({ since: '3.1.0' })
    ], StatusRepository.prototype, "bookmark", null);
    __decorate([
        version({ since: '3.1.0' })
    ], StatusRepository.prototype, "unbookmark", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "fetchHistory", null);
    __decorate([
        version({ since: '3.5.0' })
    ], StatusRepository.prototype, "fetchSource", null);
    return StatusRepository;
}());

var SuggestionRepository = /** @class */ (function (_super) {
    __extends(SuggestionRepository, _super);
    function SuggestionRepository(http, version, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.version = version;
        _this.config = config;
        return _this;
    }
    SuggestionRepository.prototype.getIterator = function (params) {
        return new Paginator(this.http, "/api/v1/blocks", params);
    };
    /**
     * Remove an account from follow suggestions.
     * @param id id of the account in the database to be removed from suggestions
     * @return N/A
     * @see https://docs.joinmastodon.org/methods/accounts/suggestions/
     */
    SuggestionRepository.prototype.remove = function (id) {
        return this.http.delete("/api/v1/suggestions/".concat(id));
    };
    __decorate([
        version({ since: '2.4.3' })
    ], SuggestionRepository.prototype, "remove", null);
    return SuggestionRepository;
}(IterableRepository));

var TimelinesRepository = /** @class */ (function () {
    function TimelinesRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
        // ====
        /**
         * @deprecated Use getHashtagIterable instead.
         */
        this.getTagIterable = this.getHashtagIterable.bind(this);
        /**
         * @deprecated Use getListIterable instead.
         */
        this.getList = this.getListIterable.bind(this);
        /**
         * @deprecated Use getDirectIterable instead.
         */
        this.getDirect = this.getDirectIterable.bind(this);
    }
    Object.defineProperty(TimelinesRepository.prototype, "home", {
        get: function () {
            return this.getHomeIterable();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimelinesRepository.prototype, "public", {
        get: function () {
            return this.getPublicIterable();
        },
        enumerable: false,
        configurable: true
    });
    TimelinesRepository.prototype.getHomeIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/home', params);
    };
    TimelinesRepository.prototype.getPublicIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/public', params);
    };
    TimelinesRepository.prototype.getHashtagIterable = function (hashtag, params) {
        return new Paginator(this.http, "/api/v1/timelines/tag/".concat(hashtag), params);
    };
    TimelinesRepository.prototype.getListIterable = function (id, params) {
        return new Paginator(this.http, "/api/v1/timelines/list/".concat(id), params);
    };
    TimelinesRepository.prototype.getDirectIterable = function (params) {
        return new Paginator(this.http, '/api/v1/timelines/direct', params);
    };
    // ====
    /**
     * View statuses from followed users.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchHome = function (params) {
        return this.getHomeIterable(params).next();
    };
    /**
     * Public timeline
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchPublic = function (params) {
        return this.getPublicIterable(params).next();
    };
    /**
     * View public statuses containing the given hashtag.
     * @param hashtag Content of a #hashtag, not including # symbol.
     * @param params Parameters
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchHashtag = function (hashtag, params) {
        return this.getHashtagIterable(hashtag, params).next();
    };
    /**
     * View statuses in the given list timeline.
     * @param id Local ID of the list in the database.
     * @param params Query parameter
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchList = function (id, params) {
        return this.getListIterable(id, params).next();
    };
    /**
     * View statuses with a “direct” privacy, from your account or in your notifications.
     * @deprecated Use conversations API instead
     * @return Array of Status
     * @see https://docs.joinmastodon.org/methods/timelines/
     */
    TimelinesRepository.prototype.fetchDirect = function (params) {
        return this.getDirectIterable(params).next();
    };
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getHomeIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getPublicIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "getHashtagIterable", null);
    __decorate([
        version({ since: '2.1.0' })
    ], TimelinesRepository.prototype, "getListIterable", null);
    __decorate([
        deprecated('Use conversations API instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], TimelinesRepository.prototype, "getDirectIterable", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchHome", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchPublic", null);
    __decorate([
        version({ since: '0.0.0' })
    ], TimelinesRepository.prototype, "fetchHashtag", null);
    __decorate([
        version({ since: '2.1.0' })
    ], TimelinesRepository.prototype, "fetchList", null);
    __decorate([
        deprecated('Use conversations API instead'),
        version({ since: '0.0.0', until: '2.9.3' })
    ], TimelinesRepository.prototype, "fetchDirect", null);
    return TimelinesRepository;
}());

var TrendRepository = /** @class */ (function () {
    function TrendRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    Object.defineProperty(TrendRepository.prototype, "statuses", {
        get: function () {
            return this.getStatuses();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrendRepository.prototype, "links", {
        get: function () {
            return this.getLinks();
        },
        enumerable: false,
        configurable: true
    });
    TrendRepository.prototype.getStatuses = function (params) {
        return new Paginator(this.http, '/api/v1/trends/statuses', params);
    };
    TrendRepository.prototype.getLinks = function (params) {
        return new Paginator(this.http, '/api/v1/trends/links', params);
    };
    /**
     * Tags that are being used more frequently within the past week.
     * @param params Parameters
     * @return Array of Tag with History
     * @see https://docs.joinmastodon.org/methods/instance/trends/
     */
    TrendRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/trends/tags', params);
    };
    __decorate([
        version({ since: '3.5.0' })
    ], TrendRepository.prototype, "getStatuses", null);
    __decorate([
        version({ since: '3.5.0' })
    ], TrendRepository.prototype, "getLinks", null);
    __decorate([
        version({ since: '3.0.0' })
    ], TrendRepository.prototype, "fetchAll", null);
    return TrendRepository;
}());

var EmailRepository = /** @class */ (function () {
    function EmailRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    EmailRepository.prototype.createConfirmation = function (params) {
        return this.http.post('/api/v1/email/confirmations', params);
    };
    return EmailRepository;
}());

var ReportRepository = /** @class */ (function () {
    function ReportRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View all reports. Pagination may be done with HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/admin/reports', params);
    };
    /**
     * View information about the report with the given ID.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/admin/reports/".concat(id));
    };
    /**
     * Claim the handling of this report to yourself.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.assignToSelf = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/assign_to_self"));
    };
    /**
     * Unassign a report so that someone else can claim it.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.unassign = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/unassign"));
    };
    /**
     * Mark a report as resolved with no further action taken.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.resolve = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/resolve"));
    };
    /**
     * Reopen a currently closed report.
     * @param id ID of the report
     * @return AdminReport
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    ReportRepository.prototype.reopen = function (id) {
        return this.http.post("/api/v1/admin/reports/".concat(id, "/reopen"));
    };
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "assignToSelf", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "unassign", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "resolve", null);
    __decorate([
        version({ since: '2.9.1' })
    ], ReportRepository.prototype, "reopen", null);
    return ReportRepository;
}());

var AccountRepository = /** @class */ (function () {
    function AccountRepository(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
    }
    /**
     * View accounts matching certain criteria for filtering, up to 100 at a time.
     * Pagination may be done with the HTTP Link header in the response.
     * @param params Parameters
     * @return Array of AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.fetchAll = function (params) {
        return this.http.get('/api/v1/admin/accounts', params);
    };
    /**
     * View admin-level information about the given account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.fetch = function (id) {
        return this.http.get("/api/v1/admin/accounts/".concat(id));
    };
    /**
     * Perform an action against an account and log this action in the moderation history.
     * @param id g ID of the account
     * @param params Params
     * @return Account
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.createAction = function (id, params) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/action"), params);
    };
    /**
     * Approve the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.approve = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/approve"));
    };
    /**
     * Reject the given local account if it is currently pending approval.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.reject = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/reject"));
    };
    /**
     * Re-enable a local account whose login is currently disabled.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.enable = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/enable"));
    };
    /**
     * Unsilence a currently silenced account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.unsilence = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/unsilence"));
    };
    /**
     * Unsuspend a currently suspended account.
     * @param id ID of the account
     * @return AdminAccount
     * @see https://docs.joinmastodon.org/methods/admin/
     */
    AccountRepository.prototype.unsuspend = function (id) {
        return this.http.post("/api/v1/admin/accounts/".concat(id, "/unsuspend"));
    };
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "fetchAll", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "fetch", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "createAction", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "approve", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "reject", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "enable", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "unsilence", null);
    __decorate([
        version({ since: '2.9.1' })
    ], AccountRepository.prototype, "unsuspend", null);
    return AccountRepository;
}());

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ReportRepository: ReportRepository,
    AccountRepository: AccountRepository
});

var MastoAdminClient = /** @class */ (function () {
    function MastoAdminClient(http, version, config) {
        this.http = http;
        this.version = version;
        this.config = config;
        this.account = new AccountRepository(this.http, this.version, this.config);
        this.report = new ReportRepository(this.http, this.version, this.config);
    }
    return MastoAdminClient;
}());
/**
 * @deprecated This alias will be removed in v5.0.0
 */
var AdminFacadeRepositories = MastoAdminClient;

var MastoClient = /** @class */ (function () {
    function MastoClient(http, ws, version, config) {
        this.http = http;
        this.ws = ws;
        this.version = version;
        this.config = config;
        this.admin = new MastoAdminClient(this.http, this.version, this.config);
        this.stream = new StreamRepository(this.ws, this.version, this.config);
        this.accounts = new AccountRepository$1(this.http, this.version, this.config);
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
        this.reports = new ReportRepository$1(this.http, this.version, this.config);
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
/**
 * @deprecated This type alias will be removed in v5.x
 */
var FacadeRepositories = MastoClient;

var isObject = function (x) {
    return typeof x === 'object' && x !== null && x.constructor === Object;
};

/**
 * Encodes URI in Rails format
 */
var stringify = function (object) {
    if (object == undefined) {
        return '';
    }
    if (!isObject(object)) {
        return '';
    }
    var values = Object.entries(object)
        .reduce(function (prev, _a) {
        var k = _a[0], v = _a[1];
        if (Array.isArray(v)) {
            var xs = v.map(function (x) { return "".concat(k, "[]=").concat(x); });
            return __spreadArray(__spreadArray([], prev, true), xs, true);
        }
        if (isObject(v)) {
            throw new TypeError('Encoding nested object is not supported');
        }
        return __spreadArray(__spreadArray([], prev, true), ["".concat(k, "=").concat(v)], false);
    }, [])
        .join('&');
    return values;
};
var railsQueryString = { stringify: stringify };

var BaseHttp = /** @class */ (function () {
    function BaseHttp() {
    }
    BaseHttp.prototype.createHeader = function (header) {
        if (header === void 0) { header = {}; }
        var headers = __assign({ 'Content-Type': 'application/json' }, header);
        if (this.config.accessToken) {
            headers['Authorization'] = "Bearer ".concat(this.config.accessToken);
        }
        return headers;
    };
    BaseHttp.prototype.encodeParams = function (params) {
        if (params === void 0) { params = {}; }
        return railsQueryString.stringify(params);
    };
    BaseHttp.prototype.resolveUrl = function (path, params) {
        if (params === void 0) { params = {}; }
        var searchParams = this.encodeParams(params);
        return "".concat(this.config.url).concat(path).concat(searchParams !== '' ? "?".concat(searchParams) : '');
    };
    BaseHttp.prototype.getContentType = function (headers) {
        var _a;
        var contentType = (_a = headers['Content-Type']) !== null && _a !== void 0 ? _a : headers['content-type'];
        if (typeof contentType !== 'string') {
            return;
        }
        return contentType.replace(/\s*;.*$/, '');
    };
    BaseHttp.prototype.get = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'get', url: url, params: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.post = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'post', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.delete = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'delete', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.put = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'put', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    BaseHttp.prototype.patch = function (url, data, init) {
        if (init === void 0) { init = {}; }
        return this.request(__assign({ method: 'patch', url: url, data: data }, init)).then(function (response) { return response.data; });
    };
    return BaseHttp;
}());

var HttpAxiosImpl = /** @class */ (function (_super) {
    __extends(HttpAxiosImpl, _super);
    function HttpAxiosImpl(config, serializer) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.serializer = serializer;
        _this.axios = axios.create({
            baseURL: config.url,
            headers: _this.createHeader(),
            proxy: config.proxy,
            timeout: config.timeout,
            transformRequest: function (data, headers) {
                if (headers == undefined) {
                    throw new MastoError('headers is null');
                }
                var result = _this.serializer.serialize(headers['Content-Type'], data);
                // In Node.js, axios doesn't set boundary data to the header
                // so set it manually by using getHeaders of form-data node.js package
                // https://github.com/form-data/form-data#headers-getheaders-headers-userheaders-
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof (result === null || result === void 0 ? void 0 : result.getHeaders) === 'function') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    headers['Content-Type'] = result.getHeaders()['content-type'];
                }
                return result;
            },
            transformResponse: function (data, headers) {
                if (headers == undefined) {
                    throw new MastoError('headers is null');
                }
                var contentType = _this.getContentType(headers);
                if (contentType == undefined) {
                    throw new MastoError('Content-Type is not defined');
                }
                return _this.serializer.deserialize(contentType, data);
            },
            paramsSerializer: {
                serialize: function (params) { return _this.encodeParams(params); },
            },
        });
        return _this;
    }
    HttpAxiosImpl.prototype.request = function (params) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var config, response, error_1, data;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 2, , 3]);
                        config = {};
                        config.url = params.url;
                        config.method = params.method;
                        if (params.headers) {
                            config.headers = params.headers;
                        }
                        if (params.params) {
                            config.params = params.params;
                        }
                        if (params.data) {
                            config.data = params.data;
                        }
                        return [4 /*yield*/, this.axios.request(config)];
                    case 1:
                        response = _j.sent();
                        return [2 /*return*/, {
                                headers: response.headers,
                                data: response.data,
                            }];
                    case 2:
                        error_1 = _j.sent();
                        // eslint-disable-next-line import/no-named-as-default-member
                        if (!axios.isAxiosError(error_1)) {
                            throw error_1;
                        }
                        data = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data;
                        throw createError({
                            statusCode: (_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _b === void 0 ? void 0 : _b.status,
                            message: data === null || data === void 0 ? void 0 : data.error,
                            details: data === null || data === void 0 ? void 0 : data.errorDescription,
                            description: data === null || data === void 0 ? void 0 : data.details,
                            limit: (_d = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.headers) === null || _d === void 0 ? void 0 : _d['X-RateLimit-Limit'],
                            remaining: (_f = (_e = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _e === void 0 ? void 0 : _e.headers) === null || _f === void 0 ? void 0 : _f['X-RateLimit-Remaining'],
                            reset: (_h = (_g = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h['X-RateLimit-Reset'],
                        });
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return HttpAxiosImpl;
}(BaseHttp));

var HttpNativeImpl = /** @class */ (function (_super) {
    __extends(HttpNativeImpl, _super);
    function HttpNativeImpl(config, serializer) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.serializer = serializer;
        return _this;
    }
    HttpNativeImpl.prototype.request = function (request) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, timeout, proxy, method, data, params, url, headers, reqContentType, body, response, text, resContentType, error_1, data_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.config, timeout = _b.timeout, proxy = _b.proxy;
                        method = request.method, data = request.data, params = request.params;
                        if (proxy != undefined) {
                            // eslint-disable-next-line no-console
                            console.warn('Proxies are not supported on HttpNativeImpl');
                        }
                        if (timeout != undefined) {
                            // eslint-disable-next-line no-console
                            console.warn('Timeouts are not supported on HttpNativeImpl');
                        }
                        url = this.resolveUrl(request.url, params);
                        headers = new Headers(this.createHeader(request.headers));
                        reqContentType = (_a = headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'application/json';
                        body = this.serializer.serialize(reqContentType, data);
                        if (body instanceof FormData &&
                            reqContentType === 'multipart/form-data' &&
                            HttpNativeImpl.hasBlob(body)) {
                            // As multipart form data should contain an arbitrary boundary,
                            // leave Content-Type header undefined, so that fetch() API
                            // automatically configure Content-Type with an appropriate boundary.
                            headers.delete('Content-Type');
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, fetch(url, {
                                method: method,
                                headers: headers,
                                body: body,
                            })];
                    case 2:
                        response = _c.sent();
                        if (!response.ok) {
                            throw response;
                        }
                        return [4 /*yield*/, response.text()];
                    case 3:
                        text = _c.sent();
                        resContentType = this.getContentType(HttpNativeImpl.toHeaders(response.headers));
                        if (resContentType == undefined) {
                            throw new MastoError('Content-Type is not defined');
                        }
                        return [2 /*return*/, {
                                headers: HttpNativeImpl.toHeaders(response.headers),
                                data: this.serializer.deserialize('application/json', text),
                            }];
                    case 4:
                        error_1 = _c.sent();
                        if (!(error_1 instanceof Response)) {
                            throw error_1;
                        }
                        return [4 /*yield*/, error_1.json()];
                    case 5:
                        data_1 = _c.sent();
                        throw createError({
                            statusCode: error_1.status,
                            message: data_1 === null || data_1 === void 0 ? void 0 : data_1.error,
                            details: data_1 === null || data_1 === void 0 ? void 0 : data_1.errorDescription,
                            description: data_1 === null || data_1 === void 0 ? void 0 : data_1.details,
                            limit: error_1.headers.get('X-RateLimit-Limit'),
                            remaining: error_1.headers.get('X-RateLimit-Remaining'),
                            reset: error_1.headers.get('X-RateLimit-Reset'),
                        });
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HttpNativeImpl.toHeaders = function (headers) {
        var result = {};
        for (var _i = 0, _a = Object.entries(headers); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            result[headerCase(key)] = value;
        }
        return result;
    };
    HttpNativeImpl.hasBlob = function (formData) {
        var hasBlob = false;
        // eslint-disable-next-line unicorn/no-array-for-each
        formData.forEach(function (v) { return (hasBlob || (hasBlob = v instanceof Blob)); });
        return hasBlob;
    };
    return HttpNativeImpl;
}(BaseHttp));

var flattenObject = function (object, parent) {
    var _a;
    if (parent === void 0) { parent = ''; }
    if (Array.isArray(object)) {
        return object
            .map(function (value, i) {
            return flattenObject(value, parent !== '' ? "".concat(parent, "[").concat(i, "]") : i.toString());
        })
            .reduce(function (prev, curr) { return Object.assign(prev, curr); }, {});
    }
    if (isObject(object)) {
        return Object.entries(object)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return flattenObject(value, parent !== '' ? "".concat(parent, "[").concat(key, "]") : key);
        })
            .reduce(function (prev, curr) { return Object.assign(prev, curr); }, {});
    }
    // Unit of the monoid is always an object
    return parent !== ''
        ? (_a = {}, _a[parent] = object, _a) : object;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
var fromEntries = function (entries) {
    var object = {};
    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a = entries_1[_i], key = _a[0], value = _a[1];
        object[key] = value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return object;
};
// prettier-ignore
var transformKeys = function (data, transform) {
    if (Array.isArray(data)) {
        return data.map(function (value) { return transformKeys(value, transform); });
    }
    if (isObject(data)) {
        return fromEntries(Object.entries(data).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                transform(key),
                transformKeys(value, transform),
            ];
        }));
    }
    return data;
};

var SerializerNodejsImpl = /** @class */ (function () {
    function SerializerNodejsImpl() {
    }
    SerializerNodejsImpl.prototype.serialize = function (type, rawData) {
        if (rawData == undefined)
            return;
        var data = transformKeys(rawData, snakeCase);
        // prettier-ignore
        switch (type) {
            case 'application/json': {
                return JSON.stringify(data);
            }
            case 'multipart/form-data': {
                var formData = new FormData();
                for (var _i = 0, _a = Object
                    .entries(flattenObject(data)); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    formData.append(key, value);
                }
                return formData;
            }
            case 'application/x-www-form-urlencoded': {
                return new URLSearchParams(data).toString();
            }
            default: {
                return;
            }
        }
    };
    SerializerNodejsImpl.prototype.deserialize = function (type, data) {
        switch (type) {
            case 'application/json': {
                try {
                    return transformKeys(JSON.parse(data), camelCase);
                }
                catch (_a) {
                    return undefined;
                }
            }
            default: {
                throw new Error("Unknown content type ".concat(type, ", ").concat(data));
            }
        }
    };
    return SerializerNodejsImpl;
}());

var SerializerNativeImpl = /** @class */ (function () {
    function SerializerNativeImpl() {
    }
    SerializerNativeImpl.prototype.serialize = function (type, rawData) {
        if (rawData == undefined)
            return;
        var data = transformKeys(rawData, snakeCase);
        // prettier-ignore
        switch (type) {
            case 'application/json': {
                return JSON.stringify(data);
            }
            case 'multipart/form-data': {
                var formData = new FormData();
                for (var _i = 0, _a = Object
                    .entries(flattenObject(data)); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    formData.append(key, value);
                }
                return formData;
            }
            case 'application/x-www-form-urlencoded': {
                return new URLSearchParams(Object.entries(data)).toString();
            }
            default: {
                return;
            }
        }
    };
    SerializerNativeImpl.prototype.deserialize = function (type, data) {
        switch (type) {
            case 'application/json': {
                try {
                    return transformKeys(JSON.parse(data), camelCase);
                }
                catch (_a) {
                    return undefined;
                }
            }
            default: {
                throw new Error("Unknown content type ".concat(type, ", ").concat(data));
            }
        }
    };
    return SerializerNativeImpl;
}());

var BaseWs = /** @class */ (function () {
    function BaseWs() {
    }
    BaseWs.prototype.supportsSecureToken = function () {
        if (this.config.disableVersionCheck) {
            return false;
        }
        // Since v2.8.4, it is supported to pass access token with`Sec-Websocket-Protocol`
        // https://github.com/tootsuite/mastodon/pull/10818
        return (this.version &&
            this.baseUrl.startsWith('wss:') &&
            semver.gte(this.version, '2.8.4', { loose: true }));
    };
    BaseWs.prototype.resolveUrl = function (path, params) {
        if (params === void 0) { params = {}; }
        if (!this.supportsSecureToken()) {
            params.accessToken = this.config.accessToken;
        }
        var query = railsQueryString.stringify(params);
        return this.baseUrl + path + (query !== '' ? "?".concat(query) : '');
    };
    BaseWs.prototype.createProtocols = function (protocols) {
        if (protocols === void 0) { protocols = []; }
        return this.supportsSecureToken() && this.config.accessToken != undefined
            ? __spreadArray([this.config.accessToken], protocols, true) : [];
    };
    return BaseWs;
}());

/**
 * Mastodon streaming api wrapper
 */
var WsEventsNodejsImpl = /** @class */ (function (_super) {
    __extends(WsEventsNodejsImpl, _super);
    function WsEventsNodejsImpl(ws, serializer) {
        var _this = _super.call(this) || this;
        _this.ws = ws;
        _this.serializer = serializer;
        /**
         * Parse JSON data and emit it as an event
         * @param message Websocket message
         */
        _this.handleMessage = function (_a) {
            var data = _a.data;
            var event = _this.serializer.deserialize('application/json', data);
            var args = [];
            try {
                args.push(_this.serializer.deserialize('application/json', event.payload));
            }
            catch (_b) {
                args = [];
            }
            _this.emit.apply(_this, __spreadArray([event.event], args, false));
        };
        return _this;
    }
    /**
     * Connect to the websocket endpoint
     * @param url URL of the websocket endpoint
     * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
     * @param params URL parameters
     */
    WsEventsNodejsImpl.connect = function (url, serializer, protocols) {
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket$1(url, protocols);
            var instance = new WsEventsNodejsImpl(ws, serializer);
            ws.addEventListener('message', instance.handleMessage);
            ws.addEventListener('error', reject);
            ws.addEventListener('open', function () { return resolve(instance); });
        });
    };
    /**
     * Disconnect from the websocket endpoint
     */
    WsEventsNodejsImpl.prototype.disconnect = function () {
        if (!this.ws)
            return;
        this.ws.close();
    };
    return WsEventsNodejsImpl;
}(EventEmitter));
var WsNodejsImpl = /** @class */ (function (_super) {
    __extends(WsNodejsImpl, _super);
    function WsNodejsImpl(baseUrl, version, config, serializer) {
        var _this = _super.call(this) || this;
        _this.baseUrl = baseUrl;
        _this.version = version;
        _this.config = config;
        _this.serializer = serializer;
        return _this;
    }
    WsNodejsImpl.prototype.stream = function (path, params) {
        if (params === void 0) { params = {}; }
        return WsEventsNodejsImpl.connect(this.resolveUrl(path, params), this.serializer, this.createProtocols());
    };
    return WsNodejsImpl;
}(BaseWs));

/**
 * Mastodon streaming api wrapper
 */
var WsEventsNativeImpl = /** @class */ (function (_super) {
    __extends(WsEventsNativeImpl, _super);
    function WsEventsNativeImpl(ws, serializer) {
        var _this = _super.call(this) || this;
        _this.ws = ws;
        _this.serializer = serializer;
        /**
         * Parse JSON data and emit it as an event
         * @param message Websocket message
         */
        _this.handleMessage = function (_a) {
            var data = _a.data;
            var event = _this.serializer.deserialize('application/json', data);
            var args = [];
            try {
                args.push(_this.serializer.deserialize('application/json', event.payload));
            }
            catch (_b) {
                args = [];
            }
            _this.emit.apply(_this, __spreadArray([event.event], args, false));
        };
        return _this;
    }
    /**
     * Connect to the websocket endpoint
     * @param url URL of the websocket endpoint
     * @param protocols Subprotocol(s) for `Sec-Websocket-Protocol`
     * @param params URL parameters
     */
    WsEventsNativeImpl.connect = function (url, serializer, protocols) {
        return new Promise(function (resolve, reject) {
            var ws = new WebSocket(url, protocols);
            var instance = new WsEventsNativeImpl(ws, serializer);
            ws.addEventListener('message', instance.handleMessage);
            ws.addEventListener('error', reject);
            ws.addEventListener('open', function () { return resolve(instance); });
        });
    };
    /**
     * Disconnect from the websocket endpoint
     */
    WsEventsNativeImpl.prototype.disconnect = function () {
        if (!this.ws)
            return;
        this.ws.close();
    };
    return WsEventsNativeImpl;
}(EventEmitter));
var WsNativeImpl = /** @class */ (function (_super) {
    __extends(WsNativeImpl, _super);
    function WsNativeImpl(baseUrl, version, config, serializer) {
        var _this = _super.call(this) || this;
        _this.baseUrl = baseUrl;
        _this.version = version;
        _this.config = config;
        _this.serializer = serializer;
        return _this;
    }
    WsNativeImpl.prototype.stream = function (path, params) {
        if (params === void 0) { params = {}; }
        return WsEventsNativeImpl.connect(this.resolveUrl(path, params), this.serializer, this.createProtocols());
    };
    return WsNativeImpl;
}(BaseWs));

var index = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var login = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var serializer, http, instance, ws;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                serializer = new SerializerNodejsImpl();
                http = new HttpAxiosImpl(config, serializer);
                return [4 /*yield*/, new InstanceRepository(http, '1.0.0', config).fetch()];
            case 1:
                instance = _a.sent();
                ws = new WsNodejsImpl(instance.urls.streamingApi, instance.version, config, serializer);
                return [2 /*return*/, new MastoClient(http, ws, instance.version, config)];
        }
    });
}); };

export { AccountRepository$1 as AccountRepository, index as Admin, AdminFacadeRepositories, index$1 as AdminRepositories, AnnouncementRepository, AppRepository, BaseHttp, BlockRepository, BookmarkRepository, ConversationRepository, CustomEmojiRepository, DirectoryRepository, DomainBlockRepository, EmailRepository, EndorsementRepository, FacadeRepositories, FavouriteRepository, FeaturedTagRepository, FilterRepository, FollowRequestRepository, HttpAxiosImpl, HttpNativeImpl, InstanceRepository, IterableRepository, ListRepository, MarkerRepository, MastoAdminClient, MastoClient, MastoConflictError, MastoError, MastoForbiddenError, MastoGoneError, MastoNotFoundError, MastoRateLimitError, MastoTimeoutError, MastoUnauthorizedError, MastoUnprocessableEntityError, MediaAttachmentRepository, MuteRepository, NotificationsRepository, Paginator, PollRepository, PreferenceRepository, PushSubscriptionsRepository, ReportRepository$1 as ReportRepository, ScheduledStatusesRepository, SerializerNativeImpl, SerializerNodejsImpl, StatusRepository, StreamRepository, SuggestionRepository, TimelinesRepository, TrendRepository, WsEventsNativeImpl, WsEventsNodejsImpl, WsNativeImpl, WsNodejsImpl, createError, deprecated, login, version };
