import app from "./app";

const PORT = Number(process.env.PORT) || 3000;
const API_URL: string = process.env.API_URL || "0.0.0.0";

console.log(typeof PORT, typeof API_URL);

app.listen(PORT, API_URL, () => {
  console.log(`Server is running on port ${API_URL}:${PORT}`);
});
