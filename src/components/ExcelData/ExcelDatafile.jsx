import { utils as XLSXUtils, writeFile as writeXLSXFile } from 'xlsx';

const edata = (data, fileName) => {
  const ws = XLSXUtils.json_to_sheet(data);
  const wb = XLSXUtils.book_new();
  XLSXUtils.book_append_sheet(wb, ws, 'Sheet1');
  writeXLSXFile(wb, `${fileName}.xlsx`);
};

export default edata;
