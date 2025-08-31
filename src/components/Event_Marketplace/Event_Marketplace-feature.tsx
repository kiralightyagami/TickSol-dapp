'use client'
import { WalletButton } from '../solana/solana-provider'
import { EventMarketplaceProgram, EventMarketplaceProgramExplorerLink } from './Event_Marketplace-ui'
import { AppHero } from '../app-hero'
import { useWalletUi } from '@wallet-ui/react'

export default function EventMarketplaceFeature() {
  const { account } = useWalletUi()


  return (
    <div>
      <AppHero title="EventMarketplace" subtitle={'Create, buy, and sell tickets for events.'}>
      </AppHero>
      <EventMarketplaceProgram />
    </div>
  )
}