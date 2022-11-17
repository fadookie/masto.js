export var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(); }, ms); });
};
