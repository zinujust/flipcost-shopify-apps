import app from "./app"; // Ensure the correct path to the app module

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log("Server is running on port: ", port);
});
