export type IBuildPaths = {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
};

export type IBuildMode = "production" | "development";
export type IPlatform = "mobile" | "desktop";

export type IEnvVariables = {
  mode: IBuildMode;
  port: number;
  analyzer?: boolean;
  platform?: IPlatform;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
};

export type IOptions = {
  port: number;
  paths: IBuildPaths;
  mode: IBuildMode;
  analyzer?: boolean;
  platform?: IPlatform;
};
