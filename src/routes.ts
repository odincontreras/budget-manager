import express from "express";
import fs from "fs";
import path from "path";

const routes = express.Router();

const addRoutes = async () => {
  const modulesPath = path.join(__dirname, "modules");
  const folderExecution = __dirname.split("/").pop();

  const fileExtension = folderExecution === "src" ? "ts" : "js";

  const modules = fs.readdirSync(modulesPath);

  for (const module of modules) {
    const routerPath = path.join(
      `${modulesPath}`,
      `${module}`,
      `${module}.routes.${fileExtension}`,
    );

    const existRouterPath = fs.existsSync(routerPath);

    if (existRouterPath) {
      import(routerPath).then((moduleRouter) => {
        if (moduleRouter.default) {
          routes.use(`/${module}`, moduleRouter.default);
        }
      });
    }
  }
};

addRoutes();

export default routes;
