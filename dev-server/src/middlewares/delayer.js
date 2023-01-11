export const delayer = delay => (req, res, next) => {
  setTimeout(next, delay);
};
