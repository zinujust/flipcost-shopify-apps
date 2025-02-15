export const PORT: string | undefined = process.env.PORT;
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : `${process.env.API_URL_DEV}:${PORT}`;
