import { camelCase } from 'change-case';
import { transformKeys } from './transform-keys';
describe('transformKeys', function () {
    it('transforms a flat object', function () {
        expect(transformKeys({
            key: 'value',
            key_key: ['value', 'value'],
            key_key_key: 3,
        }, camelCase)).toEqual({
            key: 'value',
            keyKey: ['value', 'value'],
            keyKeyKey: 3,
        });
    });
    it('transforms a deep object', function () {
        expect(transformKeys({
            key: {
                key_key: {
                    key_key_key: 'value',
                },
            },
        }, camelCase)).toEqual({
            key: { keyKey: { keyKeyKey: 'value' } },
        });
    });
    it('transforms a deep object inside an array', function () {
        expect(transformKeys([{ key_one: 'value' }], camelCase)).toEqual([
            {
                keyOne: 'value',
            },
        ]);
    });
    it('transforms a array inside an object', function () {
        expect(transformKeys({
            key_one: [
                {
                    value_one: 'value',
                },
            ],
        }, camelCase)).toEqual({
            keyOne: [{ valueOne: 'value' }],
        });
    });
});
