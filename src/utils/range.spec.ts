import { range } from './range';

describe('range', () => {
  test('returns an array with length x - y', () => {
    const rangeOneToThree = range(1, 6);

    expect(Array.isArray(rangeOneToThree)).toEqual(true);
    expect(rangeOneToThree.length).toEqual(5);
  });

  test('returns array of values starting from x to y (not including y)', () => {
    expect(range(5, 10)).toEqual([5, 6, 7, 8, 9]);
  });

  test('handles x being bigger than y', () => {
    expect(range(10, 5)).toEqual([10, 9, 8, 7, 6]);
  });

  test('handles negative x', () => {
    expect(range(-2, 3)).toEqual([-2, -1, 0, 1, 2]);
  });

  test('handles negative y', () => {
    expect(range(2, -3)).toEqual([2, 1, 0, -1, -2]);
  });

  test('handles x being 0', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(0, -5)).toEqual([0, -1, -2, -3, -4]);
  });

  test('handles y being 0', () => {
    expect(range(5, 0)).toEqual([5, 4, 3, 2, 1]);
    expect(range(-5, 0)).toEqual([-5, -4, -3, -2, -1]);
  });

  test('handles y being undefined', () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(-5)).toEqual([0, -1, -2, -3, -4]);
  });
});
