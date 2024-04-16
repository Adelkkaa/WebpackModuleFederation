import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { IOptions } from "./types/types";

export function buildDevServer({ port }: IOptions): DevServerConfiguration {
  return {
    port: port, // Порт на котором будет запускаться devServer
    open: true, // Необходим для автоматического открытия браузера
    historyApiFallback: true,
    hot: true, // Настройка для HMR, которая работает в обычном JS, но не реакт
  };
}
