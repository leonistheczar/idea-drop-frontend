let accessToken: string | null = null;
let resolveToken!: (token: string | null) => void;

const tokenReady = new Promise<string | null>(res => {
  resolveToken = res;
});

export const setStoredAccessToken = (token: string | null) => {
  accessToken = token;
  resolveToken(token);
};

export const getStoredAccessToken = () => accessToken;
export const waitForAccessToken = () => tokenReady;