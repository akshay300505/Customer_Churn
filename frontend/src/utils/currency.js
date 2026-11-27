/**
 * Multi-Currency Engine with Real Exchange Rates relative to USD base
 */

export const CURRENCIES = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rate: 1.0,
    flag: "🇺🇸",
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    rate: 83.5,
    flag: "🇮🇳",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rate: 0.92,
    flag: "🇪🇺",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rate: 0.79,
    flag: "🇬🇧",
  },
  CAD: {
    code: "CAD",
    symbol: "CA$",
    name: "Canadian Dollar",
    rate: 1.36,
    flag: "🇨🇦",
  },
  AUD: {
    code: "AUD",
    symbol: "AU$",
    name: "Australian Dollar",
    rate: 1.52,
    flag: "🇦🇺",
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    rate: 151.8,
    flag: "🇯🇵",
  },
};

/**
 * Converts a base USD amount into the target currency using the exchange formula:
 * Converted Amount = Amount in USD × Exchange Rate
 */
export const convertCurrency = (amountInUsd = 0, targetCurrencyCode = "USD") => {
  const num = typeof amountInUsd === "number" ? amountInUsd : parseFloat(amountInUsd) || 0;
  const curr = CURRENCIES[targetCurrencyCode] || CURRENCIES.USD;
  return num * curr.rate;
};

/**
 * Formats a base USD amount into a localized currency string with proper symbol
 */
export const formatCurrency = (amountInUsd = 0, targetCurrencyCode = "USD", options = {}) => {
  const num = typeof amountInUsd === "number" ? amountInUsd : parseFloat(amountInUsd) || 0;
  const curr = CURRENCIES[targetCurrencyCode] || CURRENCIES.USD;
  const converted = num * curr.rate;

  const decimals =
    options.decimals !== undefined
      ? options.decimals
      : curr.code === "JPY"
      ? 0
      : converted > 1000
      ? 0
      : 2;

  const formattedNum = converted.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${curr.symbol}${formattedNum}`;
};
