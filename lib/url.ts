/** "https://www.example.com/path" → "example.com"; falls back to the input. */
export const hostOf = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
};
