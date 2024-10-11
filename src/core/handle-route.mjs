import { checkUserAuthenticated } from "./authorization.mjs";
import { handleStaticFiles } from "./static-files-serve.mjs";

export async function handleRoute(req, routes) {
  const controllerToRun = routes.find(
    (x) => x.method === req.method && req.url.endsWith(x.path)
  );

  if (!controllerToRun) {
    return handleStaticFiles;
  }

  if (controllerToRun.auth) {
    const authenticated = await checkUserAuthenticated(req);
    
    if (!authenticated) {
      return (_, res) => {
        res.writeHead(401, { "WWW-Authenticate": 'Basic realm="nope"' });
        res.end("HTTP Error 401 Unauthorized: Access is denied");
      }
    }
  }

  return controllerToRun.controller;
}
