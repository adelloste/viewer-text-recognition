export const segmentation = (values: number[]) => {
  return values.reduce((result: { x: number; y: number }[], value, index, array) => {
    if (index % 2 === 0) {
      const sl = array.slice(index, index + 2);
      result.push({ x: sl[0], y: sl[1] });
    }
    return result;
  }, []);
};

export const flattenSegmentation = (values: { x: number; y: number }[]) => {
  return values.reduce((result: number[], value) => {
    return [...result, ...Object.values(value)];
  }, []);
};
