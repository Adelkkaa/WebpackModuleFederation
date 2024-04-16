import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, DefinePlugin } from "webpack";
import { IOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platform,
}: IOptions): Configuration["plugins"] {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html, // Путь до index.html файла
      favicon: path.resolve(paths.public, "favicon.ico"),
      publicPath: '/'
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css", // Название файла, чтобы не было коллизий
        chunkFilename: "css/[name].[contenthash:8].css", // Название чанка
      }),
      new CopyPlugin({
        patterns: [
          { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
        ],
      })
    );
  }

  if (isDev) {
    plugins.push(
      new DefinePlugin({
        __PLATFORM__: JSON.stringify(platform),
      }),
      // new ForkTsCheckerWebpackPlugin(),
      new ReactRefreshWebpackPlugin()
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
