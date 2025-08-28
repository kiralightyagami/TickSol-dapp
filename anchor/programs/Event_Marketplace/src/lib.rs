use anchor_lang::prelude::*;

declare_id!("");

#[program]
pub mod Event_Marketplace {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
