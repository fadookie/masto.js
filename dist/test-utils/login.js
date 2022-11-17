import { login as originalLogin } from '../src/entrypoints/nodejs';
export var login = function (options) {
    var unauthenticated = options === null || options === void 0 ? void 0 : options.unauthenticated;
    return originalLogin({
        timeout: 1000 * 30,
        url: process.env.MASTODON_URL,
        accessToken: !unauthenticated
            ? process.env.MASTODON_TOKEN
            : undefined,
    });
};
