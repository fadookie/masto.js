import { HttpMockImpl, httpPost } from '../../http/http-mock-impl';
import { EmailRepository } from '../email-repository';
describe('email', function () {
    var mockHttp = new HttpMockImpl();
    var email = new EmailRepository(mockHttp, '999.0.0', {
        url: 'https://example.com',
    });
    test('create confirmations', function () {
        email.createConfirmation({ email: 'foo@example.com' });
        expect(httpPost.mock.calls[0][0]).toBe('/api/v1/email/confirmations');
        expect(httpPost.mock.calls[0][1]).toStrictEqual({
            email: 'foo@example.com',
        });
    });
});
