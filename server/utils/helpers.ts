export function useSum(a: number, b: number) {
  return a + b;
}

export function useCheckExpiry(exp: number) {
  return Math.floor(new Date().getTime() / 1000) >= exp;
}

export function useAutoNumber(lastNumber: number, initial: string) {
  const newNumber = lastNumber + 1;
  const length = newNumber.toString.length;

  const emptyValue = (maxloop: number) => {
    let zero = '';
    for (let i = 1; i <= maxloop; i++) {
      zero += '0';
    }
    return zero;
  };

  const zeroSpace = emptyValue(8 - length);

  return `${initial}-${zeroSpace}${newNumber}`;
}

export const useLogMessages = (message: String) => {
  const d = new Date();
  const dateTime = d.toLocaleString();

  return `[${dateTime}] ${message}`;
};

export const useSleep = (ms: number = 5000) => {
  setTimeout(() => {}, ms);
};
