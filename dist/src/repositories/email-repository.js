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
export { EmailRepository };
