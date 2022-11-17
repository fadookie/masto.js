/* eslint-disable unicorn/no-null */
import { railsQueryString } from './rails-querystring';
describe('railsQueryString', function () {
    it('encodes null', function () {
        var result = railsQueryString.stringify(null);
        expect(result).toBe('');
    });
    it('encodes an empty object', function () {
        var result = railsQueryString.stringify({});
        expect(result).toBe('');
    });
    it('encodes a basic record', function () {
        var result = railsQueryString.stringify({ key: 'value' });
        expect(result).toBe('key=value');
    });
    it('encodes a record with multiple values', function () {
        var result = railsQueryString.stringify({
            key1: 'value1',
            key2: 'value2',
        });
        expect(result).toBe('key1=value1&key2=value2');
    });
    it('encodes an array inside a record', function () {
        var result = railsQueryString.stringify({
            key1: 'value1',
            key2: 'value2',
            key3: ['apple', 'facebook', 'microsoft'],
        });
        expect(result).toBe('key1=value1&key2=value2&key3[]=apple&key3[]=facebook&key3[]=microsoft');
    });
});
