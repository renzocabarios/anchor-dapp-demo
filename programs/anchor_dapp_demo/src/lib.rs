use anchor_lang::prelude::*;

declare_id!("8f9tE4h19XYBVcxwkUFncw4EAwyYEQ9tKMQEvzJLr2SH");

#[program]
pub mod anchor_dapp_demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
