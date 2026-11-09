export const profileLocators = {
    searchBox: '#searchBox',
    bookCell: 'tbody tr td:nth-child(2)',
    deleteButton: (name) => `xpath=//tr[td[contains(., "${name}")]]//span[@title="Delete"]`,
    confirmDialog: '.modal-content:has-text("Do you want to delete this book?")',
    confirmOkButton: '#closeSmallModal-ok',
    deletedDialog: '.modal-content:has-text("Book deleted")',
    deletedOkButton: '#closeSmallModal-ok',
    profileUsername: '#userName-value',
};
