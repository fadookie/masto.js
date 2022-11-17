var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { MastoConflictError } from './masto-conflict-error';
import { MastoError } from './masto-error';
import { MastoForbiddenError } from './masto-forbidden-error';
import { MastoGoneError } from './masto-gone-error';
import { MastoNotFoundError } from './masto-not-found-error';
import { MastoRateLimitError } from './masto-rate-limit-error';
import { MastoUnauthorizedError } from './masto-unauthorized-error';
import { MastoUnprocessableEntityError } from './masto-unprocessable-entity-error';
export var createError = function (params) {
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
