import { IOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestId";

export const buildBabelLoader = (options: IOptions) => {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const plugins = [];

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ["data-testid"],
      },
    ]);
  }

  return {
    test: /\.tsx?$/, // Формат расширения файла подходящий для этого loader
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }], // Свойство runtime нужно для devServer
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
};
