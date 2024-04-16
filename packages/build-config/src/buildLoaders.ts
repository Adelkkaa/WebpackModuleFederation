import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { IOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: IOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      esModule: false, // Добавляем это свойство для того, чтобы дефолтный импорт работал import classname from './что-то/Что-то.module.scss'
      modules: {
        auto: (resPath: string) => Boolean(resPath.includes(".module.")), // Добавляем этот параметр для того, чтобы обычные стили по типу New.scss работали и применялись, если так не сделать, cssLoader будет просто выполнять преобразования и классы не будут применяться
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true, // данный параметр нужен для того, чтобы работать с размерами свг напрямую, а не с размером контейнера, в котором находится svg
          // Данная цепочка нужна для того, чтобы цвет svg можно было менять напрямую
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/, // Формат расширения файла подходящий для этого loader
    use: [
      {
        loader: "ts-loader", // Название лоадера для этой регулярки
        options: {
          transpileOnly: isDev ? true : false, // Параметр, который позволяет не ломать сборку, если есть ошибки в ts,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      },
    ],
    exclude: /node_modules/, // Файлы которые исключаем
  };

  const babelLoader = buildBabelLoader(options);

  return [svgLoader, assetLoader, scssLoader, tsLoader];
}
