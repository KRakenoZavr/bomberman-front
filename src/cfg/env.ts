export interface ENV {
  WS_URL: string;
  BACKOFF_TIMER: number;
  IMAGES_PATH: string;
}

export const Env: ENV = {
  WS_URL: "ws://localhost:8080",
  BACKOFF_TIMER: 1000,
  IMAGES_PATH: "../../assets/images/",
};

export const getEnv = () => Env;
