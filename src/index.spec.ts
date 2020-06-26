import { testString } from './index';

describe('Model validator', () => {
    test('succeeds', () => {
        expect(testString).toEqual('Hello world!');
    });
});
