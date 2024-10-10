import { handleStaticFiles } from "./static-files-serve.mjs";

export function handleRoute(req, routes) {
  const controllerToRun = routes.find(
    (x) => x.method === req.method && req.url.endsWith(x.path)
  );

  if (!controllerToRun) {
    return handleStaticFiles;
  }

  return controllerToRun.controller;
}
