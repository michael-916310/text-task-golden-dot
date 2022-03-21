import { DTODay } from './dto';

const loadDayData = async (date: Date): Promise<DTODay> => {
  let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
  if (date) {
    const m: number = date.getMonth() + 1;
    const mm: string = m <= 9 ? `0${m}` : `${m}`;
    const d: number = date.getDate();
    const dd: string = d <= 9 ? `0${d}` : `${d}`;
    url = `https://www.cbr-xml-daily.ru//archive//${date.getFullYear()}//${mm}//${dd}//daily_json.js`;
  }

  const resp = await fetch(url);
  return await resp.json();
};

export { loadDayData };
