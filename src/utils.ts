export const query = {
  stringify(params: Record<string, string | number | boolean>) {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  },
  parse(params: string) {
    return params
      .split("&")
      .reduce((acc: Record<string, string | number>, pair: string) => {
        const [key, value] = pair.split("=");
        const decodedValue = decodeURIComponent(value);
        acc[decodeURIComponent(key)] = isNaN(Number(decodedValue))
          ? decodedValue
          : Number(decodedValue);
        return acc;
      }, {});
  },
};

export const trim = (input: string) => {
  let cleaned = input.replace(/<[^>]+>/g, "");
  cleaned = cleaned.trim();
  while (/[^a-zA-Z0-9\u4e00-\u9fa5]$/.test(cleaned)) {
    cleaned = cleaned.slice(0, -1).trim();
  }
  return cleaned;
};
