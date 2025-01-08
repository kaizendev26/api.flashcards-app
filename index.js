import app from "./src/app.js";
import { PORT } from "./src/config.js";

app.listen(PORT);
console.log("server runing in port " + PORT);

module.exports = app;
