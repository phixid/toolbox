import { KeyValueStore } from './key-value-store';

const testStore = new KeyValueStore();

describe('keyValueStore', () => {
  describe('set method', () => {
    test('returns a Promise', () => {
      const setResult = testStore.set('test', true);
      expect(typeof setResult.then).toEqual('function');
    });

    test('can not override constructor or __proto__ of store', async () => {
      const overrideConstructor = await testStore.set('constructor', 'test');
      const overrideProto = await testStore.set('__proto__', 'test');
      expect(overrideConstructor).toEqual('Store error: can not override constructor');
      expect(overrideProto).toEqual('Store error: can not override __proto__');
    });
  });

  // describe('get method', () => {});
  // describe('delete method', () => {});
  // describe('clear method', () => {});
});
