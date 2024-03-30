export const objectToQueryString = (
  obj: Record<string, string | number | undefined>
) =>
  Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
