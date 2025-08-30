import { EVENT_DISCRIMINATOR, getEventDecoder, getEventMarketplaceProgramId } from '@project/anchor'
import { useMemo } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import { Address, createTransaction, getBase58Decoder, Instruction, signAndSendTransactionMessageWithSigners, SolanaClient, TransactionSigner } from 'gill'

export function useEventMarketplaceProgramId() {
  const { cluster } = useWalletUi()

  return useMemo(() => getEventMarketplaceProgramId(cluster.id), [cluster])
}

export async function processTransaction(
  signer: TransactionSigner,
  client: SolanaClient,
  instructions: Instruction[]
) {
  const { value: latestBlockhash } = await client.rpc.getLatestBlockhash().send()

  console.log('Creating transaction...')
  const transaction = createTransaction({
    feePayer: signer,
    version: 'legacy',
    latestBlockhash,
    instructions: instructions,
  })

  const signature = await signAndSendTransactionMessageWithSigners(transaction)
  const decoder = getBase58Decoder()
  const sig58 = decoder.decode(signature)
  console.log(sig58)
}

export async function getEventAccounts(client: SolanaClient, programId: Address) {
  const allAccounts = await client.rpc.getProgramAccounts(programId, {
    encoding: 'base64'
  }).send()

  const filteredAccounts = allAccounts.filter((account) => {
    const data = Buffer.from(account.account.data[0], 'base64')
    const discriminator = data.subarray(0, 8)
    return discriminator.equals(Buffer.from(EVENT_DISCRIMINATOR))
  })

  const decoder = getEventDecoder()
  const decodedAccounts = filteredAccounts.map((account) => ({
    address: account.pubkey,
    data: decoder.decode(Buffer.from(account.account.data[0], "base64"))
  }))

  return decodedAccounts
} 