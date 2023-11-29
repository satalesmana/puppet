export function useSum(a: number, b: number) {
  return a + b;
}

export function useCheckExpiry(exp: number) {
  return Math.floor(new Date().getTime() / 1000) >= exp;
}
