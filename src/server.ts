import app from "./app";

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 4000);
  app.listen(port, () => {
    console.log(`EFOZone API listening on port ${port}`);
  });
}
