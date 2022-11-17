/**
 * Decorator that verifies the version of the Mastodon instance
 * @param parameters Optional params
 */
export var deprecated = function (message) {
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
