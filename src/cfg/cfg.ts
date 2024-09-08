export interface ENV {
    WS_URL: string,
    BACKOFF_TIMER: number,
}

export const Env: ENV = {
    WS_URL: "ws://localhost:8080",
    BACKOFF_TIMER: 1000,
}

export const getEnv = () => Env
