import http from "http";
import url from "url";
import path from "path";
import fs from "fs/promises";

const PORT = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html");
        res.statusCode = 200;
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html");
        res.statusCode = 200;
      } else if (req.url === "/contact") {
        filePath = path.join(__dirname, "public", "contact-me.html");
        res.statusCode = 200;
      } else {
        filePath = path.join(__dirname, "public", "404.html");
        res.statusCode = 404;
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  } catch {}
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
