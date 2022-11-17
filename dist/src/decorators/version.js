import semver from 'semver';
import { MastoNotFoundError } from '../errors';
/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
export var version = function (_a) {
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
