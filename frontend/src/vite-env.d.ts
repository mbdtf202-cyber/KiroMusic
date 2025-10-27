/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_CHAIN_ID: string
  readonly VITE_NETWORK_NAME: string
  readonly VITE_IPFS_GATEWAY: string
  readonly VITE_PINATA_API_KEY: string
  readonly VITE_PINATA_SECRET_KEY: string
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
