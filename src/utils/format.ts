import BigNumber from 'bignumber.js';

export const formatWalletAddress = (
  address: string | undefined,
) => {
  const startShownDigit = 7;
  const endShownDigit = 5;
  if (!address) return '';
  const start = address.slice(0, startShownDigit);
  const end = address.slice(endShownDigit * -1);
  return `${start}.....${end}`;
};

export const formatDateTime = (unixTime: number | string): string => {
  const date = new Date(Number(unixTime) * 1000);
  const padZero = (num: number): string => num.toString().padStart(2, '0');
  // yyyy/MM/dd HH:mm (UTC)
  return `${date.getUTCFullYear()}/${padZero(date.getUTCMonth() + 1)}/${padZero(
    date.getUTCDate()
  )} ${padZero(date.getUTCHours())}:${padZero(date.getUTCMinutes())} (UTC)`;
};

export const formatNumber = (num: string, decimal = 4): string => {
  // BigNumberで小数点以下を切り捨てる
  const bigNum = new BigNumber(num).decimalPlaces(
    decimal,
    BigNumber.ROUND_DOWN
  );

  // 小数点以下の桁数が指定されている場合のフォーマット
  const parts = bigNum.toFixed(decimal).split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1].replace(/0+$/, '')}` : '';

  // 整数部分をカンマ区切りに変換
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );

  // 小数点以下が存在しない場合、小数点部分を空文字にする
  const formattedNumber =
    decimalPart === '.'
      ? formattedIntegerPart
      : formattedIntegerPart + decimalPart;

  return formattedNumber;
};

export const formatWeiNumber = (wei: string, decimal = 4): string => {
  const eth = new BigNumber(wei).dividedBy(new BigNumber(10).pow(18));
  return formatNumber(eth.toString(), decimal);
};
