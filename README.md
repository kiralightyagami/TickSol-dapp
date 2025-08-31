# TickSol

A decentralized event marketplace built on Solana that enables event organizers to create events and sell tickets directly on-chain, while allowing users to purchase tickets with complete transparency and ownership.

## 🚀 Features

- **Create Events**: Event organizers can create events with details like name, description, ticket price, availability, and start date
- **Buy Tickets**: Users can purchase tickets directly on-chain with SOL payments
- **Withdraw Funds**: Event organizers can withdraw collected funds from ticket sales
- **Real-time Updates**: Live tracking of available tickets and event details
- **Decentralized**: All transactions and data stored on Solana blockchain
- **Secure**: Built with Anchor framework with proper validations and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Solana, Anchor Framework
- **Wallet Integration**: Wallet UI React
- **State Management**: Jotai
- **UI Components**: Radix UI, Lucide React

## Getting Started

### Installation

#### Clone the repository

```shell
git clone https://github.com/kiralightyagami/TickSol-dapp
cd ticksol-dapp
```

#### Install Dependencies

```shell
pnpm install
```

## 📋 How It Works

### Smart Contract Architecture

The TickSol program consists of three main instructions:

1. **Initialize**: Creates a new event with metadata (name, description, price, tickets, start date)
2. **Buy**: Allows users to purchase tickets and transfers SOL to the event account
3. **Withdraw**: Enables event organizers to withdraw collected funds

### Data Structures

- **Event**: Stores event metadata, pricing, availability, and organizer information
- **Ticket**: Represents individual ticket purchases with buyer and event references

### Security Features

- ✅ Start date validation (events cannot start in the past)
- ✅ Ticket availability checks
- ✅ Organizer-only withdrawal permissions
- ✅ Proper account validation and PDA (Program Derived Address) usage
- ✅ Input length validation for names and descriptions

## 🏗️ Project Structure

### `/anchor` - Solana Program

This directory contains the Solana program written in Rust using the Anchor framework.

**Key Files:**
- `programs/Event_Marketplace/src/lib.rs` - Main program entry point
- `programs/Event_Marketplace/src/states.rs` - Account structures (Event, Ticket)
- `programs/Event_Marketplace/src/instructions/` - Program instructions
- `programs/Event_Marketplace/src/error.rs` - Custom error definitions

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the
command with `pnpm`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the
Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program. This will also update
the constant in `anchor/src/Event_Marketplace-exports.ts` file.

```shell
pnpm run setup
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
pnpm anchor deploy --provider.cluster devnet
```

### `/src` - Frontend Application

This is a Next.js React app that provides a user interface for interacting with the TickSol program.

**Key Features:**
- Event creation form
- Event listing and browsing
- Ticket purchasing interface
- Fund withdrawal for organizers
- Wallet integration with Solana

#### Commands

Start the development server:

```shell
pnpm dev
```

Build the production app:

```shell
pnpm build
```

Start the production server:

```shell
pnpm start
```

## 🎯 Usage Guide

### For Event Organizers

1. **Connect Wallet**: Connect your Solana wallet to the application
2. **Create Event**: Click "Create Event" and fill in the event details:
   - Event name (max 30 characters)
   - Description (max 300 characters)
   - Start date and time
   - Ticket price (in lamports)
   - Number of available tickets
3. **Manage Event**: After creation, you can withdraw collected funds from ticket sales

### For Ticket Buyers

1. **Connect Wallet**: Connect your Solana wallet to the application
2. **Browse Events**: View all available events with their details
3. **Buy Tickets**: Click "Buy Ticket" on any event to purchase a ticket
4. **Confirmation**: Your ticket purchase will be confirmed on-chain

## 💡 Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Rust and Cargo
- Solana CLI tools
- Anchor CLI

### Local Development

1. **Install dependencies**:
   ```shell
   pnpm install
   ```

2. **Set up the Anchor program**:
   ```shell
   pnpm run setup
   ```

3. **Start local validator** (in one terminal):
   ```shell
   pnpm anchor-localnet
   ```

4. **Start the frontend** (in another terminal):
   ```shell
   pnpm dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

### Testing

Run Anchor tests:
```shell
pnpm anchor-test
```

### Code Generation

The project uses Codama to generate TypeScript client code from the Anchor IDL:
```shell
pnpm run codama:js
```

## 📝 Program ID

The TickSol program is deployed with the following Program ID:
```
2FmHJnC5o3ydRYLqsABrNvgkt839gon6r5WyTGuHxjjR
```

## 🌐 Deployment

### Devnet Deployment

To deploy to Solana Devnet:

1. **Configure Solana CLI for Devnet**:
   ```shell
   solana config set --url devnet
   ```

2. **Airdrop SOL for deployment** (if needed):
   ```shell
   solana airdrop 2
   ```

3. **Deploy the program**:
   ```shell
   pnpm anchor deploy --provider.cluster devnet
   ```

4. **Update the frontend configuration** to point to Devnet in your application

### Mainnet Deployment

For mainnet deployment, follow similar steps but use the mainnet-beta cluster and ensure you have sufficient SOL for deployment costs.

## 🔧 Configuration

### Environment Variables

The application can be configured using environment variables:

- `NEXT_PUBLIC_CLUSTER`: Solana cluster to connect to (`devnet`, `testnet`, `mainnet-beta`, or `localnet`)
- `NEXT_PUBLIC_PROGRAM_ID`: The deployed program ID (automatically set during setup)

## 🤝 Contributing

We welcome contributions to TickSol! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow the project's coding standards
4. **Run tests**: `pnpm anchor-test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- Follow Rust best practices for the Anchor program
- Use TypeScript and follow the existing code style for the frontend
- Run `pnpm format` to ensure consistent code formatting
- Run `pnpm lint` to check for linting issues

## 🐛 Known Issues

- Ticket prices are displayed in lamports (1 SOL = 1,000,000,000 lamports)
- The application currently only supports single ticket purchases per transaction
- Event images are not yet supported



## 📚 Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Solana Cookbook](https://solanacookbook.com/)

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 🙏 Acknowledgments

- Built with the [Solana Anchor framework](https://www.anchor-lang.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Wallet integration powered by [Wallet UI](https://github.com/wallet-ui/wallet-ui)
- Template based on [Solana DApp Scaffold](https://github.com/solana-foundation/dapp-scaffold)

---

**Made with ❤️ for the Solana ecosystem**
