var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { login } from '../test-utils/login';
describe('account', function () {
    var client;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, login()];
                case 1:
                    client = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('verifies credential', function () { return __awaiter(void 0, void 0, void 0, function () {
        var me;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.accounts.verifyCredentials()];
                case 1:
                    me = _a.sent();
                    expect(me.username).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates credential', function () { return __awaiter(void 0, void 0, void 0, function () {
        var random, me;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    random = Math.random().toString();
                    return [4 /*yield*/, client.accounts.updateCredentials({
                            displayName: random,
                        })];
                case 1:
                    me = _a.sent();
                    expect(me.displayName).toBe(random);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fetches an account with ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var me, someone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.accounts.verifyCredentials()];
                case 1:
                    me = _a.sent();
                    return [4 /*yield*/, client.accounts.fetch(me.id)];
                case 2:
                    someone = _a.sent();
                    expect(me.id).toBe(someone.id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can follow / unfollow by ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var relationship;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.accounts.follow('200896')];
                case 1:
                    relationship = _a.sent();
                    expect(relationship.following).toBe(true);
                    return [4 /*yield*/, client.accounts.unfollow('200896')];
                case 2:
                    relationship = _a.sent();
                    expect(relationship.following).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can block / unblock by ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var relationship;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.accounts.block('200896')];
                case 1:
                    relationship = _a.sent();
                    expect(relationship.blocking).toBe(true);
                    return [4 /*yield*/, client.accounts.unblock('200896')];
                case 2:
                    relationship = _a.sent();
                    expect(relationship.blocking).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    // it('can pin / unpin by ID', async () => {
    //   await client.accounts.follow('200896');
    //   let relationship = await client.accounts.pin('200896');
    //   expect(relationship.endorsed).toBe(true);
    //   relationship = await client.accounts.unpin('200896');
    //   await client.accounts.unfollow('200896');
    //   expect(relationship.endorsed).toBe(false);
    // });
    it('can mute / unmute by ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var relationship;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.accounts.mute('200896')];
                case 1:
                    relationship = _a.sent();
                    expect(relationship.muting).toBe(true);
                    return [4 /*yield*/, client.accounts.unmute('200896')];
                case 2:
                    relationship = _a.sent();
                    expect(relationship.muting).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can create a note', function () { return __awaiter(void 0, void 0, void 0, function () {
        var comment, relationship;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment = Math.random().toString();
                    return [4 /*yield*/, client.accounts.createNote('200896', {
                            comment: comment,
                        })];
                case 1:
                    relationship = _a.sent();
                    expect(relationship.note).toBe(comment);
                    return [2 /*return*/];
            }
        });
    }); });
});
