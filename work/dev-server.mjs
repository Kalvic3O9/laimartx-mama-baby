import { createServer } from "node:http";
import next from "next";

const port = Number(process.env.PORT || 3000);
const hostname = "0.0.0.0";
const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

createServer((req, res) => {
  handle(req, res);
}).listen(port, hostname, () => {
  console.log(`Laimartx preview ready on http://localhost:${port}`);
});
