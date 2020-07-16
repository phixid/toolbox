export const range = (x: number, y?: number) => {
  const arrayLength = y === undefined ? Math.abs(x) : Math.abs(y - x);
  const nonIterableArray = Array(arrayLength);
  const iterableArray = Array.from(nonIterableArray);

  return iterableArray.map((element, index) => {
    if (y === undefined) return x > 0 ? index : 0 - index;
    return y > x ? index + x : x - index;
  });
};
