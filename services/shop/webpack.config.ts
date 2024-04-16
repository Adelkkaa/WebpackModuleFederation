import path from "path";
import webpack from "webpack";
import {
  buildWebpack,
  IBuildPaths,
  IEnvVariables,
} from "@packages/build-config";
import packageJson from "./package.json";

export default (env: IEnvVariables) => {
  const paths: IBuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3001,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? "desktop",
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop", // Название самого микрофронта
      filename: "remoteEntry.js", // Название файла, который будет удаленно подключаться к главному контейнеру
      // В exposes указывается ЧТО мы хотим предоставить нашему приложению контейнеру (главному)
      exposes: {
        "./Router": "./src/router/Router.tsx", // Это та часть приложения которую мы будем внедрять в наш host контейнер
      },
      // В shared указываются общие зависимости
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, // Данное свойство говорит о том, что эту библиотеку стоит подтянуть сразу без ленивой подгрузки
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true, // Данное свойство говорит о том, что эту библиотеку стоит подтянуть сразу без ленивой подгрузки
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true, // Данное свойство говорит о том, что эту библиотеку стоит подтянуть сразу без ленивой подгрузки
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );
  return config;
};
