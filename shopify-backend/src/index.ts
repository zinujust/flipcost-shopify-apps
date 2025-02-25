import app from "./app";

app.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
