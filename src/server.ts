import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import routeHandler from "./routes/route";
import config from "./confiq/index";
const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log("request:",req);
    /*    console.log("response:",res) */
    /* console.log(req.method, req.url); */
    routeHandler(req, res);
  },
);

server.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
