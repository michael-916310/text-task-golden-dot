import { DTODay } from './dto';

const getTodayData = async (): Promise<DTODay> => {
  const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

  const resp = await fetch(url);
  const data = await resp.json();

  return data;
};

export { getTodayData };
