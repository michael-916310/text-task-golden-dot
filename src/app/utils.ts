const getKeyFromDate = (date: Date) => {
  const m: number = date.getMonth() + 1;
  const mm: string = m <= 9 ? `0${m}` : `${m}`;
  const d: number = date.getDate();
  const dd: string = d <= 9 ? `0${d}` : `${d}`;

  return `${date.getFullYear()}-${mm}-${dd}`;
};

const getLastExistingDate = (source: Record<string, any>): Date | null => {
  if (!Object.keys(source).length) {
    return null;
  }

  let lastDate: Date | undefined;
  let curDate = new Date();

  while (!lastDate) {
    const curKey = getKeyFromDate(curDate);
    if (source[curKey] && source[curKey].length) {
      lastDate = curDate;
    } else {
      curDate.setDate(curDate.getDate() - 1);
    }
  }
  return lastDate;
};

const getLast10Days = (baseDate = new Date()) => {
  const result: Array<Date> = [];
  for (let i = 0; i < 10; i++) {
    let curDate: Date = new Date(baseDate);
    curDate.setDate(curDate.getDate() - i);
    result.push(curDate);
  }
  return result;
};

export { getKeyFromDate, getLastExistingDate, getLast10Days };
