import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { IOptions } from "./types/types";

export function buildWebpack(options: IOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    entry: paths.entry, // Путь для точки входа в наше приложение, то есть главный index.js файл
    mode: mode, // Мод для сборки, бывают "production" | "development"
    output: {
      path: paths.output, // Здесь указывается куда будет складываться сгенерированный файл
      filename: "[name].[contenthash].js", // Название сгенерированного файла. [name] - для динамической генерации названия, но самое главное уникальный [contenthash], если файл изменится, то contenthash тоже поменяется, отсюда решается проблема коллизий
      clean: true, // Удаляет старые файлы перед тем как туда положить новые
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : false, // Данный параметр помогает отслеживать ошибки, а именно в каком файле произошла ошибка
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
