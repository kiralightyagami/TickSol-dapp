import { UiWalletAccount, useWalletAccountTransactionSendingSigner, useWalletUi } from '@wallet-ui/react'

export function useWalletUiSigner() {
  const { account, cluster } = useWalletUi()

  // Add null checks to prevent runtime errors
  if (!cluster || !cluster.id) {
    throw new Error('Wallet cluster not initialized')
  }

  if (!account) {
    throw new Error('Wallet account not connected')
  }

  return useWalletAccountTransactionSendingSigner(account as UiWalletAccount, cluster.id)
}
