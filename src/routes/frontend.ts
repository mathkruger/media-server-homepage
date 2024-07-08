import { Router, static as staticFiles } from "express";
import path from "path";

const frontendRoutes = Router();

const STATIC_PATH = path.join(__dirname, "../public");

frontendRoutes.use(staticFiles(STATIC_PATH));
frontendRoutes.get("*", (_, res) => {
  res.sendFile(path.join(STATIC_PATH, "index.html"));
});

export default frontendRoutes;
