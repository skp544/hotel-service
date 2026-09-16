type SeverConfig = {
  port: number;
};

export const serverConfig: SeverConfig = {
  port: Number(process.env.PORT) || 3000,
};
