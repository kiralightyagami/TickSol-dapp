use anchor_lang::prelude::*;

#[error_code]
pub enum EventMarketplaceError {
    #[msg("Name too long")]
    NameTooLong,
    #[msg("Description too long")]
    DescriptionTooLong,
    #[msg("Start date is in the past")]
    StartDateInThePast,
    #[msg("Available tickets is too low")]
    AvailableTicketsTooLow,
    #[msg("All tickets sold out")]
    AllTicketsSoldOut,
}