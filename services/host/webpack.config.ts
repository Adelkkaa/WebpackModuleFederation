import path from "path";
import webpack from "webpack";
import {
  buildWebpack,
  IBuildPaths,
  IEnvVariables,
} from "@packages/build-config";
import packageJson from './package.json'


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
    port: env.port ?? 3000,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? "desktop",
    paths,
  });

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host',
    filename: 'remoteEntry.js',

    // Адреса на которых крутятся наши микрофронты по структуре [name]@[адрес на котором крутится микрофронт]/[filename]
    remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
    },
    shared: {
        ...packageJson.dependencies,
        react: {
            eager: true,
            // requiredVersion: packageJson.dependencies['react'],
        },
        'react-router-dom': {
            eager: true,
            // requiredVersion: packageJson.dependencies['react-router-dom'],
        },
        'react-dom': {
            eager: true,
            // requiredVersion: packageJson.dependencies['react-dom'],
        },
    },
}))
  return config;
};
