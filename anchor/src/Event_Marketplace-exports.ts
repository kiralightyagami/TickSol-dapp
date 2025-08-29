// Here we export some useful types and functions for interacting with the Anchor program.
import { address } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'
import { EVENT_MARKETPLACE_PROGRAM_ADDRESS } from './client/js'
import EventMarketplaceIDL from '../target/idl/Event_Marketplace.json'

// Re-export the generated IDL and type
export { EventMarketplaceIDL }

// This is a helper function to get the program ID for the EventMarketplace program depending on the cluster.
export function getEventMarketplaceProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the EventMarketplace program on devnet and testnet.
      return address('')
    case 'solana:mainnet':
    default:
      return EVENT_MARKETPLACE_PROGRAM_ADDRESS
  }
}

export * from './client/js'
