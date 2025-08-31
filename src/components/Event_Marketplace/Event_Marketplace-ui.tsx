'use client'
import './Event_Marketplace-component-styles.css'
import { ellipsify, useWalletUi } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { ExplorerLink } from '@/components/cluster/cluster-ui'
import { useEventMarketplaceProgramId, processTransaction, getEventAccounts} from './Event_Marketplace-data-access'
import { AppModal } from '@/components/app-modal'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { Event, getBuyInstructionAsync, getInitializeInstructionAsync, getWithdrawInstruction } from '@project/anchor'
import { Address } from 'gill'


export function EventMarketplaceProgramExplorerLink() {
  const programId = useEventMarketplaceProgramId()

  return <ExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
}

function BuyTicket({ eventAddress }: { eventAddress: Address }) {
  const { account, cluster } = useWalletUi()
  const client = useWalletUi().client
  
  // Always call hooks first, then handle conditional logic
  let signer
  try {
    signer = useWalletUiSigner()
  } catch (error) {
    // Handle case where wallet isn't properly connected
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet
      </Button>
    )
  }
  
  // Additional check for wallet connection state
  if (!account || !cluster) {
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet
      </Button>
    )
  }

  const buyTicket = async () => {
    const ix = await getBuyInstructionAsync({
      event: eventAddress,
      buyer: signer
    })

    await processTransaction(signer, client, [ix])
  }

  return (
    <Button
      onClick={buyTicket}
      variant="outline"
      size="sm"
    >
      Buy Ticket
    </Button>
  )
}

function WithdrawFunds({ eventAddress }: { eventAddress: Address }) {
  const { account, cluster } = useWalletUi()
  const client = useWalletUi().client
  const [amount, setAmount] = useState('')
  
  // Always call hooks first, then handle conditional logic
  let signer
  try {
    signer = useWalletUiSigner()
  } catch (error) {
    // Handle case where wallet isn't properly connected
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet
      </Button>
    )
  }
  
  // Additional check for wallet connection state
  if (!account || !cluster) {
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet
      </Button>
    )
  }


  const withdraw = async () => {
    const ix = await getWithdrawInstruction({
      event: eventAddress,
      eventOrganizer: signer,
      amount: BigInt(amount)
    })

    await processTransaction(signer, client, [ix])
  }

  return (
    <AppModal
      title="Withdraw"
      submit={withdraw}
      submitLabel="Withdraw"
    >
      <div>
        <Label htmlFor="amount">Amount (lamports)</Label>
        <Input 
          id="amount"
          type="number"
          step="1000"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
    </AppModal>
  )
}

function EventList() {
  const client = useWalletUi().client
    const programId = useEventMarketplaceProgramId()
  const [events, setEvents] = useState<Array<{address: Address, data: Event}>>([])

  const refresh = async () => {
    const eventAccounts = await getEventAccounts(client, programId)
    setEvents(eventAccounts)
  }

  return (
    <div className="events-section">
      <div>
        <h3>Events</h3>
        <Button
          onClick={refresh}
          variant="outline"
          size="sm"
        >
          Refresh
        </Button>
      </div>
      <div>
        {events.map((
          event, index
        ) => (
          <div key={index}>
            <h4>{event.data.name}</h4>
            <p>{event.data.description}</p>
            <div>
              <span>Price (lamports): {event.data.ticketPrice}</span><br />
              <span>Available Tickets: {event.data.availableTickets}</span><br />
              <span>Start Date: {new Date(Number(event.data.startDate)*1000).toLocaleString()}</span><br />
            </div>
            <div>
              <BuyTicket eventAddress={event.address} />
              <WithdrawFunds eventAddress={event.address} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CreateEvent() {
  const { account, cluster } = useWalletUi()
  const client = useWalletUi().client
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    ticketPrice: '',
    availableTickets: ''
  })
  
  // Always call hooks first, then handle conditional logic
  let signer
  try {
    signer = useWalletUiSigner()
  } catch (error) {
    // Handle case where wallet isn't properly connected
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet to Create Event
      </Button>
    )
  }
  
  // Additional check for wallet connection state
  if (!account || !cluster) {
    return (
      <Button variant="outline" size="sm" disabled>
        Connect Wallet to Create Event
      </Button>
    )
  }

  const handleSubmit = async () => {
    const startDateSeconds = Math.round(new Date(formData.startDate).getTime() / 1000)

    const ix = await getInitializeInstructionAsync(
      {
        eventOrganizer: signer,
        name: formData.name,
        description: formData.description,
        startDate: BigInt(startDateSeconds),
        ticketPrice: BigInt(formData.ticketPrice),
        availableTickets: BigInt(formData.availableTickets)
      }
    )

    await processTransaction(signer, client, [ix])

    setFormData({
      name: "",
      description: "",
      startDate: "",
      ticketPrice: "",
      availableTickets: ""
    })
  }

  return (
    <AppModal
      title="Create Event"
      submit={handleSubmit}
    >
      <div className="create-event-modal">
        <div>
          <Label htmlFor="name">Event name</Label>
          <Input
            id='name'
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="description">Event description</Label>
          <Input
            id='description'
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start date</Label>
          <Input
            id='startDate'
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="ticketPrice">Ticket price (lamports)</Label>
          <Input
            id='ticketPrice'
            type="number"
            min="1"
            value={formData.ticketPrice}
            onChange={(e) => setFormData(prev => ({...prev, ticketPrice: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="availableTickets">Available tickets</Label>
          <Input
            id='availableTickets'
            type="number"
            min="1"
            value={formData.availableTickets}
            onChange={(e) => setFormData(prev => ({...prev, availableTickets: e.target.value}))}
          />
        </div>
      </div>
    </AppModal>
  )
}

export function EventMarketplaceProgram() {
  return (
    <div className="event-marketplace">
      <div>
        <h2>Event Marketplace</h2>
        <CreateEvent />
      </div>

      <br />

      <EventList />
    </div>
  )
}