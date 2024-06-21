import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'DARK MACHINE',
  description: 'SEIZE THE DARK',
  url: 'https://darkmachinegame.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const wagmiOptions = {
  theme: 'light',
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {},
};

const env = process.env.NEXT_PUBLIC_ENV;
const chains =
  env === 'development' ? ([sepolia] as const) : ([mainnet] as const);

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ...wagmiOptions,
});
